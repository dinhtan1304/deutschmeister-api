import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma } from '@prisma/client';
import { calculateSM2, nextReviewDate, isCorrectRating, SM2Rating } from '../../common/utils/sm2';
import {
  CreatePersonalWordDto,
  UpdatePersonalWordDto,
  ImportWordsDto,
  ImportRowDto,
  ImportResultDto,
  QueryPersonalWordsDto,
  BatchDeleteDto,
  StatsDto,
  WordType,
  Level,
  Gender,
  ReviewPersonalWordDto,
  SRSRating,
  SRSQueryDto,
  SRSStatsDto,
  IntervalPreviewDto,
} from './dto/personal-words.dto';

@Injectable()
export class PersonalWordsService {
  constructor(private prisma: PrismaService) {}

  // ============================================
  // CREATE
  // ============================================
  async create(userId: string, dto: CreatePersonalWordDto) {
    // Check duplicate (same word + wordType for this user)
    const existing = await this.prisma.personalWord.findUnique({
      where: {
        userId_word_wordType: {
          userId,
          word: dto.word.trim(),
          wordType: dto.wordType,
        },
      },
    });

    if (existing) {
      throw new ConflictException(
        `Từ "${dto.word}" (${dto.wordType}) đã tồn tại trong Word Bank`,
      );
    }

    return this.prisma.personalWord.create({
      data: {
        userId,
        word: dto.word.trim(),
        wordType: dto.wordType,
        nomenData: dto.nomenData ? (dto.nomenData as any) : Prisma.JsonNull,
        verbData: dto.verbData ? (dto.verbData as any) : Prisma.JsonNull,
        adjektivData: dto.adjektivData ? (dto.adjektivData as any) : Prisma.JsonNull,
        prapositionData: dto.prapositionData ? (dto.prapositionData as any) : Prisma.JsonNull,
        translationEn: dto.translationEn.trim(),
        translationVi: dto.translationVi.trim(),
        examples: dto.examples || [],
        level: dto.level || Level.A1,
        category: dto.category?.trim() || null,
        tags: dto.tags || [],
        notes: dto.notes?.trim() || null,
        pronunciation: dto.pronunciation?.trim() || null,
      },
    });
  }

  // ============================================
  // FIND ALL (with filters + pagination)
  // ============================================
  async findAll(userId: string, query: QueryPersonalWordsDto) {
    const {
      search,
      wordType,
      level,
      gender,
      category,
      favoritesOnly,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 50,
    } = query;

    const where: Prisma.PersonalWordWhereInput = { userId };

    // Text search
    if (search) {
      where.OR = [
        { word: { contains: search, mode: 'insensitive' } },
        { translationEn: { contains: search, mode: 'insensitive' } },
        { translationVi: { contains: search, mode: 'insensitive' } },
        { notes: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (wordType) where.wordType = wordType;
    if (level) where.level = level;
    if (category) where.category = category;
    if (favoritesOnly) where.isFavorite = true;

    // Gender filter (query JSON field)
    if (gender) {
      where.nomenData = {
        path: ['gender'],
        equals: gender,
      };
    }

    // Sort mapping
    const orderByMap: Record<string, Prisma.PersonalWordOrderByWithRelationInput> = {
      word: { word: sortOrder },
      createdAt: { createdAt: sortOrder },
      updatedAt: { updatedAt: sortOrder },
      level: { level: sortOrder },
      wordType: { wordType: sortOrder },
    };

    const orderBy = orderByMap[sortBy] || { createdAt: 'desc' };
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.personalWord.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.personalWord.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ============================================
  // FIND ONE
  // ============================================
  async findOne(userId: string, id: string) {
    const word = await this.prisma.personalWord.findFirst({
      where: { id, userId },
    });

    if (!word) {
      throw new NotFoundException(`Từ với id "${id}" không tìm thấy`);
    }

    return word;
  }

  // ============================================
  // UPDATE
  // ============================================
  async update(userId: string, id: string, dto: UpdatePersonalWordDto) {
    // Verify ownership
    await this.findOne(userId, id);

    const data: Prisma.PersonalWordUpdateInput = {};

    if (dto.word !== undefined) data.word = dto.word.trim();
    if (dto.wordType !== undefined) data.wordType = dto.wordType;
    if (dto.translationEn !== undefined) data.translationEn = dto.translationEn.trim();
    if (dto.translationVi !== undefined) data.translationVi = dto.translationVi.trim();
    if (dto.examples !== undefined) data.examples = dto.examples;
    if (dto.level !== undefined) data.level = dto.level;
    if (dto.category !== undefined) data.category = dto.category?.trim() || null;
    if (dto.tags !== undefined) data.tags = dto.tags;
    if (dto.notes !== undefined) data.notes = dto.notes?.trim() || null;
    if (dto.pronunciation !== undefined) data.pronunciation = dto.pronunciation?.trim() || null;
    if (dto.isFavorite !== undefined) data.isFavorite = dto.isFavorite;

    if (dto.nomenData !== undefined) data.nomenData = dto.nomenData ? (dto.nomenData as any) : Prisma.JsonNull;
    if (dto.verbData !== undefined) data.verbData = dto.verbData ? (dto.verbData as any) : Prisma.JsonNull;
    if (dto.adjektivData !== undefined) data.adjektivData = dto.adjektivData ? (dto.adjektivData as any) : Prisma.JsonNull;
    if (dto.prapositionData !== undefined) data.prapositionData = dto.prapositionData ? (dto.prapositionData as any) : Prisma.JsonNull;

    return this.prisma.personalWord.update({
      where: { id },
      data,
    });
  }

  // ============================================
  // DELETE
  // ============================================
  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.personalWord.delete({ where: { id } });
  }

  // ============================================
  // BATCH DELETE
  // ============================================
  async batchDelete(userId: string, dto: BatchDeleteDto) {
    const result = await this.prisma.personalWord.deleteMany({
      where: {
        id: { in: dto.ids },
        userId, // Đảm bảo chỉ xoá của chính user
      },
    });

    return { deleted: result.count };
  }

  // ============================================
  // TOGGLE FAVORITE
  // ============================================
  async toggleFavorite(userId: string, id: string) {
    const word = await this.findOne(userId, id);

    return this.prisma.personalWord.update({
      where: { id },
      data: { isFavorite: !word.isFavorite },
    });
  }

  // ============================================
  // IMPORT (with duplicate check)
  // ============================================
  async importWords(userId: string, dto: ImportWordsDto): Promise<ImportResultDto> {
    const result: ImportResultDto = {
      added: 0,
      skipped: 0,
      failed: 0,
      errors: [],
      skippedWords: [],
    };

    // Get existing words for this user
    const existingWords = await this.prisma.personalWord.findMany({
      where: { userId },
      select: { word: true, wordType: true },
    });

    const existingSet = new Set(
      existingWords.map((w) => `${w.word.trim().toLowerCase()}::${w.wordType}`),
    );

    const wordsToCreate: Prisma.PersonalWordCreateManyInput[] = [];

    for (let i = 0; i < dto.rows.length; i++) {
      const row = dto.rows[i];
      const rowIndex = i + 1;

      // Validate
      const errors = this.validateImportRow(row, rowIndex);
      if (errors.length > 0) {
        result.failed++;
        result.errors.push(...errors);
        continue;
      }

      // Check duplicate
      const key = `${row.word.trim().toLowerCase()}::${row.wordType}`;
      if (existingSet.has(key)) {
        result.skipped++;
        result.skippedWords.push(row.word);
        continue;
      }

      // Build create data
      wordsToCreate.push(this.importRowToCreateInput(userId, row));
      existingSet.add(key); // Prevent duplicates within batch
      result.added++;
    }

    // Bulk insert
    if (wordsToCreate.length > 0) {
      await this.prisma.personalWord.createMany({
        data: wordsToCreate,
        skipDuplicates: true,
      });
    }

    return result;
  }

  // ============================================
  // EXPORT (TSV format)
  // ============================================
  async exportWords(userId: string): Promise<string> {
    const words = await this.prisma.personalWord.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });

    const headers = [
      'word', 'wordType', 'article', 'plural', 'partizipII', 'hilfsverb',
      'komparativ', 'superlativ', 'kasus', 'translationEn', 'translationVi',
      'examples', 'level', 'category', 'tags', 'notes',
    ];

    const rows = words.map((w) => {
      const nomen = w.nomenData as any;
      const verb = w.verbData as any;
      const adj = w.adjektivData as any;
      const prap = w.prapositionData as any;

      return [
        w.word,
        w.wordType,
        nomen?.article || '',
        nomen?.plural || '',
        verb?.partizipII || '',
        verb?.hilfsverb || '',
        adj?.komparativ || '',
        adj?.superlativ || '',
        prap?.kasus?.join(',') || '',
        w.translationEn,
        w.translationVi,
        w.examples?.join('|') || '',
        w.level,
        w.category || '',
        w.tags?.join(',') || '',
        w.notes || '',
      ];
    });

    return [headers.join('\t'), ...rows.map((r) => r.join('\t'))].join('\n');
  }

  // ============================================
  // STATS
  // ============================================
  async getStats(userId: string): Promise<StatsDto> {
    const [total, favorites, byType, byLevel] = await Promise.all([
      this.prisma.personalWord.count({ where: { userId } }),
      this.prisma.personalWord.count({ where: { userId, isFavorite: true } }),
      this.prisma.personalWord.groupBy({
        by: ['wordType'],
        where: { userId },
        _count: { id: true },
      }),
      this.prisma.personalWord.groupBy({
        by: ['level'],
        where: { userId },
        _count: { id: true },
      }),
    ]);

    return {
      total,
      favorites,
      byType: Object.fromEntries(byType.map((g) => [g.wordType, g._count.id])),
      byLevel: Object.fromEntries(byLevel.map((g) => [g.level, g._count.id])),
    };
  }

  // ============================================
  // CATEGORIES
  // ============================================
  async getCategories(userId: string): Promise<string[]> {
    const result = await this.prisma.personalWord.findMany({
      where: { userId, category: { not: null } },
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' },
    });

    return result.map((r) => r.category).filter(Boolean) as string[];
  }

  // ============================================
  // Private helpers
  // ============================================
  private validateImportRow(
    row: ImportRowDto,
    rowIndex: number,
  ): { row: number; field: string; message: string }[] {
    const errors: { row: number; field: string; message: string }[] = [];

    if (!row.word?.trim()) {
      errors.push({ row: rowIndex, field: 'word', message: 'Từ không được để trống' });
    }
    if (!row.translationEn?.trim()) {
      errors.push({ row: rowIndex, field: 'translationEn', message: 'Nghĩa tiếng Anh không được để trống' });
    }
    if (!row.translationVi?.trim()) {
      errors.push({ row: rowIndex, field: 'translationVi', message: 'Nghĩa tiếng Việt không được để trống' });
    }

    const validTypes = Object.values(WordType);
    if (!row.wordType || !validTypes.includes(row.wordType as WordType)) {
      errors.push({ row: rowIndex, field: 'wordType', message: `Từ loại phải là: ${validTypes.join(', ')}` });
    }

    if (row.wordType === WordType.NOMEN) {
      if (!row.article || !['der', 'die', 'das'].includes(row.article.toLowerCase())) {
        errors.push({ row: rowIndex, field: 'article', message: 'Danh từ phải có mạo từ (der/die/das)' });
      }
    }

    if (row.level) {
      const validLevels = Object.values(Level);
      if (!validLevels.includes(row.level.toUpperCase() as Level)) {
        errors.push({ row: rowIndex, field: 'level', message: `Cấp độ phải là: ${validLevels.join(', ')}` });
      }
    }

    return errors;
  }

  private articleToGender(article: string): Gender {
    switch (article.toLowerCase()) {
      case 'die': return Gender.FEMININE;
      case 'das': return Gender.NEUTER;
      default: return Gender.MASCULINE;
    }
  }

  private importRowToCreateInput(
    userId: string,
    row: ImportRowDto,
  ): Prisma.PersonalWordCreateManyInput {
    let nomenData: any = null;
    let verbData: any = null;
    let adjektivData: any = null;
    let prapositionData: any = null;

    if (row.wordType === WordType.NOMEN && row.article) {
      nomenData = {
        article: row.article.toLowerCase(),
        gender: this.articleToGender(row.article),
        plural: row.plural?.trim() || undefined,
      };
    }

    if (row.wordType === WordType.VERB) {
      verbData = {
        partizipII: row.partizipII?.trim() || undefined,
        hilfsverb: row.hilfsverb?.toLowerCase() || undefined,
      };
    }

    if (row.wordType === WordType.ADJEKTIV) {
      adjektivData = {
        komparativ: row.komparativ?.trim() || undefined,
        superlativ: row.superlativ?.trim() || undefined,
      };
    }

    if (row.wordType === WordType.PRAPOSITION && row.kasus) {
      prapositionData = {
        kasus: row.kasus.split(',').map((k) => k.trim().toLowerCase()),
      };
    }

    return {
      userId,
      word: row.word.trim(),
      wordType: row.wordType,
      nomenData: nomenData || Prisma.JsonNull,
      verbData: verbData || Prisma.JsonNull,
      adjektivData: adjektivData || Prisma.JsonNull,
      prapositionData: prapositionData || Prisma.JsonNull,
      translationEn: row.translationEn.trim(),
      translationVi: row.translationVi.trim(),
      examples: row.examples ? row.examples.split('|').map((e) => e.trim()).filter(Boolean) : [],
      level: (row.level?.toUpperCase() as Level) || Level.A1,
      category: row.category?.trim() || null,
      tags: row.tags ? row.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      notes: row.notes?.trim() || null,
    };
  }

  // ============================================
  // SRS (Spaced Repetition System) Methods
  // ============================================

  /**
   * Get words due for review
   */
  async getDueForReview(userId: string, query: SRSQueryDto) {
    const { 
      limit = 20, 
      wordType, 
      level, 
      includeNew = true, 
      newLimit = 5 
    } = query;

    const where: Prisma.PersonalWordWhereInput = {
      userId,
      nextReviewAt: { lte: new Date() },
    };

    if (wordType) where.wordType = wordType;
    if (level) where.level = level;

    // Get due words
    const dueWords = await this.prisma.personalWord.findMany({
      where,
      orderBy: [
        { nextReviewAt: 'asc' },
        { repetitions: 'asc' }, // Prioritize struggling words
      ],
      take: limit,
    });

    // Optionally include new words (never reviewed)
    let newWords: any[] = [];
    if (includeNew && dueWords.length < limit) {
      const newWhere: Prisma.PersonalWordWhereInput = {
        userId,
        repetitions: 0,
        totalReviews: 0,
      };
      if (wordType) newWhere.wordType = wordType;
      if (level) newWhere.level = level;

      newWords = await this.prisma.personalWord.findMany({
        where: newWhere,
        orderBy: { createdAt: 'asc' }, // Oldest first
        take: Math.min(newLimit, limit - dueWords.length),
      });
    }

    return {
      due: dueWords,
      new: newWords,
      total: dueWords.length + newWords.length,
    };
  }

  /**
   * Review a word (SM-2 Algorithm)
   */
  async reviewWord(userId: string, dto: ReviewPersonalWordDto) {
    const word = await this.findOne(userId, dto.wordId);

    // Calculate new SM-2 parameters (shared utility)
    const { easeFactor, interval, repetitions } = calculateSM2(
      { easeFactor: word.easeFactor, interval: word.interval, repetitions: word.repetitions },
      dto.rating as SM2Rating,
    );

    // Update word
    return this.prisma.personalWord.update({
      where: { id: word.id },
      data: {
        easeFactor,
        interval,
        repetitions,
        nextReviewAt: nextReviewDate(interval),
        lastReviewAt: new Date(),
        totalReviews: { increment: 1 },
        correctCount: { increment: isCorrectRating(dto.rating as SM2Rating) ? 1 : 0 },
      },
    });
  }

  /**
   * Batch review multiple words
   */
  async batchReview(userId: string, reviews: ReviewPersonalWordDto[]) {
    const results = await Promise.all(
      reviews.map(async (review) => {
        try {
          const updated = await this.reviewWord(userId, review);
          return { wordId: review.wordId, success: true, data: updated };
        } catch (error: any) {
          return { wordId: review.wordId, success: false, error: error.message };
        }
      }),
    );

    return {
      reviewed: results.filter((r) => r.success).length,
      failed: results.filter((r) => !r.success).length,
      results,
    };
  }

  /**
   * Get SRS statistics
   */
  async getSRSStats(userId: string): Promise<SRSStatsDto> {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const [
      total,
      due,
      newCount,
      learning,
      review,
      mature,
      reviewStats,
      reviewedToday,
      forecastData,
    ] = await Promise.all([
      // Total words
      this.prisma.personalWord.count({ where: { userId } }),

      // Due for review
      this.prisma.personalWord.count({
        where: { userId, nextReviewAt: { lte: now } },
      }),

      // New (never reviewed)
      this.prisma.personalWord.count({
        where: { userId, repetitions: 0, totalReviews: 0 },
      }),

      // Learning (interval < 7)
      this.prisma.personalWord.count({
        where: { userId, interval: { gt: 0, lt: 7 } },
      }),

      // Review (7 <= interval < 21)
      this.prisma.personalWord.count({
        where: { userId, interval: { gte: 7, lt: 21 } },
      }),

      // Mature (interval >= 21)
      this.prisma.personalWord.count({
        where: { userId, interval: { gte: 21 } },
      }),

      // Retention rate calculation
      this.prisma.personalWord.aggregate({
        where: { userId, totalReviews: { gt: 0 } },
        _sum: { correctCount: true, totalReviews: true },
      }),

      // Reviewed today
      this.prisma.personalWord.count({
        where: {
          userId,
          lastReviewAt: { gte: todayStart },
        },
      }),

      // Forecast for next 7 days
      this.getForecast(userId, 7),
    ]);

    const totalReviews = reviewStats._sum.totalReviews || 0;
    const correctReviews = reviewStats._sum.correctCount || 0;
    const retentionRate = totalReviews > 0 
      ? Math.round((correctReviews / totalReviews) * 100 * 10) / 10 
      : 0;

    return {
      total,
      due,
      new: newCount,
      learning,
      review,
      mature,
      retentionRate,
      reviewedToday,
      forecast: forecastData,
    };
  }

  /**
   * Get forecast for next N days
   */
  private async getForecast(userId: string, days: number) {
    const forecast: { date: string; count: number }[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const count = await this.prisma.personalWord.count({
        where: {
          userId,
          nextReviewAt: {
            gte: date,
            lt: nextDate,
          },
        },
      });

      forecast.push({
        date: date.toISOString().split('T')[0],
        count,
      });
    }

    return forecast;
  }

  /**
   * Preview intervals for all ratings
   */
  getIntervalPreview(word: {
    easeFactor: number;
    interval: number;
    repetitions: number;
  }): IntervalPreviewDto {
    const input = { easeFactor: word.easeFactor, interval: word.interval, repetitions: word.repetitions };
    return {
      again: 1,
      hard: calculateSM2(input, 'hard').interval,
      good: calculateSM2(input, 'good').interval,
      easy: calculateSM2(input, 'easy').interval,
    };
  }

  /**
   * Reset SRS progress for a word
   */
  async resetSRS(userId: string, wordId: string) {
    await this.findOne(userId, wordId);

    return this.prisma.personalWord.update({
      where: { id: wordId },
      data: {
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReviewAt: new Date(),
        lastReviewAt: null,
        totalReviews: 0,
        correctCount: 0,
      },
    });
  }

  /**
   * Reset all SRS progress
   */
  async resetAllSRS(userId: string) {
    const result = await this.prisma.personalWord.updateMany({
      where: { userId },
      data: {
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReviewAt: new Date(),
        lastReviewAt: null,
        totalReviews: 0,
        correctCount: 0,
      },
    });

    return { reset: result.count };
  }

}
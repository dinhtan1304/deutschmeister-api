import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { SearchWordsDto, RandomWordsDto } from './dto/words.dto';

@Injectable()
export class WordsService {
  constructor(private prisma: PrismaService) {}

  async search(dto: SearchWordsDto) {
    const { search, gender, category, level, page = 1, limit = 20 } = dto;
    const where: Prisma.WordWhereInput = {};

    if (search) {
      where.OR = [
        { word: { contains: search, mode: 'insensitive' } },
        { translationEn: { contains: search, mode: 'insensitive' } },
        { translationVi: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (gender) where.gender = gender;
    if (category) where.category = category;
    if (level) where.level = level;

    const [data, total] = await Promise.all([
      this.prisma.word.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { word: 'asc' },
      }),
      this.prisma.word.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string) {
    const word = await this.prisma.word.findUnique({ where: { id } });
    if (!word) throw new NotFoundException('Word not found');
    return word;
  }

  /**
   * Get random words using a single DB-level query.
   * Uses ORDER BY RANDOM() LIMIT n — PostgreSQL handles randomisation
   * entirely in one round-trip instead of N parallel skip/take queries.
   */
  async getRandom(dto: RandomWordsDto) {
    const { count = 10, gender, category, levels } = dto;

    // Build WHERE conditions for raw SQL
    const conditions: string[] = [];
    const values: (string | string[])[] = [];
    let paramIdx = 1;

    if (gender) {
      conditions.push(`gender = $${paramIdx++}`);
      values.push(gender);
    }
    if (category) {
      conditions.push(`category = $${paramIdx++}`);
      values.push(category);
    }
    if (levels?.length) {
      // ANY($n::text[]) works for array params in Prisma $queryRaw
      conditions.push(`level = ANY($${paramIdx++})`);
      values.push(levels);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Single query: let PostgreSQL do the random sampling
    const words = await this.prisma.$queryRawUnsafe<
      {
        id: string;
        word: string;
        article: string;
        gender: string;
        plural: string | null;
        pronunciation: string | null;
        image_url: string | null;
        translation_en: string;
        translation_vi: string | null;
        category: string;
        level: string;
        frequency: number;
        examples: string[];
        tips: string[];
        created_at: Date;
        updated_at: Date;
      }[]
    >(
      `SELECT * FROM words ${whereClause} ORDER BY RANDOM() LIMIT $${paramIdx}`,
      ...values,
      count,
    );

    // Map snake_case columns back to camelCase to match Prisma model shape
    return words.map((w) => ({
      id: w.id,
      word: w.word,
      article: w.article,
      gender: w.gender,
      plural: w.plural,
      pronunciation: w.pronunciation,
      imageUrl: w.image_url,
      translationEn: w.translation_en,
      translationVi: w.translation_vi,
      category: w.category,
      level: w.level,
      frequency: w.frequency,
      examples: w.examples,
      tips: w.tips,
      createdAt: w.created_at,
      updatedAt: w.updated_at,
    }));
  }

  /**
  async getStats() {
    const [total, byGender, byCategory, byLevel] = await Promise.all([
      this.prisma.word.count(),
      this.prisma.word.groupBy({ by: ['gender'], _count: { id: true } }),
      this.prisma.word.groupBy({ by: ['category'], _count: { id: true } }),
      this.prisma.word.groupBy({ by: ['level'], _count: { id: true } }),
    ]);

    return {
      total,
      byGender: byGender.map(g => ({ gender: g.gender, count: g._count.id })),
      byCategory: byCategory.map(c => ({ category: c.category, count: c._count.id })),
      byLevel: byLevel.map(l => ({ level: l.level, count: l._count.id })),
    };
  }

  async getLevelIndex(): Promise<Record<string, string>> {
    const words = await this.prisma.word.findMany({
      select: {
        word: true,
        level: true,
      },
    });

    const index: Record<string, string> = {};
    for (const w of words) {
      if (w.word && w.level) {
        index[w.word.toLowerCase()] = w.level;
      }
    }

    return index;
  }
}*/
}
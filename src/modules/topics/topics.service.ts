import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import {
  CreateTopicDto,
  UpdateTopicDto,
  QueryTopicsDto,
  AddWordsToTopicDto,
} from './dto';

// Type for topic with included words
type TopicWithWords = {
  id: string;
  slug: string;
  nameDe: string;
  nameEn: string;
  nameVi: string;
  descriptionDe: string | null;
  descriptionEn: string | null;
  descriptionVi: string | null;
  icon: string | null;
  color: string | null;
  imageUrl: string | null;
  level: string;
  order: number;
  isActive: boolean;
  wordCount: number;
  createdAt: Date;
  updatedAt: Date;
  topicWords?: {
    id: string;
    topicId: string;
    wordId: string;
    order: number;
    isCore: boolean;
    createdAt: Date;
    word: {
      id: string;
      word: string;
      article: string;
      gender: string;
      plural: string | null;
      pronunciation?: string | null;
      translationEn: string;
      translationVi: string | null;
      imageUrl: string | null;
      examples?: string[];
      tips?: string[];
    };
  }[];
};

@Injectable()
export class TopicsService {
  constructor(private prisma: PrismaService) {}

  // ============================================
  // CRUD Operations
  // ============================================

  async create(dto: CreateTopicDto) {
    const existing = await this.prisma.topic.findUnique({
      where: { slug: dto.slug },
    });
    if (existing) {
      throw new ConflictException(`Topic với slug "${dto.slug}" đã tồn tại`);
    }

    return this.prisma.topic.create({
      data: {
        slug: dto.slug,
        nameDe: dto.nameDe,
        nameEn: dto.nameEn,
        nameVi: dto.nameVi,
        descriptionDe: dto.descriptionDe,
        descriptionEn: dto.descriptionEn,
        descriptionVi: dto.descriptionVi,
        icon: dto.icon,
        color: dto.color,
        imageUrl: dto.imageUrl,
        level: dto.level || 'A1',
        order: dto.order || 0,
      },
    });
  }

  async findAll(query: QueryTopicsDto) {
    const {
      level,
      isActive = true,
      includeWords = false,
      page = 1,
      limit = 20,
    } = query;

    const where: { level?: string; isActive?: boolean } = {};
    if (level) where.level = level;
    if (isActive !== undefined) where.isActive = isActive;

    const [data, total] = await Promise.all([
      this.prisma.topic.findMany({
        where,
        orderBy: [{ order: 'asc' }, { nameDe: 'asc' }],
        skip: (page - 1) * limit,
        take: limit,
        include: includeWords
          ? {
              topicWords: {
                orderBy: [{ isCore: 'desc' }, { order: 'asc' }],
                include: {
                  word: {
                    select: {
                      id: true,
                      word: true,
                      article: true,
                      gender: true,
                      plural: true,
                      translationEn: true,
                      translationVi: true,
                      imageUrl: true,
                    },
                  },
                },
              },
            }
          : undefined,
      }) as Promise<TopicWithWords[]>,
      this.prisma.topic.count({ where }),
    ]);

    // Transform if includeWords
    const transformed = includeWords
      ? data.map((topic) => ({
          ...topic,
          words: (topic.topicWords || []).map((tw) => ({
            ...tw.word,
            isCore: tw.isCore,
            order: tw.order,
          })),
          topicWords: undefined,
        }))
      : data;

    return {
      data: transformed,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(idOrSlug: string, includeWords = true) {
    const topic = await this.prisma.topic.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: includeWords
        ? {
            topicWords: {
              orderBy: [{ isCore: 'desc' }, { order: 'asc' }],
              include: {
                word: {
                  select: {
                    id: true,
                    word: true,
                    article: true,
                    gender: true,
                    plural: true,
                    pronunciation: true,
                    translationEn: true,
                    translationVi: true,
                    imageUrl: true,
                    examples: true,
                    tips: true,
                  },
                },
              },
            },
          }
        : undefined,
    }) as TopicWithWords | null;

    if (!topic) {
      throw new NotFoundException(`Topic "${idOrSlug}" không tìm thấy`);
    }

    // Transform
    if (includeWords && topic.topicWords) {
      return {
        ...topic,
        words: topic.topicWords.map((tw) => ({
          ...tw.word,
          isCore: tw.isCore,
          order: tw.order,
        })),
        topicWords: undefined,
      };
    }

    return topic;
  }

  async update(id: string, dto: UpdateTopicDto) {
    const topic = await this.prisma.topic.findUnique({ where: { id } });
    if (!topic) {
      throw new NotFoundException(`Topic ${id} không tìm thấy`);
    }

    if (dto.slug && dto.slug !== topic.slug) {
      const existing = await this.prisma.topic.findUnique({
        where: { slug: dto.slug },
      });
      if (existing) {
        throw new ConflictException(`Slug "${dto.slug}" đã được sử dụng`);
      }
    }

    return this.prisma.topic.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    const topic = await this.prisma.topic.findUnique({ where: { id } });
    if (!topic) {
      throw new NotFoundException(`Topic ${id} không tìm thấy`);
    }

    await this.prisma.topic.delete({ where: { id } });
    return { message: 'Đã xóa topic thành công' };
  }

  // ============================================
  // Word Management
  // ============================================

  async addWords(topicId: string, dto: AddWordsToTopicDto) {
    const topic = await this.prisma.topic.findUnique({ where: { id: topicId } });
    if (!topic) {
      throw new NotFoundException(`Topic ${topicId} không tìm thấy`);
    }

    const maxOrder = await this.prisma.topicWord.aggregate({
      where: { topicId },
      _max: { order: true },
    });
    let nextOrder = (maxOrder._max.order || 0) + 1;

    const results = await Promise.all(
      dto.wordIds.map(async (wordId) => {
        try {
          await this.prisma.topicWord.create({
            data: {
              topicId,
              wordId,
              isCore: dto.isCore || false,
              order: nextOrder++,
            },
          });
          return { wordId, status: 'added' as const };
        } catch (error: any) {
          if (error.code === 'P2002') {
            return { wordId, status: 'skipped' as const };
          }
          return { wordId, status: 'error' as const, error: error.message };
        }
      }),
    );

    await this.updateWordCount(topicId);

    const added = results.filter((r) => r.status === 'added').length;
    const skipped = results.filter((r) => r.status === 'skipped').length;

    return {
      message: `Đã thêm ${added} từ, bỏ qua ${skipped} từ đã có`,
      added,
      skipped,
      results,
    };
  }

  async removeWords(topicId: string, wordIds: string[]) {
    const deleted = await this.prisma.topicWord.deleteMany({
      where: {
        topicId,
        wordId: { in: wordIds },
      },
    });

    await this.updateWordCount(topicId);

    return {
      message: `Đã xóa ${deleted.count} từ khỏi topic`,
      deleted: deleted.count,
    };
  }

  private async updateWordCount(topicId: string) {
    const count = await this.prisma.topicWord.count({
      where: { topicId },
    });

    await this.prisma.topic.update({
      where: { id: topicId },
      data: { wordCount: count },
    });
  }

  // ============================================
  // User Progress
  // ============================================

  async getUserProgress(userId: string) {
    const topics = await this.prisma.topic.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        slug: true,
        nameDe: true,
        nameVi: true,
        icon: true,
        color: true,
        level: true,
        wordCount: true,
      },
    });

    const progress = await this.prisma.topicProgress.findMany({
      where: { userId },
    });

    const progressMap = new Map(progress.map((p) => [p.topicId, p]));

    return topics.map((topic) => {
      const p = progressMap.get(topic.id);
      return {
        ...topic,
        wordsLearned: p?.wordsLearned || 0,
        wordsTotal: topic.wordCount,
        masteryPercent: p?.masteryPercent || 0,
        lastStudiedAt: p?.lastStudiedAt || null,
        completedAt: p?.completedAt || null,
      };
    });
  }

  async updateProgress(userId: string, topicId: string, wordsLearned: number) {
    const topic = await this.prisma.topic.findUnique({
      where: { id: topicId },
      select: { wordCount: true },
    });

    if (!topic) {
      throw new NotFoundException(`Topic ${topicId} không tìm thấy`);
    }

    const masteryPercent =
      topic.wordCount > 0
        ? Math.round((wordsLearned / topic.wordCount) * 100)
        : 0;

    const completedAt = masteryPercent >= 100 ? new Date() : null;

    return this.prisma.topicProgress.upsert({
      where: {
        userId_topicId: { userId, topicId },
      },
      create: {
        userId,
        topicId,
        wordsLearned,
        wordsTotal: topic.wordCount,
        masteryPercent,
        lastStudiedAt: new Date(),
        completedAt,
      },
      update: {
        wordsLearned,
        wordsTotal: topic.wordCount,
        masteryPercent,
        lastStudiedAt: new Date(),
        completedAt,
      },
    });
  }

  // ============================================
  // Statistics
  // ============================================

  async getStats() {
    const [totalTopics, totalWords, byLevel] = await Promise.all([
      this.prisma.topic.count({ where: { isActive: true } }),
      this.prisma.topicWord.count(),
      this.prisma.topic.groupBy({
        by: ['level'],
        where: { isActive: true },
        _count: true,
        orderBy: { level: 'asc' },
      }),
    ]);

    return {
      totalTopics,
      totalWords,
      byLevel: byLevel.map((item) => ({
        level: item.level,
        count: item._count,
      })),
    };
  }
}
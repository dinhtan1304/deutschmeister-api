import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ReviewDto } from './dto/progress.dto';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async getDue(userId: string, limit = 20) {
    return this.prisma.progress.findMany({
      where: {
        userId,
        nextReviewAt: { lte: new Date() },
      },
      include: { word: true },
      orderBy: { nextReviewAt: 'asc' },
      take: limit,
    });
  }

  async getAll(userId: string) {
    return this.prisma.progress.findMany({
      where: { userId },
      include: { word: true },
      orderBy: { nextReviewAt: 'asc' },
    });
  }

  async review(userId: string, dto: ReviewDto) {
    let progress = await this.prisma.progress.findUnique({
      where: { userId_wordId: { userId, wordId: dto.wordId } },
    });

    // Create if not exists
    if (!progress) {
      progress = await this.prisma.progress.create({
        data: { userId, wordId: dto.wordId },
      });
    }

    // SM-2 Algorithm
    const { easeFactor, interval, repetitions } = this.calculateSM2(
      progress.easeFactor,
      progress.interval,
      progress.repetitions,
      dto.rating,
    );

    const nextReviewAt = new Date();
    nextReviewAt.setDate(nextReviewAt.getDate() + interval);

    return this.prisma.progress.update({
      where: { id: progress.id },
      data: {
        easeFactor,
        interval,
        repetitions,
        nextReviewAt,
        lastReviewAt: new Date(),
        totalReviews: { increment: 1 },
        correctCount: { increment: dto.rating !== 'again' ? 1 : 0 },
      },
      include: { word: true },
    });
  }

  async getStats(userId: string) {
    const [total, mastered, learning, due] = await Promise.all([
      this.prisma.progress.count({ where: { userId } }),
      this.prisma.progress.count({ where: { userId, interval: { gte: 21 } } }),
      this.prisma.progress.count({ where: { userId, interval: { gt: 0, lt: 21 } } }),
      this.prisma.progress.count({ where: { userId, nextReviewAt: { lte: new Date() } } }),
    ]);

    return { total, mastered, learning, due, new: total - mastered - learning };
  }

  async addWords(userId: string, wordIds: string[]) {
    const existing = await this.prisma.progress.findMany({
      where: { userId, wordId: { in: wordIds } },
      select: { wordId: true },
    });
    const existingIds = new Set(existing.map(p => p.wordId));
    const newWordIds = wordIds.filter(id => !existingIds.has(id));

    if (newWordIds.length === 0) return { added: 0 };

    await this.prisma.progress.createMany({
      data: newWordIds.map(wordId => ({
        userId,
        wordId,
        nextReviewAt: new Date(),
      })),
      skipDuplicates: true,
    });

    return { added: newWordIds.length };
  }

  private calculateSM2(
    easeFactor: number,
    interval: number,
    repetitions: number,
    rating: 'again' | 'hard' | 'good' | 'easy',
  ) {
    const quality = { again: 0, hard: 3, good: 4, easy: 5 }[rating];

    if (quality < 3) {
      return { easeFactor, interval: 1, repetitions: 0 };
    }

    let newEF = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    newEF = Math.max(1.3, newEF);

    let newInterval: number;
    if (repetitions === 0) {
      newInterval = 1;
    } else if (repetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * newEF);
    }

    return {
      easeFactor: newEF,
      interval: newInterval,
      repetitions: repetitions + 1,
    };
  }
}

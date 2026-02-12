import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ReviewDto } from './dto/progress.dto';
import { calculateSM2, nextReviewDate, isCorrectRating, SM2Rating } from '../../common/utils/sm2';

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

    // SM-2 Algorithm (shared utility)
    const { easeFactor, interval, repetitions } = calculateSM2(
      { easeFactor: progress.easeFactor, interval: progress.interval, repetitions: progress.repetitions },
      dto.rating as SM2Rating,
    );

    return this.prisma.progress.update({
      where: { id: progress.id },
      data: {
        easeFactor,
        interval,
        repetitions,
        nextReviewAt: nextReviewDate(interval),
        lastReviewAt: new Date(),
        totalReviews: { increment: 1 },
        correctCount: { increment: isCorrectRating(dto.rating as SM2Rating) ? 1 : 0 },
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

}
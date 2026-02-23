import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: string, limit = 50) {
    return this.prisma.history.findMany({
      where: { userId },
      include: { word: true },
      orderBy: { viewedAt: 'desc' },
      take: limit,
    });
  }

  async add(userId: string, wordId: string) {
    // deleteMany + create must run atomically. Without a transaction, two
    // concurrent calls can both pass the deleteMany phase then both execute
    // create, producing duplicate history entries for the same word.
    return this.prisma.$transaction(async (tx) => {
      await tx.history.deleteMany({ where: { userId, wordId } });
      return tx.history.create({
        data: { userId, wordId },
        include: { word: true },
      });
    });
  }

  async clear(userId: string) {
    await this.prisma.history.deleteMany({ where: { userId } });
    return { success: true };
  }
}

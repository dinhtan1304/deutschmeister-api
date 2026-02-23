import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: string) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: { word: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async add(userId: string, wordId: string) {
    // Skip the findUnique pre-check: it adds a wasted SELECT round-trip and
    // introduces a race condition — two concurrent requests both see null,
    // both attempt create → unhandled DB unique-constraint error (500).
    // Instead, attempt the INSERT directly and convert the Prisma P2002
    // (unique constraint violation) into a clean ConflictException.
    try {
      return await this.prisma.favorite.create({
        data: { userId, wordId },
        include: { word: true },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException('Already in favorites');
      }
      throw e;
    }
  }

  async remove(userId: string, wordId: string) {
    // Replace findUnique + delete (2 round-trips) with deleteMany + count check
    // (1 round-trip). deleteMany returns the number of deleted rows, so we can
    // still throw NotFoundException when the record didn't exist.
    const result = await this.prisma.favorite.deleteMany({
      where: { userId, wordId },
    });
    if (result.count === 0) throw new NotFoundException('Not in favorites');
    return { success: true };
  }

  async check(userId: string, wordId: string) {
    const favorite = await this.prisma.favorite.findUnique({
      where: { userId_wordId: { userId, wordId } },
    });
    return { isFavorite: !!favorite };
  }
}

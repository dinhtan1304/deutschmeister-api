import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

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
    const existing = await this.prisma.favorite.findUnique({
      where: { userId_wordId: { userId, wordId } },
    });
    if (existing) throw new ConflictException('Already in favorites');

    return this.prisma.favorite.create({
      data: { userId, wordId },
      include: { word: true },
    });
  }

  async remove(userId: string, wordId: string) {
    const favorite = await this.prisma.favorite.findUnique({
      where: { userId_wordId: { userId, wordId } },
    });
    if (!favorite) throw new NotFoundException('Not in favorites');

    await this.prisma.favorite.delete({
      where: { id: favorite.id },
    });
    return { success: true };
  }

  async check(userId: string, wordId: string) {
    const favorite = await this.prisma.favorite.findUnique({
      where: { userId_wordId: { userId, wordId } },
    });
    return { isFavorite: !!favorite };
  }
}

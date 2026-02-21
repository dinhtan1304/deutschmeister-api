import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UpdateProfileDto, UpdateSettingsDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { settings: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: dto,
    });
  }

  async getSettings(userId: string) {
    // upsert is atomic: eliminates the findUnique→create race condition where two
    // simultaneous requests for a new user both see null and both attempt create,
    // causing a unique constraint violation on the second one.
    return this.prisma.settings.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });
  }

  async updateSettings(userId: string, dto: UpdateSettingsDto) {
    // upsert: create row if it doesn't exist yet (e.g. new user)
    return this.prisma.settings.upsert({
      where: { userId },
      update: dto,
      create: { userId, ...dto },
    });
  }

  async getStats(userId: string) {
    // Merged correctAnswers + wrongAnswers into a single aggregate call (was 2 separate calls).
    const [gamesPlayed, sessionAgg, favorites, wordsLearned] = await Promise.all([
      this.prisma.gameSession.count({ where: { userId } }),
      this.prisma.gameSession.aggregate({ where: { userId }, _sum: { correctAnswers: true, wrongAnswers: true } }),
      this.prisma.favorite.count({ where: { userId } }),
      this.prisma.progress.count({ where: { userId, repetitions: { gt: 0 } } }),
    ]);

    const correct = sessionAgg._sum.correctAnswers || 0;
    const wrong = sessionAgg._sum.wrongAnswers || 0;
    const total = correct + wrong;

    return {
      gamesPlayed,
      totalAnswers: total,
      correctAnswers: correct,
      wrongAnswers: wrong,
      accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
      favorites,
      wordsLearned,
    };
  }
}
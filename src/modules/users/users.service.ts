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
    const settings = await this.prisma.settings.findUnique({
      where: { userId },
    });
    if (!settings) throw new NotFoundException('Settings not found');
    return settings;
  }

  async updateSettings(userId: string, dto: UpdateSettingsDto) {
    return this.prisma.settings.update({
      where: { userId },
      data: dto,
    });
  }

  async getStats(userId: string) {
    const [gamesPlayed, totalCorrect, totalWrong, favorites, wordsLearned] = await Promise.all([
      this.prisma.gameSession.count({ where: { userId } }),
      this.prisma.gameSession.aggregate({ where: { userId }, _sum: { correctAnswers: true } }),
      this.prisma.gameSession.aggregate({ where: { userId }, _sum: { wrongAnswers: true } }),
      this.prisma.favorite.count({ where: { userId } }),
      this.prisma.progress.count({ where: { userId, repetitions: { gt: 0 } } }),
    ]);

    const correct = totalCorrect._sum.correctAnswers || 0;
    const wrong = totalWrong._sum.wrongAnswers || 0;
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

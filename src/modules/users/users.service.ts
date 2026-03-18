import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UpdateProfileDto, UpdateSettingsDto } from './dto/users.dto';
import { getLevelFromXp } from '../../common/utils/level';

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

  async addXp(userId: string, amount: number, reason: string): Promise<{ leveledUp: boolean; newLevel: number }> {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { xp: true, level: true } });
    if (!user) return { leveledUp: false, newLevel: 1 };

    const newXp = user.xp + amount;
    const levelInfo = getLevelFromXp(newXp);
    const leveledUp = levelInfo.level > user.level;

    await this.prisma.$transaction([
      this.prisma.xpTransaction.create({ data: { userId, amount, reason } }),
      this.prisma.user.update({ where: { id: userId }, data: { xp: newXp, level: levelInfo.level } }),
    ]);

    return { leveledUp, newLevel: levelInfo.level };
  }

  async getXpInfo(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { xp: true, level: true } });
    if (!user) throw new NotFoundException('User not found');
    return { xp: user.xp, ...getLevelFromXp(user.xp) };
  }

  async getLeaderboard(period: 'weekly' | 'monthly' | 'all-time', limit = 20) {
    const now = new Date();
    let periodStart: Date | undefined;

    if (period === 'weekly') {
      const day = now.getDay();
      const diff = day === 0 ? 6 : day - 1; // Monday = 0
      periodStart = new Date(now);
      periodStart.setDate(now.getDate() - diff);
      periodStart.setHours(0, 0, 0, 0);
    } else if (period === 'monthly') {
      periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    const whereClause = periodStart ? { createdAt: { gte: periodStart } } : {};

    const grouped = await this.prisma.xpTransaction.groupBy({
      by: ['userId'],
      where: whereClause,
      _sum: { amount: true },
      orderBy: { _sum: { amount: 'desc' } },
      take: limit,
    });

    if (grouped.length === 0) return [];

    const userIds = grouped.map((g) => g.userId);
    const users = await this.prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, avatar: true, xp: true, level: true, settings: { select: { showOnLeaderboard: true } } },
    });

    const userMap = new Map(users.map((u) => [u.id, u]));

    return grouped.map((g, idx) => {
      const u = userMap.get(g.userId);
      const show = u?.settings?.showOnLeaderboard ?? true;
      const levelInfo = getLevelFromXp(u?.xp ?? 0);
      return {
        rank: idx + 1,
        userId: show ? g.userId : null,
        name: show ? (u?.name ?? 'Người dùng') : 'Ẩn danh',
        avatar: show ? (u?.avatar ?? null) : null,
        xp: g._sum.amount ?? 0,
        level: u?.level ?? 1,
        levelName: levelInfo.name,
      };
    });
  }

  async getErrorPatterns(userId: string) {
    const ERROR_TO_GRAMMAR: Record<string, string | null> = {
      article: 'artikel-der-die-das',
      conjugation: 'verben-konjugation',
      word_order: 'wortstellung-im-satz',
      case: 'kasus-nominativ-akkusativ-dativ',
      spelling: null,
      vocabulary: null,
      grammar: null,
    };

    // Get writing errors from last 30 writing sessions
    const writingErrors = await this.prisma.writingError.findMany({
      where: { session: { userId } },
      select: { errorType: true },
    });

    // Count by type
    const counts: Record<string, number> = {};
    for (const e of writingErrors) {
      counts[e.errorType] = (counts[e.errorType] ?? 0) + 1;
    }

    const total = writingErrors.length;
    if (total === 0) return [];

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([errorType, count]) => ({
        errorType,
        count,
        percentage: Math.round((count / total) * 100),
        grammarSlug: ERROR_TO_GRAMMAR[errorType] ?? null,
      }));
  }
}
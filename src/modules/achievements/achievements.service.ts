import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UsersService } from '../users/users.service';

export type AchievementTrigger = 'srs_review' | 'game_ended' | 'exam_completed' | 'writing_graded' | 'level_up';

const ACHIEVEMENT_DEFINITIONS = [
  { key: 'first_word',    name: 'Erstes Wort',        nameVi: 'Từ đầu tiên',      description: 'Review your first word',        descriptionVi: 'Ôn từ đầu tiên',           icon: '📚', xpReward: 10,  category: 'vocabulary', check: (s: Stats) => s.wordsLearned >= 1 },
  { key: 'words_10',     name: 'Wortschatz 10',       nameVi: '10 từ vựng',        description: 'Learn 10 words',                descriptionVi: 'Học 10 từ vựng',            icon: '🔤', xpReward: 20,  category: 'vocabulary', check: (s: Stats) => s.wordsLearned >= 10 },
  { key: 'words_50',     name: 'Wortschatz 50',       nameVi: '50 từ vựng',        description: 'Learn 50 words',                descriptionVi: 'Học 50 từ vựng',            icon: '📖', xpReward: 50,  category: 'vocabulary', check: (s: Stats) => s.wordsLearned >= 50 },
  { key: 'words_100',    name: 'Wortschatz 100',      nameVi: '100 từ vựng',       description: 'Learn 100 words',               descriptionVi: 'Học 100 từ vựng',           icon: '🏆', xpReward: 100, category: 'vocabulary', check: (s: Stats) => s.wordsLearned >= 100 },
  { key: 'words_500',    name: 'Wortschatz 500',      nameVi: '500 từ vựng',       description: 'Learn 500 words',               descriptionVi: 'Học 500 từ vựng',           icon: '🎓', xpReward: 200, category: 'vocabulary', check: (s: Stats) => s.wordsLearned >= 500 },
  { key: 'first_game',   name: 'Erstes Spiel',        nameVi: 'Game đầu tiên',     description: 'Complete your first game',      descriptionVi: 'Hoàn thành game đầu tiên',  icon: '🎮', xpReward: 10,  category: 'games',      check: (s: Stats) => s.gamesPlayed >= 1 },
  { key: 'games_10',     name: 'Spieler',             nameVi: 'Người chơi',         description: 'Complete 10 games',             descriptionVi: 'Hoàn thành 10 game',        icon: '🕹️', xpReward: 30,  category: 'games',      check: (s: Stats) => s.gamesPlayed >= 10 },
  { key: 'games_50',     name: 'Spielmeister',        nameVi: 'Bậc thầy game',     description: 'Complete 50 games',             descriptionVi: 'Hoàn thành 50 game',        icon: '🎯', xpReward: 100, category: 'games',      check: (s: Stats) => s.gamesPlayed >= 50 },
  { key: 'first_exam',   name: 'Erste Prüfung',       nameVi: 'Bài thi đầu tiên', description: 'Complete your first exam',      descriptionVi: 'Hoàn thành bài thi đầu tiên', icon: '📝', xpReward: 30, category: 'exams',      check: (s: Stats) => s.examsCompleted >= 1 },
  { key: 'exams_5',      name: 'Prüfungsexperte',     nameVi: 'Chuyên gia thi',    description: 'Complete 5 exams',              descriptionVi: 'Hoàn thành 5 bài thi',      icon: '🎖️', xpReward: 80,  category: 'exams',      check: (s: Stats) => s.examsCompleted >= 5 },
  { key: 'first_writing','name': 'Erste Schrift',     nameVi: 'Bài viết đầu tiên', description: 'Get your first writing graded', descriptionVi: 'Nộp bài writing đầu tiên', icon: '✍️', xpReward: 20,  category: 'writing',    check: (s: Stats) => s.writingGraded >= 1 },
  { key: 'level_5',      name: 'Level 5',             nameVi: 'Cấp độ 5',          description: 'Reach level 5',                descriptionVi: 'Đạt cấp độ 5',              icon: '⭐', xpReward: 0,   category: 'level',      check: (s: Stats) => s.level >= 5 },
  { key: 'level_10',     name: 'Deutschmeister',      nameVi: 'Deutschmeister',    description: 'Reach the maximum level',       descriptionVi: 'Đạt cấp độ tối đa',         icon: '👑', xpReward: 0,   category: 'level',      check: (s: Stats) => s.level >= 10 },
];

interface Stats {
  wordsLearned: number;
  gamesPlayed: number;
  examsCompleted: number;
  writingGraded: number;
  level: number;
}

@Injectable()
export class AchievementsService implements OnModuleInit {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async onModuleInit() {
    await this.seedAchievements();
  }

  private async seedAchievements() {
    for (const def of ACHIEVEMENT_DEFINITIONS) {
      await this.prisma.achievement.upsert({
        where: { key: def.key },
        update: { name: def.name, nameVi: def.nameVi, description: def.description, descriptionVi: def.descriptionVi, icon: def.icon, xpReward: def.xpReward, category: def.category },
        create: { key: def.key, name: def.name, nameVi: def.nameVi, description: def.description, descriptionVi: def.descriptionVi, icon: def.icon, xpReward: def.xpReward, category: def.category },
      });
    }
  }

  async checkAndUnlock(userId: string, trigger: AchievementTrigger): Promise<{ key: string; name: string; nameVi: string; icon: string }[]> {
    // Get current user stats
    const [wordsLearned, gamesPlayed, examsCompleted, writingGraded, user] = await Promise.all([
      this.prisma.progress.count({ where: { userId, repetitions: { gt: 0 } } }),
      this.prisma.gameSession.count({ where: { userId, endedAt: { not: null } } }),
      this.prisma.examReadingSession.count({ where: { userId, status: 'GRADED' } }),
      this.prisma.writingSession.count({ where: { userId, status: 'GRADED' } }),
      this.prisma.user.findUnique({ where: { id: userId }, select: { level: true } }),
    ]);

    const stats: Stats = { wordsLearned, gamesPlayed, examsCompleted, writingGraded, level: user?.level ?? 1 };

    // Get already unlocked achievement keys
    const unlocked = await this.prisma.userAchievement.findMany({
      where: { userId },
      select: { achievement: { select: { key: true } } },
    });
    const unlockedKeys = new Set(unlocked.map((u) => u.achievement.key));

    // Check which new ones can be unlocked
    const allAchievements = await this.prisma.achievement.findMany();
    const achievementMap = new Map(allAchievements.map((a) => [a.key, a]));

    const newlyUnlocked: { key: string; name: string; nameVi: string; icon: string }[] = [];

    for (const def of ACHIEVEMENT_DEFINITIONS) {
      if (unlockedKeys.has(def.key)) continue;
      if (!def.check(stats)) continue;

      const achievement = achievementMap.get(def.key);
      if (!achievement) continue;

      await this.prisma.userAchievement.create({
        data: { userId, achievementId: achievement.id },
      });

      if (achievement.xpReward > 0) {
        this.usersService.addXp(userId, achievement.xpReward, 'achievement').catch(() => null);
      }

      newlyUnlocked.push({ key: achievement.key, name: achievement.name, nameVi: achievement.nameVi, icon: achievement.icon });
    }

    return newlyUnlocked;
  }

  async getUserAchievements(userId: string) {
    const [all, userUnlocked] = await Promise.all([
      this.prisma.achievement.findMany({ orderBy: [{ category: 'asc' }, { xpReward: 'asc' }] }),
      this.prisma.userAchievement.findMany({
        where: { userId },
        include: { achievement: true },
        orderBy: { unlockedAt: 'desc' },
      }),
    ]);

    const unlockedMap = new Map(userUnlocked.map((u) => [u.achievement.key, u.unlockedAt]));

    return all.map((a) => ({
      ...a,
      unlocked: unlockedMap.has(a.key),
      unlockedAt: unlockedMap.get(a.key) ?? null,
    }));
  }
}

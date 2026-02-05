import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import {
  DashboardStatsDto,
  ActivityHeatmapDto,
  ActivityDayDto,
  WeeklyProgressDto,
  TopicProgressDto,
  RecentActivityDto,
  FullDashboardDto,
} from './dto';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  // ============================================
  // Get Full Dashboard
  // ============================================
  async getFullDashboard(userId: string): Promise<FullDashboardDto> {
    const [stats, heatmap, weeklyProgress, topicProgress, recentActivity] =
      await Promise.all([
        this.getStats(userId),
        this.getActivityHeatmap(userId),
        this.getWeeklyProgress(userId),
        this.getTopicProgress(userId),
        this.getRecentActivity(userId),
      ]);

    return {
      stats,
      heatmap,
      weeklyProgress,
      topicProgress,
      recentActivity,
    };
  }

  // ============================================
  // Dashboard Stats
  // ============================================
  async getStats(userId: string): Promise<DashboardStatsDto> {
    // Get various counts in parallel
    const [
      totalWordsLearned,
      totalWords,
      gameStats,
      topicStats,
      wordsToReview,
      userProgress,
      firstActivity,
    ] = await Promise.all([
      // Words learned (from progress table with repetitions > 0)
      this.prisma.progress.count({
        where: { userId, repetitions: { gt: 0 } },
      }),
      // Total words in system
      this.prisma.word.count(),
      // Game statistics
      this.prisma.gameSession.aggregate({
        where: { userId },
        _count: true,
        _sum: {
          correctAnswers: true,
          wrongAnswers: true,
          duration: true,
        },
      }),
      // Topic statistics
      this.prisma.topicProgress.aggregate({
        where: { userId, masteryPercent: { gte: 100 } },
        _count: true,
      }),
      // Words due for review
      this.prisma.progress.count({
        where: {
          userId,
          nextReviewAt: { lte: new Date() },
        },
      }),
      // User's first progress entry (to calculate start date)
      this.prisma.progress.findFirst({
        where: { userId },
        orderBy: { createdAt: 'asc' },
        select: { createdAt: true },
      }),
      // First activity
      this.prisma.gameSession.findFirst({
        where: { userId },
        orderBy: { startedAt: 'asc' },
        select: { startedAt: true },
      }),
    ]);

    // Calculate accuracy
    const totalCorrect = gameStats._sum.correctAnswers || 0;
    const totalWrong = gameStats._sum.wrongAnswers || 0;
    const totalAnswers = totalCorrect + totalWrong;
    const accuracy = totalAnswers > 0 ? (totalCorrect / totalAnswers) * 100 : 0;

    // Calculate total minutes
    const totalMinutes = Math.round((gameStats._sum.duration || 0) / 60);

    // Get total topics
    const totalTopics = await this.prisma.topic.count({ where: { isActive: true } });

    // Calculate streak
    const streak = await this.calculateStreak(userId);

    // Determine start date
    const startedAt =
      userProgress?.createdAt || firstActivity?.startedAt || new Date();

    return {
      streak,
      totalWordsLearned,
      totalWords,
      accuracy: Math.round(accuracy * 10) / 10,
      totalMinutes,
      topicsCompleted: topicStats._count,
      totalTopics,
      wordsToReview,
      gamesPlayed: gameStats._count || 0,
      startedAt: startedAt.toISOString().split('T')[0],
    };
  }

  // ============================================
  // Activity Heatmap (Last 365 days)
  // ============================================
  async getActivityHeatmap(userId: string): Promise<ActivityHeatmapDto> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 365);

    // Get all activities grouped by date
    const [gameActivities, reviewActivities] = await Promise.all([
      // Game sessions
      this.prisma.gameSession.groupBy({
        by: ['startedAt'],
        where: {
          userId,
          startedAt: { gte: startDate, lte: endDate },
        },
        _count: true,
      }),
      // Progress reviews
      this.prisma.progress.findMany({
        where: {
          userId,
          lastReviewAt: { gte: startDate, lte: endDate },
        },
        select: { lastReviewAt: true },
      }),
    ]);

    // Aggregate by date
    const activityMap = new Map<string, number>();

    // Add game activities
    gameActivities.forEach((g) => {
      const date = g.startedAt.toISOString().split('T')[0];
      activityMap.set(date, (activityMap.get(date) || 0) + g._count);
    });

    // Add review activities
    reviewActivities.forEach((r) => {
      if (r.lastReviewAt) {
        const date = r.lastReviewAt.toISOString().split('T')[0];
        activityMap.set(date, (activityMap.get(date) || 0) + 1);
      }
    });

    // Build heatmap data
    const data: ActivityDayDto[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      const dateStr = current.toISOString().split('T')[0];
      const count = activityMap.get(dateStr) || 0;
      
      // Calculate level (0-4) based on activity count
      let level = 0;
      if (count > 0) level = 1;
      if (count >= 3) level = 2;
      if (count >= 6) level = 3;
      if (count >= 10) level = 4;

      data.push({ date: dateStr, count, level });
      current.setDate(current.getDate() + 1);
    }

    // Calculate streaks
    const { currentStreak, longestStreak } = this.calculateStreaksFromData(data);
    const totalActiveDays = data.filter((d) => d.count > 0).length;

    return {
      data,
      totalActiveDays,
      currentStreak,
      longestStreak,
    };
  }

  // ============================================
  // Weekly Progress (Last 7 days)
  // ============================================
  /**
   * OPTIMIZED: Batch query for 7 days (2 queries instead of 14)
   * Trước: 7 ngày × 2 queries = 14 queries
   * Sau: 2 queries total
   */
  async getWeeklyProgress(userId: string): Promise<WeeklyProgressDto[]> {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Calculate date range
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    // Batch query: 2 queries thay vì 14
    const [gameSessions, progressData] = await Promise.all([
      this.prisma.gameSession.findMany({
        where: {
          userId,
          startedAt: { gte: sevenDaysAgo, lte: today },
        },
        select: { startedAt: true, duration: true },
      }),
      this.prisma.progress.findMany({
        where: {
          userId,
          OR: [
            { createdAt: { gte: sevenDaysAgo, lte: today } },
            { lastReviewAt: { gte: sevenDaysAgo, lte: today } },
          ],
        },
        select: { createdAt: true, lastReviewAt: true },
      }),
    ]);

    // Aggregate in memory by date
    const dateMap = new Map<
      string,
      { gamesPlayed: number; duration: number; wordsLearned: Set<string> }
    >();

    // Initialize all 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dateMap.set(dateStr, { gamesPlayed: 0, duration: 0, wordsLearned: new Set() });
    }

    // Aggregate game sessions
    gameSessions.forEach((g) => {
      const dateStr = g.startedAt.toISOString().split('T')[0];
      const entry = dateMap.get(dateStr);
      if (entry) {
        entry.gamesPlayed++;
        entry.duration += g.duration || 0;
      }
    });

    // Aggregate progress (count unique activities per day)
    progressData.forEach((p) => {
      // Check createdAt
      if (p.createdAt) {
        const dateStr = p.createdAt.toISOString().split('T')[0];
        const entry = dateMap.get(dateStr);
        if (entry) {
          entry.wordsLearned.add(`created-${p.createdAt.getTime()}`);
        }
      }
      // Check lastReviewAt
      if (p.lastReviewAt) {
        const dateStr = p.lastReviewAt.toISOString().split('T')[0];
        const entry = dateMap.get(dateStr);
        if (entry) {
          entry.wordsLearned.add(`reviewed-${p.lastReviewAt.getTime()}`);
        }
      }
    });

    // Build result array
    const days: WeeklyProgressDto[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const dateStr = date.toISOString().split('T')[0];
      const entry = dateMap.get(dateStr)!;

      days.push({
        day: dayNames[date.getDay()],
        date: dateStr,
        wordsLearned: entry.wordsLearned.size,
        gamesPlayed: entry.gamesPlayed,
        minutes: Math.round(entry.duration / 60),
      });
    }

    return days;
  }

  // ============================================
  // Topic Progress
  // ============================================
  async getTopicProgress(userId: string): Promise<TopicProgressDto[]> {
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
        wordCount: true,
      },
    });

    const progress = await this.prisma.topicProgress.findMany({
      where: { userId },
    });

    const progressMap = new Map(progress.map((p) => [p.topicId, p]));

    return topics.map((topic) => {
      const p = progressMap.get(topic.id);
      const wordsLearned = p?.wordsLearned || 0;
      const totalWords = topic.wordCount;
      const percent = totalWords > 0 ? (wordsLearned / totalWords) * 100 : 0;

      return {
        id: topic.id,
        slug: topic.slug,
        nameDe: topic.nameDe,
        nameVi: topic.nameVi,
        icon: topic.icon || '📚',
        color: topic.color || '#3B82F6',
        wordsLearned,
        totalWords,
        percent: Math.round(percent * 10) / 10,
      };
    });
  }

  // ============================================
  // Recent Activity
  // ============================================
  async getRecentActivity(userId: string, limit = 10): Promise<RecentActivityDto[]> {
    const activities: RecentActivityDto[] = [];

    // Get recent game sessions
    const recentGames = await this.prisma.gameSession.findMany({
      where: { userId },
      orderBy: { startedAt: 'desc' },
      take: limit,
      select: {
        gameType: true,
        correctAnswers: true,
        totalQuestions: true,
        startedAt: true,
      },
    });

    // Get recent progress updates
    const recentProgress = await this.prisma.progress.findMany({
      where: { userId, lastReviewAt: { not: null } },
      orderBy: { lastReviewAt: 'desc' },
      take: limit,
      include: {
        word: {
          select: { word: true, article: true },
        },
      },
    });

    // Add game activities
    recentGames.forEach((game) => {
      const gameNames: Record<string, string> = {
        'quick-quiz': 'Quick Quiz',
        'flashcard': 'Flashcards',
        'fill-blank': 'Điền từ',
        'timed-challenge': 'Timed Challenge',
      };

      activities.push({
        type: 'game',
        description: `Chơi ${gameNames[game.gameType] || game.gameType} - ${game.correctAnswers}/${game.totalQuestions} đúng`,
        timestamp: game.startedAt.toISOString(),
        metadata: game.gameType,
      });
    });

    // Add review activities
    recentProgress.forEach((p) => {
      if (p.lastReviewAt) {
        activities.push({
          type: 'review',
          description: `Ôn tập: ${p.word.article} ${p.word.word}`,
          timestamp: p.lastReviewAt.toISOString(),
          metadata: p.wordId,
        });
      }
    });

    // Sort by timestamp and return top items
    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  // ============================================
  // Helper Methods
  // ============================================

  /**
   * OPTIMIZED: Calculate streak with batch query (2 queries instead of N*2)
   * Trước: 30 ngày streak = 60 queries
   * Sau: 30 ngày streak = 2 queries
   */
  private async calculateStreak(userId: string): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Batch query: lấy tất cả activities trong 60 ngày gần nhất (1 lần)
    const sixtyDaysAgo = new Date(today);
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const [gameSessions, progressReviews] = await Promise.all([
      this.prisma.gameSession.findMany({
        where: {
          userId,
          startedAt: { gte: sixtyDaysAgo },
        },
        select: { startedAt: true },
      }),
      this.prisma.progress.findMany({
        where: {
          userId,
          lastReviewAt: { gte: sixtyDaysAgo },
        },
        select: { lastReviewAt: true },
      }),
    ]);

    // Build set of active dates (in memory - very fast)
    const activeDates = new Set<string>();

    gameSessions.forEach((g) => {
      const dateStr = g.startedAt.toISOString().split('T')[0];
      activeDates.add(dateStr);
    });

    progressReviews.forEach((p) => {
      if (p.lastReviewAt) {
        const dateStr = p.lastReviewAt.toISOString().split('T')[0];
        activeDates.add(dateStr);
      }
    });

    // Calculate streak from today backwards (in memory)
    let streak = 0;
    let currentDate = new Date(today);
    let checkedToday = false;

    for (let i = 0; i < 60; i++) {
      const dateStr = currentDate.toISOString().split('T')[0];

      if (activeDates.has(dateStr)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
        checkedToday = true;
      } else {
        // If today has no activity yet, check yesterday
        if (!checkedToday && i === 0) {
          currentDate.setDate(currentDate.getDate() - 1);
          checkedToday = true;
          continue;
        }
        break;
      }
    }

    return streak;
  }

  private calculateStreaksFromData(
    data: ActivityDayDto[],
  ): { currentStreak: number; longestStreak: number } {
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    // Calculate from most recent (end of array)
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].count > 0) {
        tempStreak++;
        if (i === data.length - 1 || i === data.length - 2) {
          currentStreak = tempStreak;
        }
      } else {
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
        tempStreak = 0;
        if (currentStreak === 0 && i < data.length - 2) {
          // Already passed today/yesterday with no activity
        }
      }
    }

    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }

    return { currentStreak, longestStreak };
  }
}
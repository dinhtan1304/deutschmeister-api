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
    const [
      srsWordsLearned,
      totalWords,
      gameStats,
      topicStats,
      wordsToReview,
      userProgress,
      firstActivity,
      // sum of wordsLearned from topicProgress
      topicWordsAggregate,
      firstTopicActivity,
      // Grammar stats
      grammarCompleted,
      grammarTotal,
    ] = await Promise.all([
      // Words learned (from SRS progress table with repetitions > 0)
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
      // Topic statistics (completed topics)
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
      // User's first SRS progress entry
      this.prisma.progress.findFirst({
        where: { userId },
        orderBy: { createdAt: 'asc' },
        select: { createdAt: true },
      }),
      // First game session
      this.prisma.gameSession.findFirst({
        where: { userId },
        orderBy: { startedAt: 'asc' },
        select: { startedAt: true },
      }),
      // Total words learned across all topics
      this.prisma.topicProgress.aggregate({
        where: { userId },
        _sum: { wordsLearned: true },
      }),
      // First topic study activity
      this.prisma.topicProgress.findFirst({
        where: { userId },
        orderBy: { createdAt: 'asc' },
        select: { createdAt: true },
      }),
      // Grammar: completed lessons
      this.prisma.grammarProgress.count({
        where: { userId, status: 'completed' },
      }),
      // Grammar: total active lessons
      this.prisma.grammarLesson.count({
        where: { isActive: true },
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

    // Use the greater of SRS words or topic words learned
    const topicWordsLearned = topicWordsAggregate._sum.wordsLearned || 0;
    const totalWordsLearned = Math.max(srsWordsLearned, topicWordsLearned);

    // Consider all activity sources for start date
    const startedAt =
      userProgress?.createdAt ||
      firstActivity?.startedAt ||
      firstTopicActivity?.createdAt ||
      new Date();

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
      startedAt: this.toLocalDateStr(startedAt),
      grammarCompleted,
      grammarTotal,
    };
  }

  // ============================================
  // Activity Heatmap (Last 365 days)
  // ============================================
  async getActivityHeatmap(userId: string): Promise<ActivityHeatmapDto> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 365);

    const [gameActivities, reviewActivities, topicActivities, grammarActivities] = await Promise.all([
      // Game sessions
      this.prisma.gameSession.findMany({
        where: {
          userId,
          startedAt: { gte: startDate, lte: endDate },
        },
        select: { startedAt: true },
      }),
      // SRS Progress reviews
      this.prisma.progress.findMany({
        where: {
          userId,
          lastReviewAt: { gte: startDate, lte: endDate },
        },
        select: { lastReviewAt: true },
      }),
      // Topic study activities
      this.prisma.topicProgress.findMany({
        where: {
          userId,
          OR: [
            { lastStudiedAt: { gte: startDate, lte: endDate } },
            { updatedAt: { gte: startDate, lte: endDate } },
          ],
        },
        select: { lastStudiedAt: true, updatedAt: true, wordsLearned: true },
      }),
      // Grammar exercise submissions
      this.prisma.grammarProgress.findMany({
        where: {
          userId,
          lastAttemptAt: { gte: startDate, lte: endDate },
        },
        select: { lastAttemptAt: true, totalAttempts: true },
      }),
    ]);

    // Aggregate by date
    const activityMap = new Map<string, number>();

    gameActivities.forEach((g) => {
      const date = this.toLocalDateStr(g.startedAt);
      activityMap.set(date, (activityMap.get(date) || 0) + 1);
    });

    reviewActivities.forEach((r) => {
      if (r.lastReviewAt) {
        const date = this.toLocalDateStr(r.lastReviewAt);
        activityMap.set(date, (activityMap.get(date) || 0) + 1);
      }
    });

    topicActivities.forEach((t) => {
      const date = t.lastStudiedAt
        ? this.toLocalDateStr(t.lastStudiedAt)
        : this.toLocalDateStr(t.updatedAt);
      const count = Math.max(t.wordsLearned, 1);
      activityMap.set(date, (activityMap.get(date) || 0) + count);
    });

    // Grammar activities
    grammarActivities.forEach((g) => {
      if (g.lastAttemptAt) {
        const date = this.toLocalDateStr(g.lastAttemptAt);
        activityMap.set(date, (activityMap.get(date) || 0) + 1);
      }
    });

    // Build heatmap data
    const data: ActivityDayDto[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      const dateStr = this.toLocalDateStr(current);
      const count = activityMap.get(dateStr) || 0;

      let level = 0;
      if (count > 0) level = 1;
      if (count >= 3) level = 2;
      if (count >= 6) level = 3;
      if (count >= 10) level = 4;

      data.push({ date: dateStr, count, level });
      current.setDate(current.getDate() + 1);
    }

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
  async getWeeklyProgress(userId: string): Promise<WeeklyProgressDto[]> {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const [gameSessions, progressData, topicStudyData, grammarData] = await Promise.all([
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
      this.prisma.topicProgress.findMany({
        where: {
          userId,
          OR: [
            { lastStudiedAt: { gte: sevenDaysAgo, lte: today } },
            { updatedAt: { gte: sevenDaysAgo, lte: today } },
          ],
        },
        select: { lastStudiedAt: true, updatedAt: true, wordsLearned: true },
      }),
      // Grammar submissions in last 7 days
      this.prisma.grammarProgress.findMany({
        where: {
          userId,
          lastAttemptAt: { gte: sevenDaysAgo, lte: today },
        },
        select: { lastAttemptAt: true },
      }),
    ]);

    // Aggregate in memory by date
    const dateMap = new Map<
      string,
      { gamesPlayed: number; duration: number; wordsLearned: number }
    >();

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = this.toLocalDateStr(date);
      dateMap.set(dateStr, { gamesPlayed: 0, duration: 0, wordsLearned: 0 });
    }

    gameSessions.forEach((g) => {
      const dateStr = this.toLocalDateStr(g.startedAt);
      const entry = dateMap.get(dateStr);
      if (entry) {
        entry.gamesPlayed++;
        entry.duration += g.duration || 0;
      }
    });

    const progressPerDay = new Map<string, Set<string>>();
    progressData.forEach((p) => {
      if (p.createdAt) {
        const dateStr = this.toLocalDateStr(p.createdAt);
        if (!progressPerDay.has(dateStr)) progressPerDay.set(dateStr, new Set());
        progressPerDay.get(dateStr)!.add(`created-${p.createdAt.getTime()}`);
      }
      if (p.lastReviewAt) {
        const dateStr = this.toLocalDateStr(p.lastReviewAt);
        if (!progressPerDay.has(dateStr)) progressPerDay.set(dateStr, new Set());
        progressPerDay.get(dateStr)!.add(`reviewed-${p.lastReviewAt.getTime()}`);
      }
    });

    progressPerDay.forEach((set, dateStr) => {
      const entry = dateMap.get(dateStr);
      if (entry) {
        entry.wordsLearned += set.size;
      }
    });

    topicStudyData.forEach((t) => {
      const date = t.lastStudiedAt
        ? this.toLocalDateStr(t.lastStudiedAt)
        : this.toLocalDateStr(t.updatedAt);
      const entry = dateMap.get(date);
      if (entry) {
        entry.wordsLearned += t.wordsLearned;
      }
    });

    // Grammar activities count as games played
    grammarData.forEach((g) => {
      if (g.lastAttemptAt) {
        const dateStr = this.toLocalDateStr(g.lastAttemptAt);
        const entry = dateMap.get(dateStr);
        if (entry) {
          entry.gamesPlayed++;
        }
      }
    });

    // Build result array
    const days: WeeklyProgressDto[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const dateStr = this.toLocalDateStr(date);
      const entry = dateMap.get(dateStr);

      days.push({
        day: dayNames[date.getDay()],
        date: dateStr,
        wordsLearned: entry?.wordsLearned ?? 0,
        gamesPlayed: entry?.gamesPlayed ?? 0,
        minutes: Math.round((entry?.duration ?? 0) / 60),
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

    const [recentGames, recentProgress, recentTopicStudy, recentGrammar] = await Promise.all([
      // Get recent game sessions
      this.prisma.gameSession.findMany({
        where: { userId },
        orderBy: { startedAt: 'desc' },
        take: limit,
        select: {
          gameType: true,
          correctAnswers: true,
          totalQuestions: true,
          score: true,
          startedAt: true,
        },
      }),
      // Get recent SRS progress updates
      this.prisma.progress.findMany({
        where: { userId, lastReviewAt: { not: null } },
        orderBy: { lastReviewAt: 'desc' },
        take: limit,
        include: {
          word: {
            select: { word: true, article: true },
          },
        },
      }),
      // Get recent topic study activities
      this.prisma.topicProgress.findMany({
        where: { userId, lastStudiedAt: { not: null } },
        orderBy: { lastStudiedAt: 'desc' },
        take: limit,
        include: {
          topic: {
            select: { nameVi: true, nameDe: true, icon: true },
          },
        },
      }),
      // Get recent grammar submissions
      this.prisma.grammarProgress.findMany({
        where: { userId, lastAttemptAt: { not: null } },
        orderBy: { lastAttemptAt: 'desc' },
        take: limit,
        include: {
          lesson: {
            select: { titleVi: true, titleDe: true, level: true },
          },
        },
      }),
    ]);

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

    // Add SRS review activities
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

    // Add topic study activities
    recentTopicStudy.forEach((tp) => {
      if (tp.lastStudiedAt) {
        activities.push({
          type: 'topic',
          description: `Học ${tp.topic.nameVi || tp.topic.nameDe} - ${tp.wordsLearned} từ`,
          timestamp: tp.lastStudiedAt.toISOString(),
          metadata: tp.topicId,
        });
      }
    });

    // Add grammar activities
    recentGrammar.forEach((gp) => {
      if (gp.lastAttemptAt) {
        const statusText = gp.status === 'completed'
          ? `✅ Hoàn thành ${Math.round(gp.score ?? 0)}%`
          : `📝 ${gp.correctCount}/${gp.totalAttempts > 0 ? 'đang làm' : 'bắt đầu'}`;

        activities.push({
          type: 'grammar',
          description: `Ngữ pháp ${gp.lesson.level}: ${gp.lesson.titleVi} - ${statusText}`,
          timestamp: gp.lastAttemptAt.toISOString(),
          metadata: gp.lessonId,
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
   * Calculate streak - includes ALL activity sources
   */
  private async calculateStreak(userId: string): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sixtyDaysAgo = new Date(today);
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const [gameSessions, progressReviews, topicStudy, grammarStudy] = await Promise.all([
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
      this.prisma.topicProgress.findMany({
        where: {
          userId,
          OR: [
            { lastStudiedAt: { gte: sixtyDaysAgo } },
            { updatedAt: { gte: sixtyDaysAgo } },
          ],
        },
        select: { lastStudiedAt: true, updatedAt: true },
      }),
      // Grammar study dates
      this.prisma.grammarProgress.findMany({
        where: {
          userId,
          lastAttemptAt: { gte: sixtyDaysAgo },
        },
        select: { lastAttemptAt: true },
      }),
    ]);

    // Build set of active dates
    const activeDates = new Set<string>();

    gameSessions.forEach((g) => {
      activeDates.add(this.toLocalDateStr(g.startedAt));
    });

    progressReviews.forEach((p) => {
      if (p.lastReviewAt) {
        activeDates.add(this.toLocalDateStr(p.lastReviewAt));
      }
    });

    topicStudy.forEach((t) => {
      if (t.lastStudiedAt) {
        activeDates.add(this.toLocalDateStr(t.lastStudiedAt));
      }
      if (t.updatedAt) {
        activeDates.add(this.toLocalDateStr(t.updatedAt));
      }
    });

    // Grammar dates
    grammarStudy.forEach((g) => {
      if (g.lastAttemptAt) {
        activeDates.add(this.toLocalDateStr(g.lastAttemptAt));
      }
    });

    // Calculate streak from today backwards
    let streak = 0;
    let currentDate = new Date(today);
    let checkedToday = false;

    for (let i = 0; i < 60; i++) {
      const dateStr = this.toLocalDateStr(currentDate);

      if (activeDates.has(dateStr)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
        checkedToday = true;
      } else {
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
      }
    }

    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }

    return { currentStreak, longestStreak };
  }

  /**
   * Convert Date to YYYY-MM-DD string in local timezone.
   */
  private toLocalDateStr(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}
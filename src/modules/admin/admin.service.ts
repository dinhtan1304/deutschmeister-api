import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { QueryUsersAdminDto } from './dto/query-users-admin.dto';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - 7);
    const monthStart = new Date(now);
    monthStart.setDate(monthStart.getDate() - 30);

    const [
      totalUsers, activeUsers, adminUsers,
      totalWords, totalTopics, totalGrammarLessons,
      newUsersThisWeek, newUsersThisMonth,
      premiumUsers,
      // All-time totals per feature
      totalWriting, totalReading, totalListening,
      totalExamReading, totalExamWriting, totalExamListening,
      totalExamSpeaking, totalFreeSpeaking,
      // Today counts per feature
      writingToday, readingToday, listeningToday,
      examReadingToday, examWritingToday, examListeningToday,
      examSpeakingToday, freeSpeakingToday,
      // This week counts per feature
      writingWeek, readingWeek, listeningWeek,
      examReadingWeek, examWritingWeek, examListeningWeek,
      examSpeakingWeek, freeSpeakingWeek,
      // Graded sessions for avg score
      gradedWriting, gradedExamWriting, gradedExamReading,
      gradedExamListening, gradedExamSpeaking,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { isActive: true } }),
      this.prisma.user.count({ where: { role: 'admin' } }),
      this.prisma.word.count(),
      this.prisma.topic.count(),
      this.prisma.grammarLesson.count(),
      this.prisma.user.count({ where: { createdAt: { gte: weekStart } } }),
      this.prisma.user.count({ where: { createdAt: { gte: monthStart } } }),
      this.prisma.userSubscription.count({
        where: {
          plan: 'premium', status: 'active',
          OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
        },
      }),
      // All-time per feature
      this.prisma.writingSession.count(),
      this.prisma.readingSession.count(),
      this.prisma.listeningSession.count(),
      this.prisma.examReadingSession.count(),
      this.prisma.examWritingSession.count(),
      this.prisma.examListeningSession.count(),
      this.prisma.examSpeakingSession.count(),
      this.prisma.freeSpeakingSession.count(),
      // Today
      this.prisma.writingSession.count({ where: { createdAt: { gte: todayStart } } }),
      this.prisma.readingSession.count({ where: { createdAt: { gte: todayStart } } }),
      this.prisma.listeningSession.count({ where: { createdAt: { gte: todayStart } } }),
      this.prisma.examReadingSession.count({ where: { createdAt: { gte: todayStart } } }),
      this.prisma.examWritingSession.count({ where: { createdAt: { gte: todayStart } } }),
      this.prisma.examListeningSession.count({ where: { createdAt: { gte: todayStart } } }),
      this.prisma.examSpeakingSession.count({ where: { createdAt: { gte: todayStart } } }),
      this.prisma.freeSpeakingSession.count({ where: { createdAt: { gte: todayStart } } }),
      // This week
      this.prisma.writingSession.count({ where: { createdAt: { gte: weekStart } } }),
      this.prisma.readingSession.count({ where: { createdAt: { gte: weekStart } } }),
      this.prisma.listeningSession.count({ where: { createdAt: { gte: weekStart } } }),
      this.prisma.examReadingSession.count({ where: { createdAt: { gte: weekStart } } }),
      this.prisma.examWritingSession.count({ where: { createdAt: { gte: weekStart } } }),
      this.prisma.examListeningSession.count({ where: { createdAt: { gte: weekStart } } }),
      this.prisma.examSpeakingSession.count({ where: { createdAt: { gte: weekStart } } }),
      this.prisma.freeSpeakingSession.count({ where: { createdAt: { gte: weekStart } } }),
      // Graded sessions for avg score
      this.prisma.writingSession.findMany({ where: { status: 'GRADED' }, select: { overallScore: true } }),
      this.prisma.examWritingSession.findMany({ where: { status: 'GRADED' }, select: { totalScore: true } }),
      this.prisma.examReadingSession.findMany({ where: { status: 'SUBMITTED' }, select: { score: true } }),
      this.prisma.examListeningSession.findMany({ where: { status: 'SUBMITTED' }, select: { score: true } }),
      this.prisma.examSpeakingSession.findMany({ where: { status: 'GRADED' }, select: { totalScore: true } }),
    ]);

    const sessionsToday = writingToday + readingToday + listeningToday + examReadingToday + examWritingToday + examListeningToday + examSpeakingToday + freeSpeakingToday;
    const sessionsThisWeek = writingWeek + readingWeek + listeningWeek + examReadingWeek + examWritingWeek + examListeningWeek + examSpeakingWeek + freeSpeakingWeek;
    const sessionsAllTime = totalWriting + totalReading + totalListening + totalExamReading + totalExamWriting + totalExamListening + totalExamSpeaking + totalFreeSpeaking;

    // AI-powered sessions = those that call Gemini for generation/grading
    const aiSessionsAllTime = totalWriting + totalExamWriting + totalExamSpeaking + totalFreeSpeaking;
    const aiSessionsToday = writingToday + examWritingToday + examSpeakingToday + freeSpeakingToday;
    const aiSessionsWeek = writingWeek + examWritingWeek + examSpeakingWeek + freeSpeakingWeek;

    // Calculate average score across all graded session types
    const allScores: number[] = [
      ...gradedWriting.map(s => s.overallScore ?? 0),
      ...gradedExamWriting.map(s => s.totalScore ?? 0),
      ...gradedExamReading.map(s => (s.score ?? 0)),
      ...gradedExamListening.map(s => (s.score ?? 0)),
      ...gradedExamSpeaking.map(s => s.totalScore ?? 0),
    ].filter(s => s > 0);

    const avgScore = allScores.length > 0
      ? allScores.reduce((a, b) => a + b, 0) / allScores.length
      : 0;

    return {
      // Users
      totalUsers, activeUsers, adminUsers,
      newUsersThisWeek, newUsersThisMonth, premiumUsers,
      // Content
      totalWords, totalTopics, totalGrammarLessons,
      // Traffic summary
      sessionsToday, sessionsThisWeek, sessionsAllTime,
      // AI usage
      aiSessionsAllTime, aiSessionsToday, aiSessionsWeek,
      avgScore: Math.round(avgScore * 10) / 10,
      // Per-feature all-time
      features: {
        writing: { total: totalWriting, today: writingToday, week: writingWeek, isAi: true },
        reading: { total: totalReading, today: readingToday, week: readingWeek, isAi: false },
        listening: { total: totalListening, today: listeningToday, week: listeningWeek, isAi: false },
        examReading: { total: totalExamReading, today: examReadingToday, week: examReadingWeek, isAi: false },
        examWriting: { total: totalExamWriting, today: examWritingToday, week: examWritingWeek, isAi: true },
        examListening: { total: totalExamListening, today: examListeningToday, week: examListeningWeek, isAi: false },
        examSpeaking: { total: totalExamSpeaking, today: examSpeakingToday, week: examSpeakingWeek, isAi: true },
        freeSpeaking: { total: totalFreeSpeaking, today: freeSpeakingToday, week: freeSpeakingWeek, isAi: true },
      },
    };
  }

  async getUsers(dto: QueryUsersAdminDto) {
    const { page = 1, limit = 20, search, role, isActive, plan } = dto;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (role) where.role = role;
    if (isActive !== undefined) where.isActive = isActive === 'true';
    if (plan === 'premium') {
      const now = new Date();
      where.subscription = {
        is: {
          plan: 'premium',
          status: 'active',
          OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
        },
      };
    } else if (plan === 'free') {
      where.subscription = { is: null };
    }

    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true, email: true, name: true, avatar: true,
          role: true, isActive: true, createdAt: true, updatedAt: true,
          subscription: { select: { plan: true, status: true, expiresAt: true } },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true, email: true, name: true, avatar: true,
        role: true, isActive: true, createdAt: true, updatedAt: true,
        subscription: { select: { plan: true, status: true, expiresAt: true } },
      },
    });
    if (!user) throw new NotFoundException('Không tìm thấy người dùng.');

    // Aggregate stats in parallel
    const [
      totalWriting, totalReading, totalListening,
      totalExamReading, totalExamWriting, totalExamListening,
      totalExamSpeaking, totalFreeSpeaking,
      gradedWriting, gradedExamWriting, gradedExamSpeaking,
    ] = await Promise.all([
      this.prisma.writingSession.count({ where: { userId } }),
      this.prisma.readingSession.count({ where: { userId } }),
      this.prisma.listeningSession.count({ where: { userId } }),
      this.prisma.examReadingSession.count({ where: { userId } }),
      this.prisma.examWritingSession.count({ where: { userId } }),
      this.prisma.examListeningSession.count({ where: { userId } }),
      this.prisma.examSpeakingSession.count({ where: { userId } }),
      this.prisma.freeSpeakingSession.count({ where: { userId } }),
      this.prisma.writingSession.findMany({ where: { userId, status: 'GRADED' }, select: { overallScore: true }, take: 50 }),
      this.prisma.examWritingSession.findMany({ where: { userId, status: 'GRADED' }, select: { totalScore: true }, take: 50 }),
      this.prisma.examSpeakingSession.findMany({ where: { userId, status: 'GRADED' }, select: { totalScore: true }, take: 50 }),
    ]);

    const totalSessions = totalWriting + totalReading + totalListening + totalExamReading + totalExamWriting + totalExamListening + totalExamSpeaking + totalFreeSpeaking;

    const scores = [
      ...gradedWriting.map(s => s.overallScore ?? 0),
      ...gradedExamWriting.map(s => s.totalScore ?? 0),
      ...gradedExamSpeaking.map(s => s.totalScore ?? 0),
    ].filter(s => s > 0);
    const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

    return {
      ...user,
      stats: {
        totalSessions,
        writing: totalWriting, reading: totalReading, listening: totalListening,
        examReading: totalExamReading, examWriting: totalExamWriting,
        examListening: totalExamListening, examSpeaking: totalExamSpeaking,
        freeSpeaking: totalFreeSpeaking,
        avgScore: Math.round(avgScore * 10) / 10,
      },
    };
  }

  async updateUser(adminId: string, userId: string, dto: UpdateUserAdminDto) {
    // Prevent admin from removing their own admin role
    if (adminId === userId && dto.role && dto.role !== 'admin') {
      throw new ForbiddenException('Không thể tự xóa quyền admin của chính mình.');
    }
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Không tìm thấy người dùng.');

    return this.prisma.user.update({
      where: { id: userId },
      data: dto,
      select: { id: true, email: true, name: true, avatar: true, role: true, isActive: true, createdAt: true },
    });
  }

  async deleteUser(adminId: string, userId: string) {
    if (adminId === userId) {
      throw new ForbiddenException('Không thể xóa tài khoản admin của chính mình.');
    }
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Không tìm thấy người dùng.');

    await this.prisma.user.delete({ where: { id: userId } });
    return { success: true };
  }
}

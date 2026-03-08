import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../database/prisma.service';

const DAILY_LIMIT = 3;

@Injectable()
export class PracticeQuotaGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) throw new ForbiddenException('Cần đăng nhập');

    // Premium users have unlimited access
    const sub = await this.prisma.userSubscription.findUnique({
      where: { userId: user.id },
    });
    const isPremium =
      sub?.plan === 'premium' &&
      sub.status === 'active' &&
      (!sub.expiresAt || sub.expiresAt > new Date());

    if (isPremium) return true;

    const feature = this.reflector.get<string>('practice_feature', context.getHandler());
    if (!feature) return true;

    // Use Vietnam timezone (UTC+7) — same offset as DashboardService.TZ_OFFSET_MS
    // so quota resets at VN midnight, not UTC midnight (which is 07:00 VN time).
    const TZ_OFFSET_MS = 7 * 60 * 60 * 1000;
    const todayVN = new Date(Date.now() + TZ_OFFSET_MS);
    todayVN.setUTCHours(0, 0, 0, 0);
    const today = new Date(todayVN.getTime() - TZ_OFFSET_MS);

    const modelMap: Record<string, () => Promise<number>> = {
      writing: () => this.prisma.writingSession.count({ where: { userId: user.id, createdAt: { gte: today } } }),
      reading: () => this.prisma.readingSession.count({ where: { userId: user.id, createdAt: { gte: today } } }),
      listening: () => this.prisma.listeningSession.count({ where: { userId: user.id, createdAt: { gte: today } } }),
      freeSpeaking: () => this.prisma.freeSpeakingSession.count({ where: { userId: user.id, createdAt: { gte: today } } }),
      // Exam types — applies during beta when PremiumGuard is bypassed
      examReading: () => this.prisma.examReadingSession.count({ where: { userId: user.id, createdAt: { gte: today } } }),
      examWriting: () => this.prisma.examWritingSession.count({ where: { userId: user.id, createdAt: { gte: today } } }),
      examListening: () => this.prisma.examListeningSession.count({ where: { userId: user.id, createdAt: { gte: today } } }),
      examSpeaking: () => this.prisma.examSpeakingSession.count({ where: { userId: user.id, createdAt: { gte: today } } }),
    };

    const counter = modelMap[feature];
    if (!counter) return true;

    const used = await counter();
    if (used >= DAILY_LIMIT) {
      throw new ForbiddenException(
        `Bạn đã dùng hết ${DAILY_LIMIT} lượt cho tính năng này hôm nay. Hãy quay lại vào ngày mai!`,
      );
    }

    return true;
  }
}

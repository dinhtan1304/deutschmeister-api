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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const modelMap: Record<string, () => Promise<number>> = {
      writing: () => this.prisma.writingSession.count({ where: { userId: user.id, createdAt: { gte: today } } }),
      reading: () => this.prisma.readingSession.count({ where: { userId: user.id, createdAt: { gte: today } } }),
      listening: () => this.prisma.listeningSession.count({ where: { userId: user.id, createdAt: { gte: today } } }),
      freeSpeaking: () => this.prisma.freeSpeakingSession.count({ where: { userId: user.id, createdAt: { gte: today } } }),
    };

    const counter = modelMap[feature];
    if (!counter) return true;

    const used = await counter();
    if (used >= DAILY_LIMIT) {
      throw new ForbiddenException(
        `Bạn đã dùng hết ${DAILY_LIMIT} lượt luyện tập hôm nay. Nâng cấp Premium để không giới hạn tại /billing`,
      );
    }

    return true;
  }
}

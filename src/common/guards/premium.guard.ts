import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class PremiumGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Cần đăng nhập');
    }

    const sub = await this.prisma.userSubscription.findUnique({
      where: { userId: user.id },
    });

    const isPremium =
      sub?.plan === 'premium' &&
      sub.status === 'active' &&
      (!sub.expiresAt || sub.expiresAt > new Date());

    if (!isPremium) {
      throw new ForbiddenException(
        'Tính năng này yêu cầu gói Premium. Nâng cấp tại /billing',
      );
    }

    return true;
  }
}

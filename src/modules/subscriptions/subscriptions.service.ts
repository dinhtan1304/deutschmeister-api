import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { RequestUpgradeDto, AdminGrantDto, AdminConfirmPaymentDto } from './dto';

export const PLANS = {
  free: {
    code: 'free',
    name: 'Free',
    nameVi: 'Miễn phí',
    price: 0,
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      'Từ vựng & Word Bank',
      'Tất cả mini-games',
      'Ngữ pháp cơ bản (A1)',
      'Topics & chủ đề',
      'Luyện viết / đọc / nghe / nói — 3 lần/ngày',
    ],
    limits: { practicePerDay: 3 },
  },
  premium: {
    code: 'premium',
    name: 'Premium',
    nameVi: 'Premium',
    monthlyPrice: 99000,
    yearlyPrice: 990000,
    features: [
      'Tất cả tính năng Free',
      'Luyện tập không giới hạn',
      'Thi thử Goethe/TELC chuẩn (A1–B1)',
      'AI chấm điểm Writing',
      'AI chấm điểm Speaking',
      'Luyện nghe theo đề thi',
      'Theo dõi tiến độ nâng cao',
    ],
    limits: { practicePerDay: -1 }, // unlimited
  },
} as const;

// Bank transfer info
export const BANK_INFO = {
  bankName: 'MB Bank',
  accountNumber: '1234567890',
  accountName: 'NGUYEN VAN A',
  content: (userId: string) => `NANGCAP ${userId.slice(-8).toUpperCase()}`,
};

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  getPlans() {
    return Object.values(PLANS);
  }

  async getMySubscription(userId: string) {
    const sub = await this.prisma.userSubscription.findUnique({
      where: { userId },
      include: {
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!sub) {
      return { plan: 'free', status: 'active', expiresAt: null, payments: [] };
    }

    // Auto-expire check
    if (sub.plan === 'premium' && sub.expiresAt && sub.expiresAt < new Date()) {
      await this.prisma.userSubscription.update({
        where: { userId },
        data: { plan: 'free', status: 'expired' },
      });
      return { plan: 'free', status: 'expired', expiresAt: sub.expiresAt, payments: sub.payments };
    }

    return {
      plan: sub.plan,
      status: sub.status,
      expiresAt: sub.expiresAt,
      payments: sub.payments,
    };
  }

  async requestUpgrade(userId: string, dto: RequestUpgradeDto) {
    const amount = dto.period === 'yearly'
      ? PLANS.premium.yearlyPrice
      : PLANS.premium.monthlyPrice;

    // Get or create subscription record
    let sub = await this.prisma.userSubscription.findUnique({ where: { userId } });
    if (!sub) {
      sub = await this.prisma.userSubscription.create({
        data: { userId, plan: 'free', status: 'active' },
      });
    }

    const payment = await this.prisma.payment.create({
      data: {
        userId,
        subscriptionId: sub.id,
        plan: 'premium',
        period: dto.period,
        amount,
        status: 'pending',
        transferNote: BANK_INFO.content(userId),
      },
    });

    return {
      payment,
      bankInfo: {
        ...BANK_INFO,
        content: BANK_INFO.content(userId),
        amount,
      },
    };
  }

  async getPendingPayments() {
    return this.prisma.payment.findMany({
      where: { status: 'pending' },
      include: { user: { select: { id: true, email: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAllPayments(params?: { status?: string; page?: number; limit?: number }) {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 20;
    const where = params?.status ? { status: params.status } : {};

    const [items, total] = await Promise.all([
      this.prisma.payment.findMany({
        where,
        include: { user: { select: { id: true, email: true, name: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.payment.count({ where }),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async confirmPayment(paymentId: string, adminId: string, dto: AdminConfirmPaymentDto) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: { subscription: true },
    });
    if (!payment) throw new NotFoundException('Payment not found');
    if (payment.status !== 'pending') throw new ForbiddenException('Payment already processed');

    // Calculate new expiry
    const now = new Date();
    const currentExpiry = payment.subscription?.expiresAt;
    const base = currentExpiry && currentExpiry > now ? currentExpiry : now;
    const expiresAt = new Date(base);
    if (payment.period === 'yearly') {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    } else {
      expiresAt.setMonth(expiresAt.getMonth() + 1);
    }

    await this.prisma.$transaction([
      this.prisma.payment.update({
        where: { id: paymentId },
        data: { status: 'confirmed', confirmedBy: adminId, confirmedAt: now, adminNote: dto.note },
      }),
      this.prisma.userSubscription.upsert({
        where: { userId: payment.userId },
        create: {
          userId: payment.userId,
          plan: 'premium',
          status: 'active',
          expiresAt,
          grantedBy: adminId,
        },
        update: {
          plan: 'premium',
          status: 'active',
          expiresAt,
          grantedBy: adminId,
          note: dto.note,
        },
      }),
    ]);

    return { success: true, expiresAt };
  }

  async rejectPayment(paymentId: string, adminId: string, dto: AdminConfirmPaymentDto) {
    const payment = await this.prisma.payment.findUnique({ where: { id: paymentId } });
    if (!payment) throw new NotFoundException('Payment not found');
    if (payment.status !== 'pending') throw new ForbiddenException('Payment already processed');

    await this.prisma.payment.update({
      where: { id: paymentId },
      data: { status: 'rejected', confirmedBy: adminId, confirmedAt: new Date(), adminNote: dto.note },
    });

    return { success: true };
  }

  async adminGrant(userId: string, adminId: string, dto: AdminGrantDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const now = new Date();
    let expiresAt: Date | null = null;

    if (dto.period !== 'lifetime') {
      const sub = await this.prisma.userSubscription.findUnique({ where: { userId } });
      const base = sub?.expiresAt && sub.expiresAt > now ? sub.expiresAt : now;
      expiresAt = new Date(base);
      if (dto.period === 'yearly') {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      } else {
        expiresAt.setMonth(expiresAt.getMonth() + 1);
      }
    }

    await this.prisma.userSubscription.upsert({
      where: { userId },
      create: { userId, plan: 'premium', status: 'active', expiresAt, grantedBy: adminId, note: dto.note },
      update: { plan: 'premium', status: 'active', expiresAt, grantedBy: adminId, note: dto.note },
    });

    return { success: true, expiresAt };
  }

  async adminRevoke(userId: string, adminId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    await this.prisma.userSubscription.upsert({
      where: { userId },
      create: { userId, plan: 'free', status: 'cancelled', grantedBy: adminId },
      update: { plan: 'free', status: 'cancelled', grantedBy: adminId },
    });

    return { success: true };
  }

  async getAllSubscriptions(params?: { plan?: string; page?: number; limit?: number }) {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 20;
    const where = params?.plan ? { plan: params.plan } : {};

    const [items, total] = await Promise.all([
      this.prisma.userSubscription.findMany({
        where,
        include: { user: { select: { id: true, email: true, name: true } } },
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.userSubscription.count({ where }),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  // ─── Usage quota for free users ────────────────────────────────────────────

  async checkPracticeQuota(userId: string, feature: 'writing' | 'reading' | 'listening' | 'speaking' | 'freeSpeaking'): Promise<{ allowed: boolean; used: number; limit: number }> {
    const sub = await this.prisma.userSubscription.findUnique({ where: { userId } });
    const isPremium = sub?.plan === 'premium' && sub.status === 'active' &&
      (!sub.expiresAt || sub.expiresAt > new Date());

    if (isPremium) return { allowed: true, used: 0, limit: -1 };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const modelMap = {
      writing: () => this.prisma.writingSession.count({ where: { userId, createdAt: { gte: today } } }),
      reading: () => this.prisma.readingSession.count({ where: { userId, createdAt: { gte: today } } }),
      listening: () => this.prisma.listeningSession.count({ where: { userId, createdAt: { gte: today } } }),
      speaking: () => this.prisma.examSpeakingSession.count({ where: { userId, createdAt: { gte: today } } }),
      freeSpeaking: () => this.prisma.freeSpeakingSession.count({ where: { userId, createdAt: { gte: today } } }),
    };

    const used = await modelMap[feature]();
    const limit = PLANS.free.limits.practicePerDay;
    return { allowed: used < limit, used, limit };
  }

  async getUserPlan(userId: string): Promise<'free' | 'premium'> {
    const sub = await this.prisma.userSubscription.findUnique({ where: { userId } });
    if (!sub || sub.plan !== 'premium') return 'free';
    if (sub.expiresAt && sub.expiresAt < new Date()) return 'free';
    return 'premium';
  }
}

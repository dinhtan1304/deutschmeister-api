import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';

function makePrisma() {
  return {
    userSubscription: {
      findUnique: jest.fn(),
      create: jest.fn(),
      upsert: jest.fn(),
      update: jest.fn(),
    },
    payment: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
    },
    $transaction: jest.fn((ops: any[]) => Promise.all(ops)),
  };
}

describe('SubscriptionsService', () => {
  let service: SubscriptionsService;
  let prisma: ReturnType<typeof makePrisma>;

  beforeEach(() => {
    prisma = makePrisma();
    service = new SubscriptionsService(prisma as any);
  });

  // ─── confirmPayment ───────────────────────────────────────────────────────

  describe('confirmPayment()', () => {
    const paymentId = 'pay-1';
    const adminId = 'admin-1';
    const dto = { note: 'OK' };

    it('throws NotFoundException when payment not found', async () => {
      prisma.payment.findUnique.mockResolvedValue(null);
      await expect(service.confirmPayment(paymentId, adminId, dto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws ForbiddenException when payment already confirmed', async () => {
      prisma.payment.findUnique.mockResolvedValue({
        id: paymentId, status: 'confirmed', subscription: null, userId: 'u1', period: 'monthly',
      });
      await expect(service.confirmPayment(paymentId, adminId, dto)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('throws ForbiddenException when payment already rejected', async () => {
      prisma.payment.findUnique.mockResolvedValue({
        id: paymentId, status: 'rejected', subscription: null, userId: 'u1', period: 'monthly',
      });
      await expect(service.confirmPayment(paymentId, adminId, dto)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('extends expiry by 1 month for monthly payment', async () => {
      const now = new Date();
      prisma.payment.findUnique.mockResolvedValue({
        id: paymentId, status: 'pending', userId: 'u1', period: 'monthly',
        subscription: null,
      });
      prisma.$transaction.mockImplementation(async (ops) => {
        for (const op of ops) await op;
        return [];
      });
      prisma.payment.update.mockResolvedValue({});
      prisma.userSubscription.upsert.mockResolvedValue({});

      const result = await service.confirmPayment(paymentId, adminId, dto);

      // expiresAt should be ~1 month from now
      const expectedMonth = new Date(now);
      expectedMonth.setMonth(expectedMonth.getMonth() + 1);

      expect(result.expiresAt.getFullYear()).toBe(expectedMonth.getFullYear());
      expect(result.expiresAt.getMonth()).toBe(expectedMonth.getMonth());
    });

    it('extends expiry by 1 year for yearly payment', async () => {
      const now = new Date();
      prisma.payment.findUnique.mockResolvedValue({
        id: paymentId, status: 'pending', userId: 'u1', period: 'yearly',
        subscription: null,
      });
      prisma.$transaction.mockImplementation(async (ops) => {
        for (const op of ops) await op;
        return [];
      });
      prisma.payment.update.mockResolvedValue({});
      prisma.userSubscription.upsert.mockResolvedValue({});

      const result = await service.confirmPayment(paymentId, adminId, dto);

      expect(result.expiresAt.getFullYear()).toBe(now.getFullYear() + 1);
    });

    it('extends from current expiry when user is already premium', async () => {
      const currentExpiry = new Date();
      currentExpiry.setMonth(currentExpiry.getMonth() + 1); // expires 1 month from now

      prisma.payment.findUnique.mockResolvedValue({
        id: paymentId, status: 'pending', userId: 'u1', period: 'monthly',
        subscription: { expiresAt: currentExpiry },
      });
      prisma.$transaction.mockImplementation(async (ops) => {
        for (const op of ops) await op;
        return [];
      });
      prisma.payment.update.mockResolvedValue({});
      prisma.userSubscription.upsert.mockResolvedValue({});

      const result = await service.confirmPayment(paymentId, adminId, dto);

      // Should be ~2 months from now (1 existing + 1 new month)
      const expected = new Date(currentExpiry);
      expected.setMonth(expected.getMonth() + 1);

      expect(result.expiresAt.getFullYear()).toBe(expected.getFullYear());
      expect(result.expiresAt.getMonth()).toBe(expected.getMonth());
    });

    it('updates payment to confirmed status', async () => {
      prisma.payment.findUnique.mockResolvedValue({
        id: paymentId, status: 'pending', userId: 'u1', period: 'monthly',
        subscription: null,
      });
      prisma.$transaction.mockImplementation(async (ops) => {
        for (const op of ops) await op;
        return [];
      });
      prisma.payment.update.mockResolvedValue({});
      prisma.userSubscription.upsert.mockResolvedValue({});

      await service.confirmPayment(paymentId, adminId, dto);

      expect(prisma.payment.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: paymentId },
          data: expect.objectContaining({ status: 'confirmed', confirmedBy: adminId }),
        }),
      );
    });

    it('upserts subscription to premium/active', async () => {
      prisma.payment.findUnique.mockResolvedValue({
        id: paymentId, status: 'pending', userId: 'u1', period: 'monthly',
        subscription: null,
      });
      prisma.$transaction.mockImplementation(async (ops) => {
        for (const op of ops) await op;
        return [];
      });
      prisma.payment.update.mockResolvedValue({});
      prisma.userSubscription.upsert.mockResolvedValue({});

      await service.confirmPayment(paymentId, adminId, dto);

      expect(prisma.userSubscription.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          create: expect.objectContaining({ plan: 'premium', status: 'active' }),
          update: expect.objectContaining({ plan: 'premium', status: 'active' }),
        }),
      );
    });
  });

  // ─── requestUpgrade ───────────────────────────────────────────────────────

  describe('requestUpgrade()', () => {
    const userId = 'u1';

    it('creates a payment with monthly amount', async () => {
      prisma.userSubscription.findUnique.mockResolvedValue({ id: 'sub-1' });
      prisma.payment.create.mockResolvedValue({
        id: 'pay-1', amount: 99000, period: 'monthly', status: 'pending',
      });

      const result = await service.requestUpgrade(userId, { period: 'monthly' });

      expect(prisma.payment.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ amount: 99000, period: 'monthly', status: 'pending' }),
        }),
      );
      expect(result.bankInfo.amount).toBe(99000);
    });

    it('creates a payment with yearly amount', async () => {
      prisma.userSubscription.findUnique.mockResolvedValue({ id: 'sub-1' });
      prisma.payment.create.mockResolvedValue({
        id: 'pay-1', amount: 990000, period: 'yearly', status: 'pending',
      });

      const result = await service.requestUpgrade(userId, { period: 'yearly' });

      expect(prisma.payment.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ amount: 990000, period: 'yearly' }),
        }),
      );
      expect(result.bankInfo.amount).toBe(990000);
    });

    it('creates subscription record when user has none', async () => {
      prisma.userSubscription.findUnique.mockResolvedValue(null);
      prisma.userSubscription.create.mockResolvedValue({ id: 'sub-new' });
      prisma.payment.create.mockResolvedValue({ id: 'pay-1', amount: 99000, status: 'pending' });

      await service.requestUpgrade(userId, { period: 'monthly' });

      expect(prisma.userSubscription.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ userId, plan: 'free', status: 'active' }),
        }),
      );
    });

    it('reuses existing subscription when user already has one', async () => {
      prisma.userSubscription.findUnique.mockResolvedValue({ id: 'existing-sub' });
      prisma.payment.create.mockResolvedValue({ id: 'pay-1', amount: 99000, status: 'pending' });

      await service.requestUpgrade(userId, { period: 'monthly' });

      expect(prisma.userSubscription.create).not.toHaveBeenCalled();
    });

    it('includes transfer note in response bankInfo', async () => {
      prisma.userSubscription.findUnique.mockResolvedValue({ id: 'sub-1' });
      prisma.payment.create.mockResolvedValue({ id: 'pay-1', amount: 99000, status: 'pending' });

      const result = await service.requestUpgrade(userId, { period: 'monthly' });

      expect(result.bankInfo.content).toContain(userId.slice(-8).toUpperCase());
    });
  });
});

import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PremiumGuard } from './premium.guard';

function makeContext(user: any): ExecutionContext {
  return {
    switchToHttp: () => ({ getRequest: () => ({ user }) }),
  } as any;
}

describe('PremiumGuard', () => {
  let guard: PremiumGuard;
  let prisma: { userSubscription: { findUnique: jest.Mock } };

  beforeEach(() => {
    prisma = { userSubscription: { findUnique: jest.fn() } };
    guard = new PremiumGuard(prisma as any);
  });

  it('throws when no user in request', async () => {
    const ctx = makeContext(null);
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('throws when user has no subscription', async () => {
    prisma.userSubscription.findUnique.mockResolvedValue(null);
    const ctx = makeContext({ id: 'u1' });
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('throws when plan is free', async () => {
    prisma.userSubscription.findUnique.mockResolvedValue({
      plan: 'free', status: 'active', expiresAt: null,
    });
    const ctx = makeContext({ id: 'u1' });
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('throws when status is not active', async () => {
    prisma.userSubscription.findUnique.mockResolvedValue({
      plan: 'premium', status: 'pending', expiresAt: null,
    });
    const ctx = makeContext({ id: 'u1' });
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('throws when subscription is expired', async () => {
    const past = new Date(Date.now() - 1000);
    prisma.userSubscription.findUnique.mockResolvedValue({
      plan: 'premium', status: 'active', expiresAt: past,
    });
    const ctx = makeContext({ id: 'u1' });
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('allows active premium with no expiry (lifetime)', async () => {
    prisma.userSubscription.findUnique.mockResolvedValue({
      plan: 'premium', status: 'active', expiresAt: null,
    });
    const ctx = makeContext({ id: 'u1' });
    await expect(guard.canActivate(ctx)).resolves.toBe(true);
  });

  it('allows active premium with future expiry', async () => {
    const future = new Date(Date.now() + 30 * 86_400_000); // 30 days
    prisma.userSubscription.findUnique.mockResolvedValue({
      plan: 'premium', status: 'active', expiresAt: future,
    });
    const ctx = makeContext({ id: 'u1' });
    await expect(guard.canActivate(ctx)).resolves.toBe(true);
  });

  it('queries subscription by the correct userId', async () => {
    prisma.userSubscription.findUnique.mockResolvedValue(null);
    const ctx = makeContext({ id: 'user-abc-123' });

    await guard.canActivate(ctx).catch(() => {});
    expect(prisma.userSubscription.findUnique).toHaveBeenCalledWith({
      where: { userId: 'user-abc-123' },
    });
  });

  it('ForbiddenException message mentions /billing', async () => {
    prisma.userSubscription.findUnique.mockResolvedValue(null);
    const ctx = makeContext({ id: 'u1' });
    await expect(guard.canActivate(ctx)).rejects.toThrow(/\/billing/);
  });
});

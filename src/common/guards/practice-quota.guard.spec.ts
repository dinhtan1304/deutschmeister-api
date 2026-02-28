import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PracticeQuotaGuard } from './practice-quota.guard';

// ─── Prisma mock factory ──────────────────────────────────────────────────────
function makePrismaMock(overrides: Record<string, any> = {}) {
  return {
    userSubscription: {
      findUnique: jest.fn(),
    },
    writingSession: { count: jest.fn().mockResolvedValue(0) },
    readingSession: { count: jest.fn().mockResolvedValue(0) },
    listeningSession: { count: jest.fn().mockResolvedValue(0) },
    freeSpeakingSession: { count: jest.fn().mockResolvedValue(0) },
    ...overrides,
  };
}

function makeContext(user: any, feature?: string): ExecutionContext {
  return {
    switchToHttp: () => ({ getRequest: () => ({ user }) }),
    getHandler: () => ({}),
  } as any;
}

describe('PracticeQuotaGuard', () => {
  let guard: PracticeQuotaGuard;
  let prisma: ReturnType<typeof makePrismaMock>;
  let reflector: jest.Mocked<Reflector>;

  beforeEach(() => {
    prisma = makePrismaMock();
    reflector = { get: jest.fn() } as any;
    guard = new PracticeQuotaGuard(prisma as any, reflector);
  });

  // ─── Auth ─────────────────────────────────────────────────────────────────

  it('throws ForbiddenException when no user in request', async () => {
    const ctx = makeContext(null);
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  // ─── Premium bypass ───────────────────────────────────────────────────────

  it('allows premium user with no expiry unconditionally', async () => {
    prisma.userSubscription.findUnique.mockResolvedValue({
      plan: 'premium', status: 'active', expiresAt: null,
    });
    const ctx = makeContext({ id: 'u1' }, 'writing');
    await expect(guard.canActivate(ctx)).resolves.toBe(true);
    // Should not count sessions for premium
    expect(prisma.writingSession.count).not.toHaveBeenCalled();
  });

  it('allows premium user with future expiry', async () => {
    const future = new Date(Date.now() + 86_400_000);
    prisma.userSubscription.findUnique.mockResolvedValue({
      plan: 'premium', status: 'active', expiresAt: future,
    });
    const ctx = makeContext({ id: 'u1' }, 'writing');
    await expect(guard.canActivate(ctx)).resolves.toBe(true);
  });

  it('treats expired premium subscription as free', async () => {
    const past = new Date(Date.now() - 86_400_000);
    prisma.userSubscription.findUnique.mockResolvedValue({
      plan: 'premium', status: 'active', expiresAt: past,
    });
    reflector.get.mockReturnValue('writing');
    prisma.writingSession.count.mockResolvedValue(3);

    const ctx = makeContext({ id: 'u1' }, 'writing');
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('treats inactive premium subscription as free', async () => {
    prisma.userSubscription.findUnique.mockResolvedValue({
      plan: 'premium', status: 'inactive', expiresAt: null,
    });
    reflector.get.mockReturnValue('writing');
    prisma.writingSession.count.mockResolvedValue(3);

    const ctx = makeContext({ id: 'u1' });
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  // ─── Free user quota ──────────────────────────────────────────────────────

  it('allows free user with 0 sessions today', async () => {
    prisma.userSubscription.findUnique.mockResolvedValue(null);
    reflector.get.mockReturnValue('writing');
    prisma.writingSession.count.mockResolvedValue(0);

    const ctx = makeContext({ id: 'u1' });
    await expect(guard.canActivate(ctx)).resolves.toBe(true);
  });

  it('allows free user with 2 sessions today (under limit)', async () => {
    prisma.userSubscription.findUnique.mockResolvedValue(null);
    reflector.get.mockReturnValue('reading');
    prisma.readingSession.count.mockResolvedValue(2);

    const ctx = makeContext({ id: 'u1' });
    await expect(guard.canActivate(ctx)).resolves.toBe(true);
  });

  it('blocks free user with 3 sessions today (at limit)', async () => {
    prisma.userSubscription.findUnique.mockResolvedValue(null);
    reflector.get.mockReturnValue('listening');
    prisma.listeningSession.count.mockResolvedValue(3);

    const ctx = makeContext({ id: 'u1' });
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('blocks free user with >3 sessions today', async () => {
    prisma.userSubscription.findUnique.mockResolvedValue(null);
    reflector.get.mockReturnValue('freeSpeaking');
    prisma.freeSpeakingSession.count.mockResolvedValue(5);

    const ctx = makeContext({ id: 'u1' });
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('counts sessions for the correct feature model', async () => {
    prisma.userSubscription.findUnique.mockResolvedValue(null);
    reflector.get.mockReturnValue('reading');
    prisma.readingSession.count.mockResolvedValue(1);

    const ctx = makeContext({ id: 'u1' });
    await guard.canActivate(ctx);

    expect(prisma.readingSession.count).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ userId: 'u1' }) }),
    );
    // Should not count other features
    expect(prisma.writingSession.count).not.toHaveBeenCalled();
    expect(prisma.listeningSession.count).not.toHaveBeenCalled();
  });

  // ─── Unknown feature ──────────────────────────────────────────────────────

  it('allows when feature metadata is missing', async () => {
    prisma.userSubscription.findUnique.mockResolvedValue(null);
    reflector.get.mockReturnValue(undefined);

    const ctx = makeContext({ id: 'u1' });
    await expect(guard.canActivate(ctx)).resolves.toBe(true);
  });

  it('allows when feature is unknown string (no model mapping)', async () => {
    prisma.userSubscription.findUnique.mockResolvedValue(null);
    reflector.get.mockReturnValue('unknownFeature');

    const ctx = makeContext({ id: 'u1' });
    await expect(guard.canActivate(ctx)).resolves.toBe(true);
  });

  // ─── Error in ForbiddenException message ─────────────────────────────────

  it('ForbiddenException message mentions the daily limit', async () => {
    prisma.userSubscription.findUnique.mockResolvedValue(null);
    reflector.get.mockReturnValue('writing');
    prisma.writingSession.count.mockResolvedValue(3);

    const ctx = makeContext({ id: 'u1' });
    await expect(guard.canActivate(ctx)).rejects.toThrow(/3 lượt/);
  });
});

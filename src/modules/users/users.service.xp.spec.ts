import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';

function makePrisma() {
  return {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
    },
    settings: {
      upsert: jest.fn(),
    },
    xpTransaction: {
      create: jest.fn(),
      groupBy: jest.fn(),
    },
    gameSession: {
      count: jest.fn(),
      aggregate: jest.fn(),
    },
    favorite: { count: jest.fn() },
    progress: { count: jest.fn() },
    writingError: { findMany: jest.fn() },
    $transaction: jest.fn((ops: unknown[]) => Promise.all(ops)),
  };
}

describe('UsersService — XP & Leaderboard', () => {
  let service: UsersService;
  let prisma: ReturnType<typeof makePrisma>;

  beforeEach(() => {
    prisma = makePrisma();
    service = new UsersService(prisma as any);
  });

  // ─── addXp ────────────────────────────────────────────────────────────────

  describe('addXp()', () => {
    it('returns { leveledUp: false, newLevel: 1 } when user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      const result = await service.addXp('missing', 50, 'test');
      expect(result).toEqual({ leveledUp: false, newLevel: 1 });
    });

    it('creates an XpTransaction and updates User.xp', async () => {
      prisma.user.findUnique.mockResolvedValue({ xp: 0, level: 1 });
      prisma.$transaction.mockResolvedValue([undefined, undefined]);

      await service.addXp('user-1', 10, 'srs_review');

      expect(prisma.$transaction).toHaveBeenCalledTimes(1);
      // The transaction receives two Prisma operations (create + update)
      const [txArgs] = prisma.$transaction.mock.calls[0];
      expect(txArgs).toHaveLength(2);
    });

    it('detects level-up correctly', async () => {
      // User at 90 XP (level 1), adding 20 → 110 XP (level 2)
      prisma.user.findUnique.mockResolvedValue({ xp: 90, level: 1 });
      prisma.$transaction.mockResolvedValue([undefined, undefined]);

      const result = await service.addXp('user-1', 20, 'srs_review');
      expect(result.leveledUp).toBe(true);
      expect(result.newLevel).toBe(2);
    });

    it('does NOT flag leveledUp when still in same level', async () => {
      // User at 50 XP (level 1), adding 10 → 60 XP (still level 1)
      prisma.user.findUnique.mockResolvedValue({ xp: 50, level: 1 });
      prisma.$transaction.mockResolvedValue([undefined, undefined]);

      const result = await service.addXp('user-1', 10, 'srs_review');
      expect(result.leveledUp).toBe(false);
      expect(result.newLevel).toBe(1);
    });

    it('does not go above level 10', async () => {
      // User already at max XP
      prisma.user.findUnique.mockResolvedValue({ xp: 12000, level: 10 });
      prisma.$transaction.mockResolvedValue([undefined, undefined]);

      const result = await service.addXp('user-1', 9999, 'exam_complete');
      expect(result.newLevel).toBe(10);
      expect(result.leveledUp).toBe(false);
    });
  });

  // ─── getXpInfo ────────────────────────────────────────────────────────────

  describe('getXpInfo()', () => {
    it('throws NotFoundException when user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      await expect(service.getXpInfo('missing')).rejects.toThrow(NotFoundException);
    });

    it('returns XP info with level details', async () => {
      prisma.user.findUnique.mockResolvedValue({ xp: 150, level: 2 });
      const result = await service.getXpInfo('user-1');

      expect(result.xp).toBe(150);
      expect(result.level).toBe(2);
      expect(result.name).toBe('Lernender');
      expect(result.progress).toBeGreaterThan(0);
      expect(result.progress).toBeLessThan(100);
    });

    it('returns progress=100 at max level', async () => {
      prisma.user.findUnique.mockResolvedValue({ xp: 12000, level: 10 });
      const result = await service.getXpInfo('user-1');
      expect(result.progress).toBe(100);
    });
  });

  // ─── getLeaderboard ───────────────────────────────────────────────────────

  describe('getLeaderboard()', () => {
    it('returns empty array when no XP transactions exist', async () => {
      prisma.xpTransaction.groupBy.mockResolvedValue([]);
      const result = await service.getLeaderboard('weekly');
      expect(result).toEqual([]);
    });

    it('returns ranked entries in order', async () => {
      prisma.xpTransaction.groupBy.mockResolvedValue([
        { userId: 'user-1', _sum: { amount: 200 } },
        { userId: 'user-2', _sum: { amount: 100 } },
      ]);
      prisma.user.findMany.mockResolvedValue([
        { id: 'user-1', name: 'Alice', avatar: null, xp: 200, level: 2, settings: { showOnLeaderboard: true } },
        { id: 'user-2', name: 'Bob', avatar: null, xp: 100, level: 1, settings: { showOnLeaderboard: true } },
      ]);

      const result = await service.getLeaderboard('all-time');
      expect(result).toHaveLength(2);
      expect(result[0].rank).toBe(1);
      expect(result[0].name).toBe('Alice');
      expect(result[0].xp).toBe(200);
      expect(result[1].rank).toBe(2);
      expect(result[1].name).toBe('Bob');
    });

    it('anonymizes users with showOnLeaderboard=false', async () => {
      prisma.xpTransaction.groupBy.mockResolvedValue([
        { userId: 'user-1', _sum: { amount: 500 } },
      ]);
      prisma.user.findMany.mockResolvedValue([
        { id: 'user-1', name: 'Secret', avatar: 'http://img', xp: 500, level: 3, settings: { showOnLeaderboard: false } },
      ]);

      const result = await service.getLeaderboard('weekly');
      expect(result[0].name).toBe('Ẩn danh');
      expect(result[0].avatar).toBeNull();
      expect(result[0].userId).toBeNull();
    });

    it('handles user not found in userMap gracefully', async () => {
      prisma.xpTransaction.groupBy.mockResolvedValue([
        { userId: 'ghost', _sum: { amount: 50 } },
      ]);
      prisma.user.findMany.mockResolvedValue([]); // ghost user missing from DB

      const result = await service.getLeaderboard('monthly');
      expect(result[0].name).toBe('Người dùng'); // fallback name
      expect(result[0].level).toBe(1);
    });
  });

  // ─── getErrorPatterns ─────────────────────────────────────────────────────

  describe('getErrorPatterns()', () => {
    it('returns empty array when no writing errors', async () => {
      prisma.writingError.findMany.mockResolvedValue([]);
      const result = await service.getErrorPatterns('user-1');
      expect(result).toEqual([]);
    });

    it('groups and sorts errors by count descending', async () => {
      prisma.writingError.findMany.mockResolvedValue([
        { errorType: 'article' },
        { errorType: 'article' },
        { errorType: 'article' },
        { errorType: 'conjugation' },
        { errorType: 'conjugation' },
        { errorType: 'spelling' },
      ]);

      const result = await service.getErrorPatterns('user-1');
      expect(result[0].errorType).toBe('article');
      expect(result[0].count).toBe(3);
      expect(result[0].percentage).toBe(50); // 3/6 * 100
      expect(result[1].errorType).toBe('conjugation');
      expect(result[1].count).toBe(2);
      expect(result[2].errorType).toBe('spelling');
    });

    it('maps known error types to grammar slugs', async () => {
      prisma.writingError.findMany.mockResolvedValue([
        { errorType: 'article' },
        { errorType: 'spelling' },
      ]);

      const result = await service.getErrorPatterns('user-1');
      const articleEntry = result.find((r) => r.errorType === 'article');
      const spellingEntry = result.find((r) => r.errorType === 'spelling');
      expect(articleEntry?.grammarSlug).toBe('artikel-der-die-das');
      expect(spellingEntry?.grammarSlug).toBeNull();
    });
  });
});

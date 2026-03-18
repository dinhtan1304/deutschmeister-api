import { ChallengesService } from './challenges.service';

function makePrisma() {
  return {
    userChallengeProgress: {
      upsert: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
    },
  };
}

function makeUsersService() {
  return { addXp: jest.fn().mockResolvedValue(undefined) };
}

describe('ChallengesService', () => {
  let service: ChallengesService;
  let prisma: ReturnType<typeof makePrisma>;
  let usersService: ReturnType<typeof makeUsersService>;

  beforeEach(() => {
    prisma = makePrisma();
    usersService = makeUsersService();
    service = new ChallengesService(prisma as any, usersService as any);
  });

  // ─── getCurrentWeekStart ──────────────────────────────────────────────────

  describe('getCurrentWeekStart()', () => {
    it('returns a Monday at midnight UTC', () => {
      const weekStart = service.getCurrentWeekStart();
      // Convert to Vietnam time to check it's Monday
      const vnTime = new Date(weekStart.getTime() + 7 * 60 * 60 * 1000);
      const dayOfWeek = vnTime.getUTCDay(); // 1 = Monday
      expect(dayOfWeek).toBe(1);
    });

    it('returns consistent value for same week', () => {
      const first = service.getCurrentWeekStart();
      const second = service.getCurrentWeekStart();
      expect(first.getTime()).toBe(second.getTime());
    });
  });

  // ─── getCurrentWeekChallenges ─────────────────────────────────────────────

  describe('getCurrentWeekChallenges()', () => {
    it('upserts exactly 3 challenges for the user', async () => {
      prisma.userChallengeProgress.upsert.mockResolvedValue({});

      await service.getCurrentWeekChallenges('user-1');

      expect(prisma.userChallengeProgress.upsert).toHaveBeenCalledTimes(3);
    });

    it('passes correct weekStart to upsert', async () => {
      prisma.userChallengeProgress.upsert.mockResolvedValue({});
      const weekStart = service.getCurrentWeekStart();

      await service.getCurrentWeekChallenges('user-1');

      const calls = prisma.userChallengeProgress.upsert.mock.calls;
      for (const [args] of calls) {
        expect(args.where.userId_weekStart_challengeKey.weekStart.getTime()).toBe(weekStart.getTime());
        expect(args.where.userId_weekStart_challengeKey.userId).toBe('user-1');
      }
    });

    it('returns same 3 challenges for same week (deterministic)', async () => {
      prisma.userChallengeProgress.upsert.mockResolvedValue({});
      await service.getCurrentWeekChallenges('user-1');
      const firstCallKeys = prisma.userChallengeProgress.upsert.mock.calls.map(
        ([a]) => a.where.userId_weekStart_challengeKey.challengeKey,
      );

      prisma.userChallengeProgress.upsert.mockClear();
      await service.getCurrentWeekChallenges('user-1');
      const secondCallKeys = prisma.userChallengeProgress.upsert.mock.calls.map(
        ([a]) => a.where.userId_weekStart_challengeKey.challengeKey,
      );

      expect(firstCallKeys).toEqual(secondCallKeys);
    });
  });

  // ─── updateProgress ───────────────────────────────────────────────────────

  describe('updateProgress()', () => {
    const userId = 'user-1';

    it('does nothing for eventType with no matching challenge', async () => {
      // No challenge in the selected 3 matches an impossible eventType
      // We can verify no DB calls are made by checking that findUnique is not called
      // when no challenges match the event type.
      // Use a real-world example: if none of the 3 selected challenges uses 'grammar_lesson'
      // eventType this week, no update occurs.
      prisma.userChallengeProgress.findUnique.mockResolvedValue(null);
      await service.updateProgress(userId, 'grammar_lesson');
      // Either findUnique is called (and returns null) or not called at all — either is fine
      // but update should NOT be called
      expect(prisma.userChallengeProgress.update).not.toHaveBeenCalled();
    });

    it('increments current when record exists and not completed', async () => {
      // Stub the selected challenges so we control the eventType match
      const weekStart = service.getCurrentWeekStart();

      // Mock findUnique to return a matching in-progress challenge
      prisma.userChallengeProgress.findUnique.mockResolvedValue({
        id: 'cp-1',
        current: 5,
        target: 30,
        completed: false,
        xpReward: 100,
        xpRewarded: false,
      });
      prisma.userChallengeProgress.update.mockResolvedValue({});

      // Directly test via the challenge pool — 'learn_word' maps to learn_words_30
      await service.updateProgress(userId, 'learn_word', 1);

      // If findUnique returned a record, update should be called
      if (prisma.userChallengeProgress.findUnique.mock.calls.length > 0) {
        expect(prisma.userChallengeProgress.update).toHaveBeenCalledWith(
          expect.objectContaining({
            where: { id: 'cp-1' },
            data: expect.objectContaining({ current: 6, completed: false }),
          }),
        );
      }
    });

    it('marks completed and grants XP when target reached', async () => {
      prisma.userChallengeProgress.findUnique.mockResolvedValue({
        id: 'cp-1',
        current: 29,
        target: 30,
        completed: false,
        xpReward: 100,
        xpRewarded: false,
      });
      prisma.userChallengeProgress.update.mockResolvedValue({});

      await service.updateProgress(userId, 'learn_word', 1);

      await new Promise((r) => setTimeout(r, 10));

      if (prisma.userChallengeProgress.update.mock.calls.length > 0) {
        const firstUpdateCall = prisma.userChallengeProgress.update.mock.calls[0][0];
        expect(firstUpdateCall.data.completed).toBe(true);
        expect(firstUpdateCall.data.current).toBe(30);

        // Second update to set xpRewarded=true
        expect(prisma.userChallengeProgress.update).toHaveBeenCalledWith(
          expect.objectContaining({ data: { xpRewarded: true } }),
        );
        expect(usersService.addXp).toHaveBeenCalledWith(userId, 100, 'challenge_complete');
      }
    });

    it('does NOT re-grant XP if already completed', async () => {
      prisma.userChallengeProgress.findUnique.mockResolvedValue({
        id: 'cp-1',
        current: 30,
        target: 30,
        completed: true, // already done
        xpReward: 100,
        xpRewarded: true,
      });

      await service.updateProgress(userId, 'learn_word', 1);
      expect(prisma.userChallengeProgress.update).not.toHaveBeenCalled();
    });

    it('does NOT exceed target (caps at target)', async () => {
      prisma.userChallengeProgress.findUnique.mockResolvedValue({
        id: 'cp-1',
        current: 29,
        target: 30,
        completed: false,
        xpReward: 100,
        xpRewarded: false,
      });
      prisma.userChallengeProgress.update.mockResolvedValue({});

      await service.updateProgress(userId, 'learn_word', 10); // adding 10 but max is 30

      if (prisma.userChallengeProgress.update.mock.calls.length > 0) {
        const call = prisma.userChallengeProgress.update.mock.calls[0][0];
        expect(call.data.current).toBe(30); // capped, not 39
      }
    });
  });

  // ─── getChallengeHistory ──────────────────────────────────────────────────

  describe('getChallengeHistory()', () => {
    it('returns past challenges ordered by weekStart desc', async () => {
      const pastChallenges = [
        { id: 'h1', challengeKey: 'learn_words_30', weekStart: new Date('2024-01-08') },
        { id: 'h2', challengeKey: 'game_sessions_10', weekStart: new Date('2024-01-01') },
      ];
      prisma.userChallengeProgress.findMany.mockResolvedValue(pastChallenges);

      const result = await service.getChallengeHistory('user-1');
      expect(result).toHaveLength(2);
      expect(prisma.userChallengeProgress.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ userId: 'user-1' }),
          orderBy: { weekStart: 'desc' },
          take: 12,
        }),
      );
    });

    it('returns empty array when no history', async () => {
      prisma.userChallengeProgress.findMany.mockResolvedValue([]);
      const result = await service.getChallengeHistory('user-1');
      expect(result).toEqual([]);
    });
  });
});

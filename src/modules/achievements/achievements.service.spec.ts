import { AchievementsService } from './achievements.service';

function makePrisma() {
  return {
    achievement: {
      upsert: jest.fn(),
      findMany: jest.fn(),
    },
    userAchievement: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
    progress: { count: jest.fn() },
    gameSession: { count: jest.fn() },
    examReadingSession: { count: jest.fn() },
    writingSession: { count: jest.fn() },
    user: { findUnique: jest.fn() },
  };
}

function makeUsersService() {
  return { addXp: jest.fn().mockResolvedValue(undefined) };
}

describe('AchievementsService', () => {
  let service: AchievementsService;
  let prisma: ReturnType<typeof makePrisma>;
  let usersService: ReturnType<typeof makeUsersService>;

  beforeEach(() => {
    prisma = makePrisma();
    usersService = makeUsersService();
    // Bypass onModuleInit seeding in tests
    service = new AchievementsService(prisma as any, usersService as any);
  });

  // ─── checkAndUnlock ───────────────────────────────────────────────────────

  describe('checkAndUnlock()', () => {
    const userId = 'user-1';

    function setupStats(overrides: Partial<{
      wordsLearned: number;
      gamesPlayed: number;
      examsCompleted: number;
      writingGraded: number;
      level: number;
    }> = {}) {
      const defaults = { wordsLearned: 0, gamesPlayed: 0, examsCompleted: 0, writingGraded: 0, level: 1 };
      const s = { ...defaults, ...overrides };
      prisma.progress.count.mockResolvedValue(s.wordsLearned);
      prisma.gameSession.count.mockResolvedValue(s.gamesPlayed);
      prisma.examReadingSession.count.mockResolvedValue(s.examsCompleted);
      prisma.writingSession.count.mockResolvedValue(s.writingGraded);
      prisma.user.findUnique.mockResolvedValue({ level: s.level });
    }

    it('returns empty array when no new achievements can be unlocked', async () => {
      setupStats(); // all zeros — no achievement met
      prisma.userAchievement.findMany.mockResolvedValue([]);
      prisma.achievement.findMany.mockResolvedValue([]);

      const result = await service.checkAndUnlock(userId, 'srs_review');
      expect(result).toEqual([]);
    });

    it('unlocks first_word when wordsLearned >= 1 and not yet unlocked', async () => {
      setupStats({ wordsLearned: 1 });
      prisma.userAchievement.findMany.mockResolvedValue([]);

      const firstWordAchievement = {
        id: 'ach-1', key: 'first_word', name: 'Erstes Wort', nameVi: 'Từ đầu tiên', icon: '📚', xpReward: 10,
      };
      prisma.achievement.findMany.mockResolvedValue([firstWordAchievement]);
      prisma.userAchievement.create.mockResolvedValue({});

      const result = await service.checkAndUnlock(userId, 'srs_review');
      expect(result.some((a) => a.key === 'first_word')).toBe(true);
      expect(prisma.userAchievement.create).toHaveBeenCalledWith({
        data: { userId, achievementId: 'ach-1' },
      });
    });

    it('calls addXp with xpReward when achievement is unlocked', async () => {
      setupStats({ wordsLearned: 1 });
      prisma.userAchievement.findMany.mockResolvedValue([]);
      prisma.achievement.findMany.mockResolvedValue([
        { id: 'ach-1', key: 'first_word', name: 'Erstes Wort', nameVi: 'Từ đầu tiên', icon: '📚', xpReward: 10 },
      ]);
      prisma.userAchievement.create.mockResolvedValue({});

      await service.checkAndUnlock(userId, 'srs_review');

      // addXp is called async (.catch), wait a tick
      await new Promise((r) => setTimeout(r, 10));
      expect(usersService.addXp).toHaveBeenCalledWith(userId, 10, 'achievement');
    });

    it('does NOT unlock achievement already unlocked', async () => {
      setupStats({ wordsLearned: 1 });
      // first_word already in unlockedKeys
      prisma.userAchievement.findMany.mockResolvedValue([
        { achievement: { key: 'first_word' } },
      ]);
      prisma.achievement.findMany.mockResolvedValue([
        { id: 'ach-1', key: 'first_word', name: 'Erstes Wort', nameVi: 'Từ đầu tiên', icon: '📚', xpReward: 10 },
      ]);

      const result = await service.checkAndUnlock(userId, 'srs_review');
      expect(result).toEqual([]);
      expect(prisma.userAchievement.create).not.toHaveBeenCalled();
    });

    it('does NOT call addXp for achievements with xpReward=0', async () => {
      setupStats({ level: 5 });
      prisma.userAchievement.findMany.mockResolvedValue([]);
      prisma.achievement.findMany.mockResolvedValue([
        { id: 'ach-level5', key: 'level_5', name: 'Level 5', nameVi: 'Cấp độ 5', icon: '⭐', xpReward: 0 },
      ]);
      prisma.userAchievement.create.mockResolvedValue({});

      await service.checkAndUnlock(userId, 'level_up');
      await new Promise((r) => setTimeout(r, 10));

      expect(usersService.addXp).not.toHaveBeenCalled();
    });

    it('can unlock multiple achievements in one check', async () => {
      setupStats({ wordsLearned: 10 }); // meets first_word AND words_10
      prisma.userAchievement.findMany.mockResolvedValue([]);
      prisma.achievement.findMany.mockResolvedValue([
        { id: 'ach-1', key: 'first_word', name: 'Erstes Wort', nameVi: 'Từ đầu tiên', icon: '📚', xpReward: 10 },
        { id: 'ach-2', key: 'words_10', name: 'Wortschatz 10', nameVi: '10 từ vựng', icon: '🔤', xpReward: 20 },
      ]);
      prisma.userAchievement.create.mockResolvedValue({});

      const result = await service.checkAndUnlock(userId, 'srs_review');
      expect(result).toHaveLength(2);
    });
  });

  // ─── getUserAchievements ──────────────────────────────────────────────────

  describe('getUserAchievements()', () => {
    it('returns all achievements with unlocked flag', async () => {
      const allAchs = [
        { id: 'a1', key: 'first_word', name: 'Erstes Wort', nameVi: 'Từ đầu tiên', category: 'vocabulary', xpReward: 10 },
        { id: 'a2', key: 'first_game', name: 'Erstes Spiel', nameVi: 'Game đầu tiên', category: 'games', xpReward: 10 },
      ];
      prisma.achievement.findMany.mockResolvedValue(allAchs);
      prisma.userAchievement.findMany.mockResolvedValue([
        { achievement: { key: 'first_word' }, unlockedAt: new Date('2024-01-01') },
      ]);

      const result = await service.getUserAchievements('user-1');
      expect(result).toHaveLength(2);

      const firstWord = result.find((r) => r.key === 'first_word');
      expect(firstWord?.unlocked).toBe(true);
      expect(firstWord?.unlockedAt).toBeTruthy();

      const firstGame = result.find((r) => r.key === 'first_game');
      expect(firstGame?.unlocked).toBe(false);
      expect(firstGame?.unlockedAt).toBeNull();
    });

    it('returns empty list when no achievements in DB', async () => {
      prisma.achievement.findMany.mockResolvedValue([]);
      prisma.userAchievement.findMany.mockResolvedValue([]);
      const result = await service.getUserAchievements('user-1');
      expect(result).toEqual([]);
    });
  });
});

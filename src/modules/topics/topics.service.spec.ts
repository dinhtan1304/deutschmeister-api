import { NotFoundException } from '@nestjs/common';
import { TopicsService } from './topics.service';

function makePrisma() {
  return {
    topic: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    topicProgress: {
      findMany: jest.fn(),
      upsert: jest.fn(),
    },
    topicWord: {
      aggregate: jest.fn(),
      createMany: jest.fn(),
      deleteMany: jest.fn(),
      count: jest.fn(),
    },
  };
}

describe('TopicsService', () => {
  let service: TopicsService;
  let prisma: ReturnType<typeof makePrisma>;

  beforeEach(() => {
    prisma = makePrisma();
    service = new TopicsService(prisma as any);
  });

  // ─── updateProgress ───────────────────────────────────────────────────────

  describe('updateProgress()', () => {
    const userId = 'user-1';
    const topicId = 'topic-1';

    it('throws NotFoundException when topic does not exist', async () => {
      prisma.topic.findUnique.mockResolvedValue(null);
      await expect(service.updateProgress(userId, topicId, 5)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('calculates masteryPercent=0 when no words learned', async () => {
      prisma.topic.findUnique.mockResolvedValue({ wordCount: 42 });
      prisma.topicProgress.upsert.mockResolvedValue({});

      await service.updateProgress(userId, topicId, 0);

      expect(prisma.topicProgress.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          create: expect.objectContaining({ masteryPercent: 0, completedAt: null }),
          update: expect.objectContaining({ masteryPercent: 0, completedAt: null }),
        }),
      );
    });

    it('calculates masteryPercent=100 and sets completedAt when all words learned', async () => {
      prisma.topic.findUnique.mockResolvedValue({ wordCount: 42 });
      prisma.topicProgress.upsert.mockResolvedValue({});

      await service.updateProgress(userId, topicId, 42);

      const call = prisma.topicProgress.upsert.mock.calls[0][0];
      expect(call.create.masteryPercent).toBe(100);
      expect(call.create.completedAt).not.toBeNull();
      expect(call.update.masteryPercent).toBe(100);
      expect(call.update.completedAt).not.toBeNull();
    });

    it('calculates partial masteryPercent correctly', async () => {
      prisma.topic.findUnique.mockResolvedValue({ wordCount: 40 });
      prisma.topicProgress.upsert.mockResolvedValue({});

      await service.updateProgress(userId, topicId, 10);

      const call = prisma.topicProgress.upsert.mock.calls[0][0];
      expect(call.create.masteryPercent).toBe(25); // 10/40 = 25%
      expect(call.create.completedAt).toBeNull();
    });

    it('rounds masteryPercent to nearest integer', async () => {
      prisma.topic.findUnique.mockResolvedValue({ wordCount: 3 });
      prisma.topicProgress.upsert.mockResolvedValue({});

      await service.updateProgress(userId, topicId, 1);

      const call = prisma.topicProgress.upsert.mock.calls[0][0];
      expect(call.create.masteryPercent).toBe(33); // 1/3 = 33.3% → 33
    });

    it('sets masteryPercent=0 for topic with 0 words', async () => {
      prisma.topic.findUnique.mockResolvedValue({ wordCount: 0 });
      prisma.topicProgress.upsert.mockResolvedValue({});

      await service.updateProgress(userId, topicId, 0);

      const call = prisma.topicProgress.upsert.mock.calls[0][0];
      expect(call.create.masteryPercent).toBe(0);
    });

    it('resets completedAt to null when words decreased below 100%', async () => {
      prisma.topic.findUnique.mockResolvedValue({ wordCount: 42 });
      prisma.topicProgress.upsert.mockResolvedValue({});

      await service.updateProgress(userId, topicId, 20); // back to 47%

      const call = prisma.topicProgress.upsert.mock.calls[0][0];
      expect(call.update.completedAt).toBeNull();
    });

    it('upserts with correct where clause', async () => {
      prisma.topic.findUnique.mockResolvedValue({ wordCount: 10 });
      prisma.topicProgress.upsert.mockResolvedValue({});

      await service.updateProgress(userId, topicId, 5);

      expect(prisma.topicProgress.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId_topicId: { userId, topicId } },
        }),
      );
    });

    it('stores correct wordsLearned and wordsTotal', async () => {
      prisma.topic.findUnique.mockResolvedValue({ wordCount: 55 });
      prisma.topicProgress.upsert.mockResolvedValue({});

      await service.updateProgress(userId, topicId, 30);

      const call = prisma.topicProgress.upsert.mock.calls[0][0];
      expect(call.create.wordsLearned).toBe(30);
      expect(call.create.wordsTotal).toBe(55);
      expect(call.update.wordsLearned).toBe(30);
      expect(call.update.wordsTotal).toBe(55);
    });
  });

  // ─── getUserProgress ──────────────────────────────────────────────────────

  describe('getUserProgress()', () => {
    it('returns topics with zero progress when user has no records', async () => {
      const topics = [
        { id: 't1', wordCount: 10, slug: 'test', nameDe: 'Test', nameVi: 'Test', icon: null, color: null, level: 'A1' },
      ];
      prisma.topic.findMany.mockResolvedValue(topics);
      prisma.topicProgress.findMany.mockResolvedValue([]);

      const result = await service.getUserProgress('u1');

      expect(result[0].wordsLearned).toBe(0);
      expect(result[0].masteryPercent).toBe(0);
      expect(result[0].completedAt).toBeNull();
    });

    it('merges progress data correctly', async () => {
      const topics = [
        { id: 't1', wordCount: 42, slug: 'test', nameDe: 'Test', nameVi: 'Test', icon: null, color: null, level: 'A1' },
      ];
      const progress = [
        { topicId: 't1', wordsLearned: 42, masteryPercent: 100, lastStudiedAt: new Date(), completedAt: new Date() },
      ];
      prisma.topic.findMany.mockResolvedValue(topics);
      prisma.topicProgress.findMany.mockResolvedValue(progress);

      const result = await service.getUserProgress('u1');

      expect(result[0].wordsLearned).toBe(42);
      expect(result[0].masteryPercent).toBe(100);
      expect(result[0].completedAt).not.toBeNull();
    });
  });
});

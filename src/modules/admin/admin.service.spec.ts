import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { AdminService } from './admin.service';

function makePrisma() {
  return {
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    word: { count: jest.fn().mockResolvedValue(0) },
    topic: { count: jest.fn().mockResolvedValue(0) },
    grammarLesson: { count: jest.fn().mockResolvedValue(0) },
    userSubscription: { count: jest.fn().mockResolvedValue(0) },
    writingSession: { count: jest.fn().mockResolvedValue(0), findMany: jest.fn().mockResolvedValue([]) },
    readingSession: { count: jest.fn().mockResolvedValue(0), findMany: jest.fn().mockResolvedValue([]) },
    listeningSession: { count: jest.fn().mockResolvedValue(0) },
    examReadingSession: { count: jest.fn().mockResolvedValue(0), findMany: jest.fn().mockResolvedValue([]) },
    examWritingSession: { count: jest.fn().mockResolvedValue(0), findMany: jest.fn().mockResolvedValue([]) },
    examListeningSession: { count: jest.fn().mockResolvedValue(0), findMany: jest.fn().mockResolvedValue([]) },
    examSpeakingSession: { count: jest.fn().mockResolvedValue(0), findMany: jest.fn().mockResolvedValue([]) },
    freeSpeakingSession: { count: jest.fn().mockResolvedValue(0) },
  };
}

describe('AdminService', () => {
  let service: AdminService;
  let prisma: ReturnType<typeof makePrisma>;

  beforeEach(() => {
    prisma = makePrisma();
    service = new AdminService(prisma as any);
  });

  // ─── getUsers ─────────────────────────────────────────────────────────────

  describe('getUsers()', () => {
    const baseItems = [
      { id: 'u1', email: 'a@test.com', name: 'Alice', role: 'user', isActive: true, subscription: null },
    ];

    beforeEach(() => {
      prisma.user.findMany.mockResolvedValue(baseItems);
      prisma.user.count.mockResolvedValue(1);
    });

    it('returns paginated items and total', async () => {
      const result = await service.getUsers({ page: 1, limit: 20 });

      expect(result.items).toEqual(baseItems);
      expect(result.total).toBe(1);
      expect(result.page).toBe(1);
      expect(result.totalPages).toBe(1);
    });

    it('applies search filter to both name and email', async () => {
      await service.getUsers({ search: 'alice' });

      expect(prisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            OR: [
              { name: { contains: 'alice', mode: 'insensitive' } },
              { email: { contains: 'alice', mode: 'insensitive' } },
            ],
          }),
        }),
      );
    });

    it('applies role filter', async () => {
      await service.getUsers({ role: 'admin' });

      expect(prisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ role: 'admin' }),
        }),
      );
    });

    it('applies isActive=true filter', async () => {
      await service.getUsers({ isActive: 'true' } as any);

      expect(prisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ isActive: true }),
        }),
      );
    });

    it('applies isActive=false filter', async () => {
      await service.getUsers({ isActive: 'false' } as any);

      expect(prisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ isActive: false }),
        }),
      );
    });

    it('applies premium plan filter with expiry check', async () => {
      await service.getUsers({ plan: 'premium' });

      expect(prisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            subscription: expect.objectContaining({
              is: expect.objectContaining({
                plan: 'premium',
                status: 'active',
              }),
            }),
          }),
        }),
      );
    });

    it('applies free plan filter using is:null', async () => {
      await service.getUsers({ plan: 'free' });

      expect(prisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            subscription: { is: null },
          }),
        }),
      );
    });

    it('calculates correct skip for page 2', async () => {
      await service.getUsers({ page: 2, limit: 10 });

      expect(prisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 10, take: 10 }),
      );
    });

    it('calculates totalPages correctly', async () => {
      prisma.user.count.mockResolvedValue(25);

      const result = await service.getUsers({ page: 1, limit: 10 });

      expect(result.totalPages).toBe(3);
    });
  });

  // ─── getUser ──────────────────────────────────────────────────────────────

  describe('getUser()', () => {
    it('throws NotFoundException when user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.getUser('unknown')).rejects.toThrow(NotFoundException);
    });

    it('returns user with aggregated stats', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 'u1', email: 'a@test.com', name: 'Alice', role: 'user', isActive: true,
        subscription: null, avatar: null, createdAt: new Date(), updatedAt: new Date(),
      });
      prisma.writingSession.count.mockResolvedValue(5);
      prisma.readingSession.count.mockResolvedValue(3);
      prisma.listeningSession.count.mockResolvedValue(2);
      prisma.examReadingSession.count.mockResolvedValue(1);
      prisma.examWritingSession.count.mockResolvedValue(0);
      prisma.examListeningSession.count.mockResolvedValue(0);
      prisma.examSpeakingSession.count.mockResolvedValue(0);
      prisma.freeSpeakingSession.count.mockResolvedValue(0);

      const result = await service.getUser('u1');

      expect(result.stats.totalSessions).toBe(11);
      expect(result.stats.writing).toBe(5);
      expect(result.stats.reading).toBe(3);
    });

    it('calculates avgScore from graded sessions', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 'u1', email: 'a@test.com', name: null, role: 'user', isActive: true,
        subscription: null, avatar: null, createdAt: new Date(), updatedAt: new Date(),
      });
      // all counts default to 0
      prisma.writingSession.findMany.mockResolvedValue([{ overallScore: 80 }, { overallScore: 60 }]);
      prisma.examWritingSession.findMany.mockResolvedValue([]);
      prisma.examSpeakingSession.findMany.mockResolvedValue([]);

      const result = await service.getUser('u1');

      expect(result.stats.avgScore).toBe(70);
    });

    it('returns avgScore=0 when no graded sessions', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 'u1', email: 'a@test.com', name: null, role: 'user', isActive: true,
        subscription: null, avatar: null, createdAt: new Date(), updatedAt: new Date(),
      });
      // all findMany defaults to [] from makePrisma

      const result = await service.getUser('u1');

      expect(result.stats.avgScore).toBe(0);
    });
  });

  // ─── updateUser ───────────────────────────────────────────────────────────

  describe('updateUser()', () => {
    const adminId = 'admin-1';
    const userId = 'user-1';

    it('throws ForbiddenException when admin tries to demote themselves', async () => {
      await expect(
        service.updateUser('self-admin', 'self-admin', { role: 'user' }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('throws ForbiddenException when admin tries to remove their own role entirely', async () => {
      await expect(
        service.updateUser('self-admin', 'self-admin', { role: 'user' }),
      ).rejects.toThrow(/admin/i);
    });

    it('allows admin to update their own name (non-role field)', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: adminId });
      prisma.user.update.mockResolvedValue({ id: adminId, name: 'New Name' });

      // Should NOT throw — name change is allowed
      await expect(
        service.updateUser(adminId, adminId, { name: 'New Name' }),
      ).resolves.not.toThrow();
    });

    it('throws NotFoundException when target user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.updateUser(adminId, userId, { name: 'X' })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('calls prisma.user.update with correct data', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: userId });
      prisma.user.update.mockResolvedValue({ id: userId, isActive: false });

      await service.updateUser(adminId, userId, { isActive: false });

      expect(prisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: userId },
          data: { isActive: false },
        }),
      );
    });

    it('allows admin to promote another user to admin', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: userId });
      prisma.user.update.mockResolvedValue({ id: userId, role: 'admin' });

      await expect(
        service.updateUser(adminId, userId, { role: 'admin' }),
      ).resolves.not.toThrow();
    });
  });

  // ─── deleteUser ───────────────────────────────────────────────────────────

  describe('deleteUser()', () => {
    it('throws ForbiddenException when admin tries to delete themselves', async () => {
      await expect(service.deleteUser('self-id', 'self-id')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('throws NotFoundException when target user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.deleteUser('admin-1', 'ghost-user')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('calls prisma.user.delete with correct id', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 'user-1' });
      prisma.user.delete.mockResolvedValue({});

      await service.deleteUser('admin-1', 'user-1');

      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 'user-1' } });
    });

    it('returns { success: true } on successful delete', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 'user-1' });
      prisma.user.delete.mockResolvedValue({});

      const result = await service.deleteUser('admin-1', 'user-1');

      expect(result).toEqual({ success: true });
    });
  });
});

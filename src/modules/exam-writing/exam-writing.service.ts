import { Injectable, NotFoundException, ForbiddenException, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { GeminiService } from '../writing/gemini.service';
import { CreateExamWritingDto } from './dto/create-exam-writing.dto';
import { SubmitExamWritingDto } from './dto/submit-exam-writing.dto';
import { QueryExamWritingDto } from './dto/query-exam-writing.dto';
import { ExamWritingTeil, EXAM_WRITING_CONFIG } from '../exam-reading/data/exam-config';

@Injectable()
export class ExamWritingService {
  private readonly logger = new Logger(ExamWritingService.name);

  constructor(
    private prisma: PrismaService,
    private gemini: GeminiService,
  ) {}

  // ─── Generate ────────────────────────────────────────────────────────────────

  async generateSession(userId: string, dto: CreateExamWritingDto) {
    const config = EXAM_WRITING_CONFIG[dto.examType]?.[dto.cefrLevel];
    if (!config) throw new NotFoundException('Cấu hình đề viết không tồn tại.');

    const teile = await this.gemini.generateExamWritingPrompts(
      dto.examType as 'GOETHE' | 'TELC',
      dto.cefrLevel,
    );

    return this.prisma.examWritingSession.create({
      data: {
        userId,
        examType: dto.examType,
        cefrLevel: dto.cefrLevel,
        teile: teile as any,
        status: 'DRAFT',
      },
    });
  }

  // ─── Save draft (auto-save) ───────────────────────────────────────────────────

  async saveDraft(userId: string, sessionId: string, userTexts: Record<string, string>) {
    const session = await this.prisma.examWritingSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Không tìm thấy bài thi.');
    if (session.userId !== userId) throw new ForbiddenException();
    if (session.status === 'GRADED') return session;

    return this.prisma.examWritingSession.update({
      where: { id: sessionId },
      data: { userTexts: userTexts as any },
    });
  }

  // ─── Submit & Grade ───────────────────────────────────────────────────────────

  async submitAndGrade(userId: string, sessionId: string, dto: SubmitExamWritingDto) {
    const session = await this.prisma.examWritingSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Không tìm thấy bài thi.');
    if (session.userId !== userId) throw new ForbiddenException();
    if (session.status === 'GRADED') return session;

    // Set GRADING status
    await this.prisma.examWritingSession.update({
      where: { id: sessionId },
      data: { userTexts: dto.userTexts as any, status: 'GRADING', submittedAt: new Date() },
    });

    try {
      const teile = session.teile as unknown as ExamWritingTeil[];

      // Grade all Teile in parallel
      const gradingResults = await Promise.all(
        teile.map(teil => {
          const text = dto.userTexts[`teil_${teil.number}`] || '';
          return this.gemini.gradeExamWritingTeil(teil, text, session.cefrLevel);
        }),
      );

      // Build grading map + compute total score (weighted by maxPoints)
      const gradingMap: Record<string, any> = {};
      let totalWeightedScore = 0;
      let totalMaxPoints = 0;

      for (const result of gradingResults) {
        const key = `teil_${result.teilNumber}`;
        gradingMap[key] = result;
        totalWeightedScore += (result.score / 100) * result.maxPoints;
        totalMaxPoints += result.maxPoints;
      }

      const totalScore = totalMaxPoints > 0
        ? (totalWeightedScore / totalMaxPoints) * 100
        : 0;

      return this.prisma.examWritingSession.update({
        where: { id: sessionId },
        data: {
          grading: gradingMap as any,
          totalScore,
          status: 'GRADED',
          gradedAt: new Date(),
        },
      });
    } catch (error) {
      this.logger.error(`Grading failed for session ${sessionId}: ${error.message}`);
      await this.prisma.examWritingSession.update({
        where: { id: sessionId },
        data: { status: 'ERROR' },
      });
      throw error;
    }
  }

  // ─── Get Session ──────────────────────────────────────────────────────────────

  async getSession(userId: string, sessionId: string) {
    const session = await this.prisma.examWritingSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Không tìm thấy bài thi.');
    if (session.userId !== userId) throw new ForbiddenException();
    return session;
  }

  // ─── History ─────────────────────────────────────────────────────────────────

  async getHistory(userId: string, dto: QueryExamWritingDto) {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: any = { userId };
    if (dto.status) where.status = dto.status;
    if (dto.examType) where.examType = dto.examType;
    if (dto.cefrLevel) where.cefrLevel = dto.cefrLevel;

    const [items, total] = await Promise.all([
      this.prisma.examWritingSession.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true, examType: true, cefrLevel: true,
          totalScore: true, status: true,
          submittedAt: true, gradedAt: true, createdAt: true,
        },
      }),
      this.prisma.examWritingSession.count({ where }),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  // ─── Stats ────────────────────────────────────────────────────────────────────

  async getStats(userId: string) {
    const sessions = await this.prisma.examWritingSession.findMany({
      where: { userId, status: 'GRADED' },
      select: { totalScore: true },
    });

    const total = await this.prisma.examWritingSession.count({ where: { userId } });
    const graded = sessions.length;
    const scores = sessions.map(s => s.totalScore ?? 0);
    const avgScore = graded > 0 ? scores.reduce((a, b) => a + b, 0) / graded : 0;
    const bestScore = graded > 0 ? Math.max(...scores) : 0;

    return { total, graded, avgScore, bestScore };
  }

  // ─── Delete ───────────────────────────────────────────────────────────────────

  async deleteSession(userId: string, sessionId: string) {
    const session = await this.prisma.examWritingSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Không tìm thấy bài thi.');
    if (session.userId !== userId) throw new ForbiddenException();
    await this.prisma.examWritingSession.delete({ where: { id: sessionId } });
    return { success: true };
  }
}

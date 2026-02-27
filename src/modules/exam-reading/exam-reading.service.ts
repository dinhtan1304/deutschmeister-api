import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { GeminiService } from '../writing/gemini.service';
import { CreateExamReadingDto } from './dto/create-exam-reading.dto';
import { SubmitExamReadingDto } from './dto/submit-exam-reading.dto';
import { QueryExamReadingDto } from './dto/query-exam-reading.dto';
import { ExamReadingTeil, ExamTeilQuestion, EXAM_READING_CONFIG } from './data/exam-config';

@Injectable()
export class ExamReadingService {
  constructor(
    private prisma: PrismaService,
    private gemini: GeminiService,
  ) {}

  // ─── Generate ────────────────────────────────────────────────────────────────

  async generateSession(userId: string, dto: CreateExamReadingDto) {
    const config = EXAM_READING_CONFIG[dto.examType]?.[dto.cefrLevel];
    if (!config) throw new NotFoundException('Cấu hình đề thi không tồn tại.');

    const teile = await this.gemini.generateExamReading(
      dto.examType as 'GOETHE' | 'TELC',
      dto.cefrLevel,
    );

    const totalQuestions = teile.reduce((sum, t) => sum + t.questions.length, 0);

    return this.prisma.examReadingSession.create({
      data: {
        userId,
        examType: dto.examType,
        cefrLevel: dto.cefrLevel,
        teile: teile as any,
        totalQuestions,
        status: 'DRAFT',
      },
    });
  }

  // ─── Submit & Grade (local comparison) ───────────────────────────────────────

  async submitAnswers(userId: string, sessionId: string, dto: SubmitExamReadingDto) {
    const session = await this.prisma.examReadingSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Không tìm thấy bài thi.');
    if (session.userId !== userId) throw new ForbiddenException();
    if (session.status === 'GRADED') return session;

    const teile = session.teile as unknown as ExamReadingTeil[];
    const userAnswers = dto.userAnswers; // { "teil_1": { "q1": "richtig" }, ... }

    let totalCorrect = 0;
    const teilScores: { teil: number; correct: number; total: number; maxPoints: number }[] = [];
    const gradingDetails: Record<string, { questionId: string; userAnswer: string | undefined; correctAnswer: string; isCorrect: boolean; explanationVi: string; explanationDe: string }[]> = {};

    for (const teil of teile) {
      const teilKey = `teil_${teil.number}`;
      const teilAnswers = userAnswers[teilKey] || {};
      let teilCorrect = 0;
      const details: typeof gradingDetails[string] = [];

      for (const q of teil.questions as ExamTeilQuestion[]) {
        const userAnswer = teilAnswers[q.id];
        const isCorrect = userAnswer !== undefined &&
          userAnswer.toLowerCase() === q.correctAnswer.toLowerCase();
        if (isCorrect) { teilCorrect++; totalCorrect++; }
        details.push({
          questionId: q.id,
          userAnswer,
          correctAnswer: q.correctAnswer,
          isCorrect,
          explanationVi: q.explanationVi,
          explanationDe: q.explanationDe,
        });
      }

      teilScores.push({ teil: teil.number, correct: teilCorrect, total: teil.questions.length, maxPoints: teil.maxPoints });
      gradingDetails[teilKey] = details;
    }

    const totalQ = teile.reduce((s, t) => s + t.questions.length, 0);
    const score = totalQ > 0 ? (totalCorrect / totalQ) * 100 : 0;

    return this.prisma.examReadingSession.update({
      where: { id: sessionId },
      data: {
        userAnswers: userAnswers as any,
        teilScores: teilScores as any,
        gradingDetails: gradingDetails as any,
        correctCount: totalCorrect,
        score,
        status: 'GRADED',
        submittedAt: new Date(),
      },
    });
  }

  // ─── Get Session ──────────────────────────────────────────────────────────────

  async getSession(userId: string, sessionId: string) {
    const session = await this.prisma.examReadingSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Không tìm thấy bài thi.');
    if (session.userId !== userId) throw new ForbiddenException();
    return session;
  }

  // ─── History ─────────────────────────────────────────────────────────────────

  async getHistory(userId: string, dto: QueryExamReadingDto) {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: any = { userId };
    if (dto.status) where.status = dto.status;
    if (dto.examType) where.examType = dto.examType;
    if (dto.cefrLevel) where.cefrLevel = dto.cefrLevel;

    const [items, total] = await Promise.all([
      this.prisma.examReadingSession.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true, examType: true, cefrLevel: true,
          totalQuestions: true, correctCount: true, score: true,
          status: true, submittedAt: true, createdAt: true,
          teilScores: true,
        },
      }),
      this.prisma.examReadingSession.count({ where }),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  // ─── Stats ────────────────────────────────────────────────────────────────────

  async getStats(userId: string) {
    const sessions = await this.prisma.examReadingSession.findMany({
      where: { userId, status: 'GRADED' },
      select: { score: true, examType: true, cefrLevel: true, createdAt: true },
    });

    const total = await this.prisma.examReadingSession.count({ where: { userId } });
    const graded = sessions.length;
    const scores = sessions.map(s => s.score ?? 0);
    const avgScore = graded > 0 ? scores.reduce((a, b) => a + b, 0) / graded : 0;
    const bestScore = graded > 0 ? Math.max(...scores) : 0;

    return { total, graded, avgScore, bestScore };
  }

  // ─── Delete ───────────────────────────────────────────────────────────────────

  async deleteSession(userId: string, sessionId: string) {
    const session = await this.prisma.examReadingSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Không tìm thấy bài thi.');
    if (session.userId !== userId) throw new ForbiddenException();
    await this.prisma.examReadingSession.delete({ where: { id: sessionId } });
    return { success: true };
  }
}

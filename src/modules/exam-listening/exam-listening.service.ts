import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { GeminiService } from '../writing/gemini.service';
import { CreateExamListeningDto } from './dto/create-exam-listening.dto';
import { SubmitExamListeningDto } from './dto/submit-exam-listening.dto';
import { QueryExamListeningDto } from './dto/query-exam-listening.dto';
import { ExamListeningTeil, ExamListeningQuestion, EXAM_LISTENING_CONFIG } from './data/exam-listening-config';

@Injectable()
export class ExamListeningService {
  constructor(
    private prisma: PrismaService,
    private gemini: GeminiService,
  ) {}

  async generateSession(userId: string, dto: CreateExamListeningDto) {
    const config = EXAM_LISTENING_CONFIG[dto.examType]?.[dto.cefrLevel];
    if (!config) throw new NotFoundException('Cấu hình đề nghe không tồn tại.');

    const teile = await this.gemini.generateExamListening(
      dto.examType as 'GOETHE' | 'TELC',
      dto.cefrLevel,
    );

    const totalQuestions = teile.reduce((sum, t) => sum + t.questions.length, 0);

    return this.prisma.examListeningSession.create({
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

  async submitAnswers(userId: string, sessionId: string, dto: SubmitExamListeningDto) {
    const session = await this.prisma.examListeningSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Không tìm thấy bài thi.');
    if (session.userId !== userId) throw new ForbiddenException();
    if (session.status === 'GRADED') return session;

    const teile = session.teile as unknown as ExamListeningTeil[];
    const userAnswers = dto.userAnswers;

    let totalCorrect = 0;
    const teilScores: { teil: number; correct: number; total: number; maxPoints: number }[] = [];
    const gradingDetails: Record<string, any[]> = {};

    for (const teil of teile) {
      const teilKey = `teil_${teil.number}`;
      const teilAnswers = userAnswers[teilKey] || {};
      let teilCorrect = 0;
      const details: any[] = [];

      for (const q of teil.questions as ExamListeningQuestion[]) {
        const userAnswer = teilAnswers[q.id];
        const isCorrect = userAnswer !== undefined &&
          userAnswer.toLowerCase() === q.correctAnswer.toLowerCase();
        if (isCorrect) { teilCorrect++; totalCorrect++; }
        details.push({ questionId: q.id, userAnswer, correctAnswer: q.correctAnswer, isCorrect, explanationVi: q.explanationVi, explanationDe: q.explanationDe });
      }

      teilScores.push({ teil: teil.number, correct: teilCorrect, total: teil.questions.length, maxPoints: teil.maxPoints });
      gradingDetails[teilKey] = details;
    }

    const totalQ = teile.reduce((s, t) => s + t.questions.length, 0);
    const score = totalQ > 0 ? (totalCorrect / totalQ) * 100 : 0;

    return this.prisma.examListeningSession.update({
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

  async getSession(userId: string, sessionId: string) {
    const session = await this.prisma.examListeningSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Không tìm thấy bài thi.');
    if (session.userId !== userId) throw new ForbiddenException();
    return session;
  }

  async getHistory(userId: string, dto: QueryExamListeningDto) {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 10;
    const skip = (page - 1) * limit;
    const where: any = { userId };
    if (dto.status) where.status = dto.status;
    if (dto.examType) where.examType = dto.examType;
    if (dto.cefrLevel) where.cefrLevel = dto.cefrLevel;

    const [items, total] = await Promise.all([
      this.prisma.examListeningSession.findMany({
        where, orderBy: { createdAt: 'desc' }, skip, take: limit,
        select: { id: true, examType: true, cefrLevel: true, totalQuestions: true, correctCount: true, score: true, status: true, submittedAt: true, createdAt: true, teilScores: true },
      }),
      this.prisma.examListeningSession.count({ where }),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getStats(userId: string) {
    const [total, sessions] = await Promise.all([
      this.prisma.examListeningSession.count({ where: { userId } }),
      this.prisma.examListeningSession.findMany({ where: { userId, status: 'GRADED' }, select: { score: true } }),
    ]);
    const scores = sessions.map(s => s.score ?? 0);
    const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    const bestScore = scores.length > 0 ? Math.max(...scores) : 0;
    return { total, graded: sessions.length, avgScore, bestScore };
  }

  async deleteSession(userId: string, sessionId: string) {
    const session = await this.prisma.examListeningSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Không tìm thấy bài thi.');
    if (session.userId !== userId) throw new ForbiddenException();
    await this.prisma.examListeningSession.delete({ where: { id: sessionId } });
    return { success: true };
  }
}

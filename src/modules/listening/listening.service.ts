import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { GeminiService } from '../writing/gemini.service';
import { CreateListeningDto } from './dto/create-listening.dto';
import { SubmitListeningDto } from './dto/submit-listening.dto';

interface ListeningQuestion {
  id: string;
  questionText: string;
  type: 'richtig_falsch' | 'multiple_choice';
  options?: { id: string; text: string }[];
  correctAnswer: string;
  explanationVi: string;
  explanationDe: string;
}

@Injectable()
export class ListeningService {
  constructor(
    private prisma: PrismaService,
    private gemini: GeminiService,
  ) {}

  async generateSession(userId: string, dto: CreateListeningDto) {
    const result = await this.gemini.generateListeningSession(dto.cefrLevel, dto.scriptType);

    return this.prisma.listeningSession.create({
      data: {
        userId,
        cefrLevel: dto.cefrLevel,
        scriptType: dto.scriptType,
        title: result.title,
        transcript: result.transcript,
        questions: result.questions as any,
        totalQ: result.questions.length,
        status: 'DRAFT',
      },
    });
  }

  async submitAnswers(userId: string, sessionId: string, dto: SubmitListeningDto) {
    const session = await this.prisma.listeningSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Không tìm thấy bài nghe.');
    if (session.userId !== userId) throw new ForbiddenException();
    if (session.status === 'GRADED') return session;

    const questions = session.questions as unknown as ListeningQuestion[];
    let correct = 0;

    for (const q of questions) {
      const ans = dto.userAnswers[q.id];
      if (ans && ans.toLowerCase() === q.correctAnswer.toLowerCase()) correct++;
    }

    const score = questions.length > 0 ? (correct / questions.length) * 100 : 0;

    return this.prisma.listeningSession.update({
      where: { id: sessionId },
      data: {
        userAnswers: dto.userAnswers as any,
        correctCount: correct,
        score,
        status: 'GRADED',
        submittedAt: new Date(),
      },
    });
  }

  async getSession(userId: string, sessionId: string) {
    const session = await this.prisma.listeningSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Không tìm thấy bài nghe.');
    if (session.userId !== userId) throw new ForbiddenException();
    return session;
  }

  async getHistory(userId: string, params: { page?: number; limit?: number; cefrLevel?: string; status?: string }) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;
    const where: any = { userId };
    if (params.cefrLevel) where.cefrLevel = params.cefrLevel;
    if (params.status) where.status = params.status;

    const [items, total] = await Promise.all([
      this.prisma.listeningSession.findMany({
        where, orderBy: { createdAt: 'desc' }, skip, take: limit,
        select: { id: true, cefrLevel: true, scriptType: true, title: true, score: true, correctCount: true, totalQ: true, status: true, submittedAt: true, createdAt: true },
      }),
      this.prisma.listeningSession.count({ where }),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getStats(userId: string) {
    const [total, graded] = await Promise.all([
      this.prisma.listeningSession.count({ where: { userId } }),
      this.prisma.listeningSession.findMany({ where: { userId, status: 'GRADED' }, select: { score: true } }),
    ]);
    const scores = graded.map(s => s.score ?? 0);
    const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    const bestScore = scores.length > 0 ? Math.max(...scores) : 0;
    return { total, graded: graded.length, avgScore, bestScore };
  }

  async deleteSession(userId: string, sessionId: string) {
    const session = await this.prisma.listeningSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Không tìm thấy bài nghe.');
    if (session.userId !== userId) throw new ForbiddenException();
    await this.prisma.listeningSession.delete({ where: { id: sessionId } });
    return { success: true };
  }
}

import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { GeminiService } from '../writing/gemini.service';
import { CreateFreeSpeakingDto } from './dto/create-free-speaking.dto';
import { SubmitFreeSpeakingDto } from './dto/submit-free-speaking.dto';

@Injectable()
export class FreeSpeakingService {
  constructor(
    private prisma: PrismaService,
    private gemini: GeminiService,
  ) {}

  async generateSession(userId: string, dto: CreateFreeSpeakingDto) {
    const { prompt, promptVi, keyPoints } = await this.gemini.generateFreeSpeakingPrompt(
      dto.cefrLevel,
      dto.topicType,
    );

    return this.prisma.freeSpeakingSession.create({
      data: {
        userId,
        cefrLevel: dto.cefrLevel,
        topicType: dto.topicType,
        prompt,
        promptVi,
        keyPoints: keyPoints as any,
        status: 'DRAFT',
      },
    });
  }

  async submitAndGrade(userId: string, sessionId: string, dto: SubmitFreeSpeakingDto) {
    const session = await this.prisma.freeSpeakingSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Không tìm thấy bài nói.');
    if (session.userId !== userId) throw new ForbiddenException();
    if (session.status === 'GRADING') throw new BadRequestException('Bài đang được chấm.');
    if (session.status === 'GRADED') return session;

    await this.prisma.freeSpeakingSession.update({
      where: { id: sessionId },
      data: { status: 'GRADING', submittedAt: new Date(), transcript: dto.transcript ?? '' },
    });

    try {
      const grading = await this.gemini.gradeFreeSpeaking(
        session.prompt,
        dto.audioBase64,
        dto.mimeType,
        dto.transcript ?? '',
        session.cefrLevel,
      );

      return this.prisma.freeSpeakingSession.update({
        where: { id: sessionId },
        data: {
          grading: grading as any,
          totalScore: grading.score,
          status: 'GRADED',
          gradedAt: new Date(),
        },
      });
    } catch (e) {
      await this.prisma.freeSpeakingSession.update({
        where: { id: sessionId },
        data: { status: 'ERROR' },
      });
      throw e;
    }
  }

  async getSession(userId: string, sessionId: string) {
    const session = await this.prisma.freeSpeakingSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Không tìm thấy bài nói.');
    if (session.userId !== userId) throw new ForbiddenException();
    return session;
  }

  async getHistory(userId: string, params: { page?: number; limit?: number; status?: string; cefrLevel?: string }) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;
    const where: any = { userId };
    if (params.status) where.status = params.status;
    if (params.cefrLevel) where.cefrLevel = params.cefrLevel;

    const [items, total] = await Promise.all([
      this.prisma.freeSpeakingSession.findMany({
        where, orderBy: { createdAt: 'desc' }, skip, take: limit,
        select: { id: true, cefrLevel: true, topicType: true, prompt: true, totalScore: true, status: true, createdAt: true },
      }),
      this.prisma.freeSpeakingSession.count({ where }),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getStats(userId: string) {
    const [total, sessions] = await Promise.all([
      this.prisma.freeSpeakingSession.count({ where: { userId } }),
      this.prisma.freeSpeakingSession.findMany({ where: { userId, status: 'GRADED' }, select: { totalScore: true } }),
    ]);
    const scores = sessions.map(s => s.totalScore ?? 0);
    const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    const bestScore = scores.length > 0 ? Math.max(...scores) : 0;
    return { total, graded: sessions.length, avgScore, bestScore };
  }

  async deleteSession(userId: string, sessionId: string) {
    const session = await this.prisma.freeSpeakingSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Không tìm thấy bài nói.');
    if (session.userId !== userId) throw new ForbiddenException();
    if (session.status === 'GRADING') throw new BadRequestException('Không thể xóa bài đang chấm.');
    await this.prisma.freeSpeakingSession.delete({ where: { id: sessionId } });
    return { success: true };
  }
}

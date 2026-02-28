import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { GeminiService } from '../writing/gemini.service';
import { CreateExamSpeakingDto } from './dto/create-exam-speaking.dto';
import { SubmitExamSpeakingDto } from './dto/submit-exam-speaking.dto';
import { QueryExamSpeakingDto } from './dto/query-exam-speaking.dto';
import { EXAM_SPEAKING_CONFIG, ExamSpeakingTeil } from './data/exam-speaking-config';

@Injectable()
export class ExamSpeakingService {
  constructor(
    private prisma: PrismaService,
    private gemini: GeminiService,
  ) {}

  async generateSession(userId: string, dto: CreateExamSpeakingDto) {
    const config = EXAM_SPEAKING_CONFIG[dto.examType]?.[dto.cefrLevel];
    if (!config) throw new NotFoundException('Cấu hình đề nói không tồn tại.');

    const teile = await this.gemini.generateExamSpeaking(
      dto.examType as 'GOETHE' | 'TELC',
      dto.cefrLevel,
    );

    return this.prisma.examSpeakingSession.create({
      data: {
        userId,
        examType: dto.examType,
        cefrLevel: dto.cefrLevel,
        teile: teile as any,
        status: 'DRAFT',
      },
    });
  }

  async submitAndGrade(userId: string, sessionId: string, dto: SubmitExamSpeakingDto) {
    const session = await this.prisma.examSpeakingSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Không tìm thấy bài thi.');
    if (session.userId !== userId) throw new ForbiddenException();
    if (session.status === 'GRADING') throw new BadRequestException('Bài đang được chấm.');
    if (session.status === 'GRADED') return session;

    const teile = session.teile as unknown as ExamSpeakingTeil[];
    const teileData = dto.teileData;

    // Extract transcripts
    const userTranscripts: Record<string, string> = {};
    for (const [num, data] of Object.entries(teileData)) {
      userTranscripts[num] = data.transcript || '';
    }

    // Set to GRADING
    await this.prisma.examSpeakingSession.update({
      where: { id: sessionId },
      data: { status: 'GRADING', submittedAt: new Date(), userTranscripts: userTranscripts as any },
    });

    try {
      // Grade all Teile in parallel
      const gradingResults = await Promise.all(
        teile.map(teil => {
          const data = teileData[String(teil.number)];
          if (!data) return Promise.resolve({ score: 0, criteriaScores: { aufgabe: 0, aussprache: 0, grammatik: 0, wortschatz: 0 }, feedbackVi: 'Không có bản ghi âm.', feedbackDe: 'Keine Aufnahme.', corrections: [], strengths: [] });
          return this.gemini.gradeExamSpeakingTeil(teil, data.audioBase64, data.mimeType, data.transcript, session.cefrLevel);
        }),
      );

      // Build grading map
      const grading: Record<string, any> = {};
      let totalScore = 0;
      teile.forEach((teil, idx) => {
        grading[String(teil.number)] = gradingResults[idx];
        totalScore += gradingResults[idx].score;
      });
      totalScore = teile.length > 0 ? totalScore / teile.length : 0;

      return this.prisma.examSpeakingSession.update({
        where: { id: sessionId },
        data: {
          grading: grading as any,
          totalScore,
          status: 'GRADED',
          gradedAt: new Date(),
        },
      });
    } catch (e) {
      await this.prisma.examSpeakingSession.update({
        where: { id: sessionId },
        data: { status: 'ERROR' },
      });
      throw e;
    }
  }

  async getSession(userId: string, sessionId: string) {
    const session = await this.prisma.examSpeakingSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Không tìm thấy bài thi.');
    if (session.userId !== userId) throw new ForbiddenException();
    return session;
  }

  async getHistory(userId: string, dto: QueryExamSpeakingDto) {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 10;
    const skip = (page - 1) * limit;
    const where: any = { userId };
    if (dto.status) where.status = dto.status;
    if (dto.examType) where.examType = dto.examType;
    if (dto.cefrLevel) where.cefrLevel = dto.cefrLevel;

    const [items, total] = await Promise.all([
      this.prisma.examSpeakingSession.findMany({
        where, orderBy: { createdAt: 'desc' }, skip, take: limit,
        select: { id: true, examType: true, cefrLevel: true, totalScore: true, status: true, submittedAt: true, createdAt: true },
      }),
      this.prisma.examSpeakingSession.count({ where }),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getStats(userId: string) {
    const [total, sessions] = await Promise.all([
      this.prisma.examSpeakingSession.count({ where: { userId } }),
      this.prisma.examSpeakingSession.findMany({ where: { userId, status: 'GRADED' }, select: { totalScore: true } }),
    ]);
    const scores = sessions.map(s => s.totalScore ?? 0);
    const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    const bestScore = scores.length > 0 ? Math.max(...scores) : 0;
    return { total, graded: sessions.length, avgScore, bestScore };
  }

  async deleteSession(userId: string, sessionId: string) {
    const session = await this.prisma.examSpeakingSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Không tìm thấy bài thi.');
    if (session.userId !== userId) throw new ForbiddenException();
    if (session.status === 'GRADING') throw new BadRequestException('Không thể xóa bài đang chấm.');
    await this.prisma.examSpeakingSession.delete({ where: { id: sessionId } });
    return { success: true };
  }
}

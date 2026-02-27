import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { GeminiService, ReadingQuestion } from '../writing/gemini.service';
import { CreateReadingDto, QueryReadingHistoryDto } from './dto/create-reading.dto';
import { SubmitReadingDto } from './dto/submit-reading.dto';
import { READING_TOPICS, READING_TEXT_TYPES } from './data/reading-topics';

@Injectable()
export class ReadingService {
  private readonly logger = new Logger(ReadingService.name);

  constructor(
    private prisma: PrismaService,
    private gemini: GeminiService,
  ) {}

  // ═══════════════════════════════════════════════════════════
  // 1. GỢI Ý CHỦ ĐỀ
  // ═══════════════════════════════════════════════════════════

  getTopics(level: string) {
    const topics = READING_TOPICS[level] || READING_TOPICS['A1'];
    const textTypes = READING_TEXT_TYPES.filter((t) => t.levels.includes(level));
    return { topics, textTypes };
  }

  // ═══════════════════════════════════════════════════════════
  // 2. TẠO BÀI ĐỌC
  // ═══════════════════════════════════════════════════════════

  async generateExercise(userId: string, dto: CreateReadingDto) {
    const textType = READING_TEXT_TYPES.find((t) => t.value === dto.textType);
    if (textType && !textType.levels.includes(dto.cefrLevel)) {
      throw new BadRequestException(
        `Loại văn bản "${dto.textType}" không phù hợp với trình độ ${dto.cefrLevel}. ` +
          `Hỗ trợ: ${textType.levels.join(', ')}`,
      );
    }

    const generated = await this.gemini.generateReadingExercise({
      topic: dto.topic,
      cefrLevel: dto.cefrLevel,
      textType: dto.textType,
      questionCount: dto.questionCount,
    });

    const session = await this.prisma.readingSession.create({
      data: {
        userId,
        cefrLevel: dto.cefrLevel,
        topic: dto.topic,
        textType: dto.textType,
        title: generated.title,
        passage: generated.passage,
        questions: generated.questions as any,
        vocabHighlights: generated.vocabHighlights as any,
        totalQuestions: generated.questions.length,
        status: 'DRAFT',
      },
    });

    return this.formatSessionResponse(session);
  }

  // ═══════════════════════════════════════════════════════════
  // 3. NỘP BÀI + CHẤM ĐIỂM (local grading)
  // ═══════════════════════════════════════════════════════════

  async submitAnswers(userId: string, sessionId: string, dto: SubmitReadingDto) {
    const session = await this.findSessionOrThrow(userId, sessionId);

    if (session.status === 'GRADED') {
      throw new BadRequestException('Bài đọc đã được chấm rồi');
    }

    const questions = session.questions as unknown as ReadingQuestion[];
    let correctCount = 0;
    const gradingDetails: {
      questionId: string;
      userAnswer: string | undefined;
      correctAnswer: string;
      isCorrect: boolean;
      explanationVi: string;
      explanationDe: string;
    }[] = [];

    for (const question of questions) {
      const userAnswer = dto.userAnswers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) correctCount++;
      gradingDetails.push({
        questionId: question.id,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanationVi: question.explanationVi,
        explanationDe: question.explanationDe,
      });
    }

    const totalQuestions = questions.length;
    const score = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;

    const updated = await this.prisma.readingSession.update({
      where: { id: sessionId },
      data: {
        userAnswers: dto.userAnswers as any,
        score,
        correctCount,
        gradingDetails: gradingDetails as any,
        status: 'GRADED',
        submittedAt: new Date(),
      },
    });

    return this.formatSessionResponse(updated);
  }

  // ═══════════════════════════════════════════════════════════
  // 4. XEM CHI TIẾT SESSION
  // ═══════════════════════════════════════════════════════════

  async getSession(userId: string, sessionId: string) {
    const session = await this.prisma.readingSession.findFirst({
      where: { id: sessionId, userId },
    });

    if (!session) {
      throw new NotFoundException('Không tìm thấy bài đọc');
    }

    return this.formatSessionResponse(session);
  }

  // ═══════════════════════════════════════════════════════════
  // 5. LỊCH SỬ BÀI ĐỌC
  // ═══════════════════════════════════════════════════════════

  async getHistory(userId: string, query: QueryReadingHistoryDto) {
    const { page = 1, limit = 10, status, cefrLevel } = query;
    const skip = (page - 1) * limit;

    const where: any = { userId };
    if (status) where.status = status;
    if (cefrLevel) where.cefrLevel = cefrLevel;

    const [data, total] = await Promise.all([
      this.prisma.readingSession.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          topic: true,
          cefrLevel: true,
          textType: true,
          title: true,
          totalQuestions: true,
          correctCount: true,
          score: true,
          status: true,
          createdAt: true,
          submittedAt: true,
        },
      }),
      this.prisma.readingSession.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ═══════════════════════════════════════════════════════════
  // 6. THỐNG KÊ
  // ═══════════════════════════════════════════════════════════

  async getStats(userId: string) {
    const sessions = await this.prisma.readingSession.findMany({
      where: { userId, status: 'GRADED' },
      select: { score: true, cefrLevel: true, correctCount: true, totalQuestions: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    const totalSessions = sessions.length;
    const averageScore =
      totalSessions > 0
        ? sessions.reduce((sum, s) => sum + (s.score || 0), 0) / totalSessions
        : 0;
    const bestScore =
      totalSessions > 0 ? Math.max(...sessions.map((s) => s.score || 0)) : 0;

    const scoresByLevelMap: Record<string, { total: number; count: number }> = {};
    sessions.forEach((s) => {
      if (!scoresByLevelMap[s.cefrLevel])
        scoresByLevelMap[s.cefrLevel] = { total: 0, count: 0 };
      scoresByLevelMap[s.cefrLevel].total += s.score || 0;
      scoresByLevelMap[s.cefrLevel].count++;
    });

    return {
      totalSessions,
      averageScore: Math.round(averageScore * 10) / 10,
      bestScore: Math.round(bestScore * 10) / 10,
      recentScores: sessions.slice(0, 10).map((s) => Math.round(s.score || 0)),
      scoresByLevel: Object.entries(scoresByLevelMap).map(([level, d]) => ({
        level,
        averageScore: Math.round((d.total / d.count) * 10) / 10,
        count: d.count,
      })),
    };
  }

  // ═══════════════════════════════════════════════════════════
  // 7. XÓA SESSION
  // ═══════════════════════════════════════════════════════════

  async deleteSession(userId: string, sessionId: string) {
    await this.findSessionOrThrow(userId, sessionId);

    await this.prisma.readingSession.delete({ where: { id: sessionId } });

    return { message: 'Đã xóa bài đọc' };
  }

  // ═══════════════════════════════════════════════════════════
  // PRIVATE HELPERS
  // ═══════════════════════════════════════════════════════════

  private async findSessionOrThrow(userId: string, sessionId: string) {
    const session = await this.prisma.readingSession.findFirst({
      where: { id: sessionId, userId },
    });

    if (!session) {
      throw new NotFoundException('Không tìm thấy bài đọc');
    }

    return session;
  }

  private formatSessionResponse(session: any) {
    return {
      id: session.id,
      topic: session.topic,
      cefrLevel: session.cefrLevel,
      textType: session.textType,
      title: session.title,
      passage: session.passage,
      questions: session.questions,
      vocabHighlights: session.vocabHighlights,
      userAnswers: session.userAnswers,
      score: session.score,
      totalQuestions: session.totalQuestions,
      correctCount: session.correctCount,
      gradingDetails: session.gradingDetails,
      status: session.status,
      createdAt: session.createdAt,
      submittedAt: session.submittedAt,
      updatedAt: session.updatedAt,
    };
  }
}

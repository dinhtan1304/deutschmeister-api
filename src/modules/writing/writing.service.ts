import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { GeminiService } from './gemini.service';
import { CreateWritingDto, SubmitWritingDto, QueryWritingHistoryDto } from './dto';
import { WRITING_TOPICS, WRITING_TYPES, WORD_COUNT_SUGGESTIONS } from './data/writing-topics';

@Injectable()
export class WritingService {
  private readonly logger = new Logger(WritingService.name);

  constructor(
    private prisma: PrismaService,
    private gemini: GeminiService,
  ) {}

  // ═══════════════════════════════════════════════════════════
  // 1. TẠO ĐỀ BÀI
  // ═══════════════════════════════════════════════════════════

  async generatePrompt(userId: string, dto: CreateWritingDto) {
    // Validate wordCountMin < wordCountMax
    if (dto.wordCountMin >= dto.wordCountMax) {
      throw new BadRequestException('wordCountMin phải nhỏ hơn wordCountMax');
    }

    // Validate writingType phù hợp với cefrLevel
    const writingType = WRITING_TYPES.find((t) => t.value === dto.writingType);
    if (writingType && !writingType.levels.includes(dto.cefrLevel)) {
      throw new BadRequestException(
        `Dạng bài "${dto.writingType}" không phù hợp với trình độ ${dto.cefrLevel}. ` +
        `Dạng bài này chỉ hỗ trợ: ${writingType.levels.join(', ')}`,
      );
    }

    // Gọi Gemini tạo đề
    const generated = await this.gemini.generateWritingPrompt({
      topic: dto.topic,
      cefrLevel: dto.cefrLevel,
      writingType: dto.writingType,
      wordCountMin: dto.wordCountMin,
      wordCountMax: dto.wordCountMax,
    });

    // Lưu session vào DB
    const session = await this.prisma.writingSession.create({
      data: {
        userId,
        topic: dto.topic,
        cefrLevel: dto.cefrLevel,
        writingType: dto.writingType,
        wordCountMin: dto.wordCountMin,
        wordCountMax: dto.wordCountMax,
        prompt: generated.prompt,
        vocabHints: generated.vocabHints,
        grammarHints: generated.grammarHints,
        status: 'DRAFT',
      },
    });

    return {
      id: session.id,
      prompt: session.prompt,
      vocabHints: session.vocabHints,
      grammarHints: session.grammarHints,
      topic: session.topic,
      cefrLevel: session.cefrLevel,
      writingType: session.writingType,
      wordCountMin: session.wordCountMin,
      wordCountMax: session.wordCountMax,
      status: session.status,
      createdAt: session.createdAt,
    };
  }

  // ═══════════════════════════════════════════════════════════
  // 2. LƯU NHÁP
  // ═══════════════════════════════════════════════════════════

  async saveDraft(userId: string, sessionId: string, dto: SubmitWritingDto) {
    const session = await this.findSessionOrThrow(userId, sessionId);

    if (session.status === 'GRADED' || session.status === 'GRADING') {
      throw new BadRequestException('Bài viết đã được chấm hoặc đang chấm, không thể sửa');
    }

    const wordCount = this.countWords(dto.userText);

    const updated = await this.prisma.writingSession.update({
      where: { id: sessionId },
      data: {
        userText: dto.userText,
        wordCount,
        status: 'DRAFT',
      },
    });

    return {
      id: updated.id,
      userText: updated.userText,
      wordCount,
      status: updated.status,
      updatedAt: updated.updatedAt,
    };
  }

  // ═══════════════════════════════════════════════════════════
  // 3. NỘP BÀI + CHẤM
  // ═══════════════════════════════════════════════════════════

  async submitAndGrade(userId: string, sessionId: string, dto: SubmitWritingDto) {
    const session = await this.findSessionOrThrow(userId, sessionId);

    if (session.status === 'GRADING') {
      throw new BadRequestException('Bài viết đang được chấm, vui lòng đợi');
    }

    const wordCount = this.countWords(dto.userText);

    // Cập nhật trạng thái → GRADING
    await this.prisma.writingSession.update({
      where: { id: sessionId },
      data: {
        userText: dto.userText,
        wordCount,
        submittedAt: new Date(),
        status: 'GRADING',
      },
    });

    try {
      // Gọi Gemini chấm bài
      const grading = await this.gemini.gradeWriting({
        prompt: session.prompt,
        userText: dto.userText,
        cefrLevel: session.cefrLevel,
        writingType: session.writingType,
      });

      // Lưu kết quả + errors trong transaction
      const result = await this.prisma.$transaction(async (tx : any) => {
        // Xóa errors cũ nếu có (trường hợp nộp lại)
        await tx.writingError.deleteMany({
          where: { writingSessionId: sessionId },
        });

        // Lưu errors mới
        if (grading.errors.length > 0) {
          await tx.writingError.createMany({
            data: grading.errors.map((err) => ({
              writingSessionId: sessionId,
              errorType: err.errorType,
              severity: err.severity,
              originalText: err.originalText,
              correctedText: err.correctedText,
              explanationDe: err.explanationDe,
              explanationVi: err.explanationVi,
              position: err.position ?? null,
            })),
          });
        }

        // Cập nhật session
        const updated = await tx.writingSession.update({
          where: { id: sessionId },
          data: {
            overallScore: grading.overallScore,
            correctedText: grading.correctedText,
            feedbackDe: grading.generalFeedbackDe,
            feedbackVi: grading.generalFeedbackVi,
            strengths: grading.strengths,
            improvements: grading.improvements,
            gradedAt: new Date(),
            status: 'GRADED',
          },
          include: {
            errors: {
              orderBy: { position: 'asc' },
            },
          },
        });

        return updated;
      });

      return this.formatSessionResponse(result);
    } catch (error) {
      // Nếu chấm bài lỗi → đổi status về ERROR
      await this.prisma.writingSession.update({
        where: { id: sessionId },
        data: { status: 'ERROR' },
      });
      throw error;
    }
  }

  // ═══════════════════════════════════════════════════════════
  // 4. XEM CHI TIẾT SESSION
  // ═══════════════════════════════════════════════════════════

  async getSession(userId: string, sessionId: string) {
    const session = await this.prisma.writingSession.findFirst({
      where: { id: sessionId, userId },
      include: {
        errors: {
          orderBy: { position: 'asc' },
        },
      },
    });

    if (!session) {
      throw new NotFoundException('Không tìm thấy bài viết');
    }

    return this.formatSessionResponse(session);
  }

  // ═══════════════════════════════════════════════════════════
  // 5. LỊCH SỬ BÀI VIẾT
  // ═══════════════════════════════════════════════════════════

  async getHistory(userId: string, query: QueryWritingHistoryDto) {
    const { page = 1, limit = 10, status, cefrLevel } = query;
    const skip = (page - 1) * limit;

    const where: any = { userId };
    if (status) where.status = status;
    if (cefrLevel) where.cefrLevel = cefrLevel;

    const [data, total] = await Promise.all([
      this.prisma.writingSession.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          topic: true,
          cefrLevel: true,
          writingType: true,
          wordCountMin: true,
          wordCountMax: true,
          wordCount: true,
          overallScore: true,
          status: true,
          createdAt: true,
          submittedAt: true,
          gradedAt: true,
          _count: {
            select: { errors: true },
          },
        },
      }),
      this.prisma.writingSession.count({ where }),
    ]);

    return {
      data: data.map((item) => ({
        ...item,
        errorCount: item._count.errors,
        _count: undefined,
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ═══════════════════════════════════════════════════════════
  // 6. THỐNG KÊ LỖI
  // ═══════════════════════════════════════════════════════════

  async getErrorStats(userId: string) {
    // Lấy tất cả errors của user
    const errors = await this.prisma.writingError.findMany({
      where: {
        session: { userId },
      },
      select: {
        errorType: true,
        severity: true,
      },
    });

    // Đếm theo loại lỗi
    const errorsByType: Record<string, number> = {};
    const errorsBySeverity: Record<string, number> = {};

    errors.forEach((err) => {
      errorsByType[err.errorType] = (errorsByType[err.errorType] || 0) + 1;
      errorsBySeverity[err.severity] = (errorsBySeverity[err.severity] || 0) + 1;
    });

    // Sắp xếp theo số lượng giảm dần
    const sortedByType = Object.entries(errorsByType)
      .sort(([, a], [, b]) => b - a)
      .map(([type, count]) => ({
        errorType: type,
        count,
        label: this.getErrorTypeLabel(type),
      }));

    // Thống kê tổng quan
    const sessions = await this.prisma.writingSession.findMany({
      where: { userId, status: 'GRADED' },
      select: { overallScore: true },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    const averageScore = sessions.length > 0
      ? sessions.reduce((sum, s) => sum + (s.overallScore || 0), 0) / sessions.length
      : 0;

    return {
      totalSessions: sessions.length,
      totalErrors: errors.length,
      averageScore: Math.round(averageScore * 10) / 10,
      errorsByType: sortedByType,
      errorsBySeverity: Object.entries(errorsBySeverity).map(([severity, count]) => ({
        severity,
        count,
      })),
      // Top 3 lỗi thường gặp nhất
      topErrors: sortedByType.slice(0, 3),
    };
  }

  // ═══════════════════════════════════════════════════════════
  // 7. GỢI Ý CHỦ ĐỀ
  // ═══════════════════════════════════════════════════════════

  getTopicSuggestions(level: string) {
    const topics = WRITING_TOPICS[level] || WRITING_TOPICS['A1'];
    const types = WRITING_TYPES.filter((t) => t.levels.includes(level));
    const wordCounts = WORD_COUNT_SUGGESTIONS[level] || WORD_COUNT_SUGGESTIONS['A1'];

    return { topics, writingTypes: types, wordCountSuggestions: wordCounts };
  }

  // ═══════════════════════════════════════════════════════════
  // 8. XÓA SESSION
  // ═══════════════════════════════════════════════════════════

  async deleteSession(userId: string, sessionId: string) {
    const session = await this.findSessionOrThrow(userId, sessionId);

    if (session.status === 'GRADING') {
      throw new BadRequestException('Không thể xóa bài đang chấm');
    }

    await this.prisma.writingSession.delete({
      where: { id: sessionId },
    });

    return { message: 'Đã xóa bài viết' };
  }

  // ═══════════════════════════════════════════════════════════
  // PRIVATE HELPERS
  // ═══════════════════════════════════════════════════════════

  private async findSessionOrThrow(userId: string, sessionId: string) {
    const session = await this.prisma.writingSession.findFirst({
      where: { id: sessionId, userId },
    });

    if (!session) {
      throw new NotFoundException('Không tìm thấy bài viết');
    }

    return session;
  }

  private countWords(text: string): number {
    return text
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length;
  }

  private getErrorTypeLabel(type: string): { de: string; vi: string } {
    const labels: Record<string, { de: string; vi: string }> = {
      article: { de: 'Artikel (Der/Die/Das)', vi: 'Mạo từ' },
      grammar: { de: 'Grammatik', vi: 'Ngữ pháp' },
      word_order: { de: 'Wortstellung', vi: 'Trật tự từ' },
      conjugation: { de: 'Konjugation', vi: 'Chia động từ' },
      case: { de: 'Kasus', vi: 'Cách (Nom/Akk/Dat/Gen)' },
      spelling: { de: 'Rechtschreibung', vi: 'Chính tả' },
      vocabulary: { de: 'Wortschatz', vi: 'Từ vựng' },
    };
    return labels[type] || { de: type, vi: type };
  }

  private formatSessionResponse(session: any) {
    return {
      id: session.id,
      topic: session.topic,
      cefrLevel: session.cefrLevel,
      writingType: session.writingType,
      wordCountMin: session.wordCountMin,
      wordCountMax: session.wordCountMax,
      prompt: session.prompt,
      vocabHints: session.vocabHints,
      grammarHints: session.grammarHints,
      userText: session.userText,
      wordCount: session.wordCount,
      overallScore: session.overallScore,
      correctedText: session.correctedText,
      feedbackDe: session.feedbackDe,
      feedbackVi: session.feedbackVi,
      strengths: session.strengths,
      improvements: session.improvements,
      errors: session.errors || [],
      status: session.status,
      createdAt: session.createdAt,
      submittedAt: session.submittedAt,
      gradedAt: session.gradedAt,
    };
  }
}

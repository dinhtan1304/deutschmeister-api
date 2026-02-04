import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { StartGameDto, SubmitAnswerDto, EndGameDto } from './dto/games.dto';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  async startGame(userId: string, dto: StartGameDto) {
    return this.prisma.gameSession.create({
      data: {
        userId,
        gameType: dto.gameType,
        difficulty: dto.difficulty,
        category: dto.category,
        totalQuestions: dto.totalQuestions || 20,
      },
    });
  }

  async submitAnswer(userId: string, dto: SubmitAnswerDto) {
    const session = await this.prisma.gameSession.findFirst({
      where: { id: dto.sessionId, userId },
    });
    if (!session) throw new NotFoundException('Session not found');

    await this.prisma.gameAnswer.create({
      data: {
        sessionId: dto.sessionId,
        wordId: dto.wordId,
        selectedAnswer: dto.selectedAnswer,
        correctAnswer: dto.correctAnswer,
        isCorrect: dto.isCorrect,
        responseTime: dto.responseTime,
      },
    });

    // Update session stats
    await this.prisma.gameSession.update({
      where: { id: dto.sessionId },
      data: {
        correctAnswers: { increment: dto.isCorrect ? 1 : 0 },
        wrongAnswers: { increment: dto.isCorrect ? 0 : 1 },
      },
    });

    return { success: true };
  }

  async endGame(userId: string, dto: EndGameDto) {
    const session = await this.prisma.gameSession.findFirst({
      where: { id: dto.sessionId, userId },
    });
    if (!session) throw new NotFoundException('Session not found');

    return this.prisma.gameSession.update({
      where: { id: dto.sessionId },
      data: {
        score: dto.score,
        bestStreak: dto.bestStreak,
        endedAt: new Date(),
        duration: Math.floor((Date.now() - session.startedAt.getTime()) / 1000),
      },
    });
  }

  async getHistory(userId: string, limit = 20) {
    return this.prisma.gameSession.findMany({
      where: { userId, endedAt: { not: null } },
      orderBy: { startedAt: 'desc' },
      take: limit,
    });
  }

  async getLeaderboard(gameType?: string, limit = 10) {
    const where = gameType ? { gameType, endedAt: { not: null } } : { endedAt: { not: null } };

    return this.prisma.gameSession.findMany({
      where,
      orderBy: { score: 'desc' },
      take: limit,
      include: { user: { select: { id: true, name: true } } },
    });
  }
}

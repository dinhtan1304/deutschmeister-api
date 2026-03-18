import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UsersService } from '../users/users.service';

export type ChallengeEventType =
  | 'learn_word'
  | 'game_session'
  | 'exam_complete'
  | 'writing_session'
  | 'grammar_lesson';

interface ChallengeDefinition {
  key: string;
  title: string;
  titleVi: string;
  target: number;
  xpReward: number;
  eventType: ChallengeEventType;
}

const CHALLENGE_POOL: ChallengeDefinition[] = [
  { key: 'learn_words_30',    title: 'Lerne 30 neue Wörter',       titleVi: 'Học 30 từ mới',              target: 30,  xpReward: 100, eventType: 'learn_word' },
  { key: 'streak_5',          title: '5 Tage Streak',               titleVi: 'Duy trì streak 5 ngày',      target: 5,   xpReward: 80,  eventType: 'learn_word' },
  { key: 'game_sessions_10',  title: 'Spiele 10 Spiele',            titleVi: 'Chơi 10 game',               target: 10,  xpReward: 60,  eventType: 'game_session' },
  { key: 'complete_exams_2',  title: 'Bestehe 2 Prüfungen',         titleVi: 'Hoàn thành 2 bài thi',       target: 2,   xpReward: 120, eventType: 'exam_complete' },
  { key: 'writing_sessions_3','title': '3 Aufsätze schreiben',      titleVi: 'Hoàn thành 3 bài writing',   target: 3,   xpReward: 80,  eventType: 'writing_session' },
  { key: 'grammar_lessons_3', title: '3 Grammatikübungen machen',   titleVi: 'Hoàn thành 3 bài grammar',   target: 3,   xpReward: 60,  eventType: 'grammar_lesson' },
];

@Injectable()
export class ChallengesService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  getCurrentWeekStart(): Date {
    const now = new Date();
    // Vietnam UTC+7
    const vnNow = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    const day = vnNow.getUTCDay(); // 0=Sun,1=Mon,...
    const diff = day === 0 ? 6 : day - 1; // days since Monday
    const monday = new Date(vnNow);
    monday.setUTCDate(vnNow.getUTCDate() - diff);
    monday.setUTCHours(0, 0, 0, 0);
    // Convert back to UTC
    return new Date(monday.getTime() - 7 * 60 * 60 * 1000);
  }

  private selectChallengesForWeek(weekStart: Date): ChallengeDefinition[] {
    // Deterministic selection based on week number so all users get same challenges
    const weekNum = Math.floor(weekStart.getTime() / (7 * 24 * 60 * 60 * 1000));
    const shuffled = [...CHALLENGE_POOL].sort((a, b) => {
      const hashA = this.simpleHash(a.key + weekNum);
      const hashB = this.simpleHash(b.key + weekNum);
      return hashA - hashB;
    });
    return shuffled.slice(0, 3);
  }

  private simpleHash(str: string | number): number {
    const s = String(str);
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
  }

  async getCurrentWeekChallenges(userId: string) {
    const weekStart = this.getCurrentWeekStart();
    const selected = this.selectChallengesForWeek(weekStart);

    // Upsert each challenge for this user/week
    const results = await Promise.all(
      selected.map((def) =>
        this.prisma.userChallengeProgress.upsert({
          where: { userId_weekStart_challengeKey: { userId, weekStart, challengeKey: def.key } },
          update: {},
          create: {
            userId,
            weekStart,
            challengeKey: def.key,
            title: def.title,
            titleVi: def.titleVi,
            target: def.target,
            xpReward: def.xpReward,
          },
        }),
      ),
    );

    return results;
  }

  async updateProgress(userId: string, eventType: ChallengeEventType, amount = 1) {
    const weekStart = this.getCurrentWeekStart();
    const selected = this.selectChallengesForWeek(weekStart);

    // Find challenges matching this eventType that are not yet completed
    const matching = selected.filter((def) => def.eventType === eventType);
    if (matching.length === 0) return;

    for (const def of matching) {
      const record = await this.prisma.userChallengeProgress.findUnique({
        where: { userId_weekStart_challengeKey: { userId, weekStart, challengeKey: def.key } },
      });

      if (!record || record.completed) continue;

      const newCurrent = Math.min(record.current + amount, record.target);
      const completed = newCurrent >= record.target;

      await this.prisma.userChallengeProgress.update({
        where: { id: record.id },
        data: {
          current: newCurrent,
          completed,
          completedAt: completed ? new Date() : null,
        },
      });

      if (completed && !record.xpRewarded) {
        await this.prisma.userChallengeProgress.update({
          where: { id: record.id },
          data: { xpRewarded: true },
        });
        this.usersService.addXp(userId, record.xpReward, 'challenge_complete').catch(() => null);
      }
    }
  }

  async getChallengeHistory(userId: string) {
    const weekStart = this.getCurrentWeekStart();
    return this.prisma.userChallengeProgress.findMany({
      where: { userId, weekStart: { lt: weekStart } },
      orderBy: { weekStart: 'desc' },
      take: 12,
    });
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../../database/prisma.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  // 7pm Vietnam time = 12:00 UTC
  @Cron('0 12 * * *')
  async sendDailyGoalReminders() {
    this.logger.log('Running daily goal reminder job...');

    const todayStart = new Date();
    todayStart.setUTCHours(0, 0, 0, 0);

    const users = await this.prisma.user.findMany({
      where: { isActive: true, emailVerified: true },
      select: { id: true, email: true, name: true, settings: { select: { dailyGoal: true } } },
    });

    let sent = 0;
    for (const user of users) {
      const goal = user.settings?.dailyGoal ?? 20;
      if (goal <= 0) continue;

      const [reviewsToday, dueCards] = await Promise.all([
        this.prisma.progress.count({
          where: { userId: user.id, lastReviewAt: { gte: todayStart } },
        }),
        this.prisma.progress.count({
          where: { userId: user.id, nextReviewAt: { lte: new Date() } },
        }),
      ]);

      if (reviewsToday >= goal) continue;

      await this.emailService.sendDailyReminderEmail(
        user.email,
        user.name ?? 'bạn',
        reviewsToday,
        goal,
        dueCards,
      );
      sent++;
    }

    this.logger.log(`Daily reminders sent: ${sent}/${users.length} users`);
  }
}

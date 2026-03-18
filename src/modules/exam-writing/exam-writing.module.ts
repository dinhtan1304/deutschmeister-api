import { Module } from '@nestjs/common';
import { ExamWritingController } from './exam-writing.controller';
import { ExamWritingService } from './exam-writing.service';
import { GeminiService } from '../writing/gemini.service';
import { PremiumGuard } from '../../common/guards/premium.guard';
import { PracticeQuotaGuard } from '../../common/guards/practice-quota.guard';
import { UsersModule } from '../users/users.module';
import { AchievementsModule } from '../achievements/achievements.module';
import { ChallengesModule } from '../challenges/challenges.module';

@Module({
  imports: [UsersModule, AchievementsModule, ChallengesModule],
  controllers: [ExamWritingController],
  providers: [ExamWritingService, GeminiService, PremiumGuard, PracticeQuotaGuard],
  exports: [ExamWritingService],
})
export class ExamWritingModule {}

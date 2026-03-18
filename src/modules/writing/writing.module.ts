import { Module } from '@nestjs/common';
import { WritingController } from './writing.controller';
import { WritingService } from './writing.service';
import { GeminiService } from './gemini.service';
import { PracticeQuotaGuard } from '../../common/guards/practice-quota.guard';
import { UsersModule } from '../users/users.module';
import { AchievementsModule } from '../achievements/achievements.module';
import { ChallengesModule } from '../challenges/challenges.module';

@Module({
  imports: [UsersModule, AchievementsModule, ChallengesModule],
  controllers: [WritingController],
  providers: [WritingService, GeminiService, PracticeQuotaGuard],
  exports: [WritingService, GeminiService],
})
export class WritingModule {}

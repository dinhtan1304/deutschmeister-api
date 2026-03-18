import { Module } from '@nestjs/common';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { UsersModule } from '../users/users.module';
import { AchievementsModule } from '../achievements/achievements.module';
import { ChallengesModule } from '../challenges/challenges.module';

@Module({
  imports: [UsersModule, AchievementsModule, ChallengesModule],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}

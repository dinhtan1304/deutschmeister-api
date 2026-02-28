import { Module } from '@nestjs/common';
import { ListeningController } from './listening.controller';
import { ListeningService } from './listening.service';
import { GeminiService } from '../writing/gemini.service';
import { PracticeQuotaGuard } from '../../common/guards/practice-quota.guard';

@Module({
  controllers: [ListeningController],
  providers: [ListeningService, GeminiService, PracticeQuotaGuard],
})
export class ListeningModule {}

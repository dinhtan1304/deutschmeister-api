import { Module } from '@nestjs/common';
import { ReadingController } from './reading.controller';
import { ReadingService } from './reading.service';
import { GeminiService } from '../writing/gemini.service';
import { PracticeQuotaGuard } from '../../common/guards/practice-quota.guard';

@Module({
  controllers: [ReadingController],
  providers: [ReadingService, GeminiService, PracticeQuotaGuard],
  exports: [ReadingService],
})
export class ReadingModule {}

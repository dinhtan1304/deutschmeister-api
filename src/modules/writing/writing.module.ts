import { Module } from '@nestjs/common';
import { WritingController } from './writing.controller';
import { WritingService } from './writing.service';
import { GeminiService } from './gemini.service';
import { PracticeQuotaGuard } from '../../common/guards/practice-quota.guard';

@Module({
  controllers: [WritingController],
  providers: [WritingService, GeminiService, PracticeQuotaGuard],
  exports: [WritingService, GeminiService],
})
export class WritingModule {}

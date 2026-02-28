import { Module } from '@nestjs/common';
import { ExamReadingController } from './exam-reading.controller';
import { ExamReadingService } from './exam-reading.service';
import { GeminiService } from '../writing/gemini.service';
import { PremiumGuard } from '../../common/guards/premium.guard';

@Module({
  controllers: [ExamReadingController],
  providers: [ExamReadingService, GeminiService, PremiumGuard],
  exports: [ExamReadingService],
})
export class ExamReadingModule {}

import { Module } from '@nestjs/common';
import { ExamWritingController } from './exam-writing.controller';
import { ExamWritingService } from './exam-writing.service';
import { GeminiService } from '../writing/gemini.service';
import { PremiumGuard } from '../../common/guards/premium.guard';

@Module({
  controllers: [ExamWritingController],
  providers: [ExamWritingService, GeminiService, PremiumGuard],
  exports: [ExamWritingService],
})
export class ExamWritingModule {}

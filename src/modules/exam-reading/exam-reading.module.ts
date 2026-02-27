import { Module } from '@nestjs/common';
import { ExamReadingController } from './exam-reading.controller';
import { ExamReadingService } from './exam-reading.service';
import { GeminiService } from '../writing/gemini.service';

@Module({
  controllers: [ExamReadingController],
  providers: [ExamReadingService, GeminiService],
  exports: [ExamReadingService],
})
export class ExamReadingModule {}

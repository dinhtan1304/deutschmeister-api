import { Module } from '@nestjs/common';
import { ExamWritingController } from './exam-writing.controller';
import { ExamWritingService } from './exam-writing.service';
import { GeminiService } from '../writing/gemini.service';

@Module({
  controllers: [ExamWritingController],
  providers: [ExamWritingService, GeminiService],
  exports: [ExamWritingService],
})
export class ExamWritingModule {}

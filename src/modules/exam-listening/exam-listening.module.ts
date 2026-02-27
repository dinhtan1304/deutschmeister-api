import { Module } from '@nestjs/common';
import { ExamListeningController } from './exam-listening.controller';
import { ExamListeningService } from './exam-listening.service';
import { GeminiService } from '../writing/gemini.service';

@Module({
  controllers: [ExamListeningController],
  providers: [ExamListeningService, GeminiService],
})
export class ExamListeningModule {}

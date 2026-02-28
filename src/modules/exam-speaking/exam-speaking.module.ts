import { Module } from '@nestjs/common';
import { ExamSpeakingController } from './exam-speaking.controller';
import { ExamSpeakingService } from './exam-speaking.service';
import { GeminiService } from '../writing/gemini.service';

@Module({
  controllers: [ExamSpeakingController],
  providers: [ExamSpeakingService, GeminiService],
})
export class ExamSpeakingModule {}

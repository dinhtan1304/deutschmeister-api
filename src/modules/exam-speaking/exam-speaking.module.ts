import { Module } from '@nestjs/common';
import { ExamSpeakingController } from './exam-speaking.controller';
import { ExamSpeakingService } from './exam-speaking.service';
import { GeminiService } from '../writing/gemini.service';
import { PremiumGuard } from '../../common/guards/premium.guard';

@Module({
  controllers: [ExamSpeakingController],
  providers: [ExamSpeakingService, GeminiService, PremiumGuard],
})
export class ExamSpeakingModule {}

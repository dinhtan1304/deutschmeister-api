import { Module } from '@nestjs/common';
import { ExamListeningController } from './exam-listening.controller';
import { ExamListeningService } from './exam-listening.service';
import { GeminiService } from '../writing/gemini.service';
import { PremiumGuard } from '../../common/guards/premium.guard';

@Module({
  controllers: [ExamListeningController],
  providers: [ExamListeningService, GeminiService, PremiumGuard],
})
export class ExamListeningModule {}

import { Module } from '@nestjs/common';
import { FreeSpeakingController } from './free-speaking.controller';
import { FreeSpeakingService } from './free-speaking.service';
import { GeminiService } from '../writing/gemini.service';
import { PracticeQuotaGuard } from '../../common/guards/practice-quota.guard';

@Module({
  controllers: [FreeSpeakingController],
  providers: [FreeSpeakingService, GeminiService, PracticeQuotaGuard],
})
export class FreeSpeakingModule {}

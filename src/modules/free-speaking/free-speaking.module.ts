import { Module } from '@nestjs/common';
import { FreeSpeakingController } from './free-speaking.controller';
import { FreeSpeakingService } from './free-speaking.service';
import { GeminiService } from '../writing/gemini.service';

@Module({
  controllers: [FreeSpeakingController],
  providers: [FreeSpeakingService, GeminiService],
})
export class FreeSpeakingModule {}

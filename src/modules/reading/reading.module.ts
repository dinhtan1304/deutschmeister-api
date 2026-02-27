import { Module } from '@nestjs/common';
import { ReadingController } from './reading.controller';
import { ReadingService } from './reading.service';
import { GeminiService } from '../writing/gemini.service';

@Module({
  controllers: [ReadingController],
  providers: [ReadingService, GeminiService],
  exports: [ReadingService],
})
export class ReadingModule {}

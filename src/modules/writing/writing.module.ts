import { Module } from '@nestjs/common';
import { WritingController } from './writing.controller';
import { WritingService } from './writing.service';
import { GeminiService } from './gemini.service';

@Module({
  controllers: [WritingController],
  providers: [WritingService, GeminiService],
  exports: [WritingService, GeminiService],
})
export class WritingModule {}

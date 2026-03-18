import { Module } from '@nestjs/common';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';
import { GeminiService } from '../writing/gemini.service';

@Module({
  controllers: [WordsController],
  providers: [WordsService, GeminiService],
  exports: [WordsService],
})
export class WordsModule {}

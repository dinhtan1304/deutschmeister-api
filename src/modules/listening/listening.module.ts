import { Module } from '@nestjs/common';
import { ListeningController } from './listening.controller';
import { ListeningService } from './listening.service';
import { GeminiService } from '../writing/gemini.service';

@Module({
  controllers: [ListeningController],
  providers: [ListeningService, GeminiService],
})
export class ListeningModule {}

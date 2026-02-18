import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { WritingModule } from '../writing/writing.module';

@Module({
  imports: [WritingModule], // Import để dùng GeminiService đã export
  controllers: [AiController],
})
export class AiModule {}

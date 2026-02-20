import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { GeminiService } from '../writing/gemini.service';
import { AnalyzeGrammarDto } from './dto/index';

@ApiTags('AI')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
// Skip the lenient 'default' throttler — AI endpoints are only subject to the
// strict 'ai' throttler defined on each route (10 req/min per user).
@SkipThrottle({ default: true })
export class AiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('grammar-analyze')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Phân tích ngữ pháp câu tiếng Đức bằng AI' })
  // 10 requests per minute per user — protects Gemini API cost
  @Throttle({ ai: { limit: 10, ttl: 60_000 } })
  async analyzeGrammar(@Body() dto: AnalyzeGrammarDto) {
    return this.geminiService.analyzeGrammar(dto.sentence, dto.cefrLevel);
  }
}
import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { GeminiService } from '../writing/gemini.service';
import { AnalyzeGrammarDto } from './dto/index';

@ApiTags('AI')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('grammar-analyze')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Phân tích ngữ pháp câu tiếng Đức bằng AI' })
  async analyzeGrammar(@Body() dto: AnalyzeGrammarDto) {
    return this.geminiService.analyzeGrammar(dto.sentence, dto.cefrLevel);
  }
}

import {
  Controller, Post, Patch, Get, Delete, Body, Param, Query,
  UseGuards, Req, HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PremiumGuard } from '../../common/guards/premium.guard';
import { ExamWritingService } from './exam-writing.service';
import { CreateExamWritingDto } from './dto/create-exam-writing.dto';
import { SubmitExamWritingDto } from './dto/submit-exam-writing.dto';
import { QueryExamWritingDto } from './dto/query-exam-writing.dto';

@ApiTags('exam-writing')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PremiumGuard)
@SkipThrottle()
@Controller('exam-writing')
export class ExamWritingController {
  constructor(private readonly service: ExamWritingService) {}

  // POST /exam-writing/generate
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Post('generate')
  generate(@Req() req: any, @Body() dto: CreateExamWritingDto) {
    return this.service.generateSession(req.user.id, dto);
  }

  // PATCH /exam-writing/:id/draft
  @Patch(':id/draft')
  @HttpCode(200)
  saveDraft(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: { userTexts: Record<string, string> },
  ) {
    return this.service.saveDraft(req.user.id, id, body.userTexts);
  }

  // POST /exam-writing/:id/submit
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Post(':id/submit')
  @HttpCode(200)
  submit(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: SubmitExamWritingDto,
  ) {
    return this.service.submitAndGrade(req.user.id, id, dto);
  }

  // GET /exam-writing/history
  @Get('history')
  getHistory(@Req() req: any, @Query() dto: QueryExamWritingDto) {
    return this.service.getHistory(req.user.id, dto);
  }

  // GET /exam-writing/stats
  @Get('stats')
  getStats(@Req() req: any) {
    return this.service.getStats(req.user.id);
  }

  // GET /exam-writing/:id
  @Get(':id')
  getSession(@Req() req: any, @Param('id') id: string) {
    return this.service.getSession(req.user.id, id);
  }

  // DELETE /exam-writing/:id
  @Delete(':id')
  deleteSession(@Req() req: any, @Param('id') id: string) {
    return this.service.deleteSession(req.user.id, id);
  }
}

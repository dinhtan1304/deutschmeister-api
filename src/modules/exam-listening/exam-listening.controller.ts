import { Controller, Post, Get, Delete, Body, Param, Query, UseGuards, Req, HttpCode } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PremiumGuard } from '../../common/guards/premium.guard';
import { PracticeQuotaGuard } from '../../common/guards/practice-quota.guard';
import { Feature } from '../../common/decorators/feature.decorator';
import { ExamListeningService } from './exam-listening.service';
import { CreateExamListeningDto } from './dto/create-exam-listening.dto';
import { SubmitExamListeningDto } from './dto/submit-exam-listening.dto';
import { QueryExamListeningDto } from './dto/query-exam-listening.dto';

@ApiTags('exam-listening')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PremiumGuard)
@SkipThrottle()
@Controller('exam-listening')
export class ExamListeningController {
  constructor(private readonly service: ExamListeningService) {}

  // Heavy AI call — generate exam content
  @SkipThrottle({ default: false })
  @Throttle({ ai: { limit: 10, ttl: 60_000 } })
  @Feature('examListening')
  @UseGuards(PracticeQuotaGuard)
  @Post('generate')
  generate(@Req() req: any, @Body() dto: CreateExamListeningDto) {
    return this.service.generateSession(req.user.id, dto);
  }

  // Local grading — no AI call, no throttle needed
  @Post(':id/submit')
  @HttpCode(200)
  submit(@Req() req: any, @Param('id') id: string, @Body() dto: SubmitExamListeningDto) {
    return this.service.submitAnswers(req.user.id, id, dto);
  }

  @Get('history')
  getHistory(@Req() req: any, @Query() dto: QueryExamListeningDto) {
    return this.service.getHistory(req.user.id, dto);
  }

  @Get('stats')
  getStats(@Req() req: any) {
    return this.service.getStats(req.user.id);
  }

  @Get(':id')
  getSession(@Req() req: any, @Param('id') id: string) {
    return this.service.getSession(req.user.id, id);
  }

  @Delete(':id')
  deleteSession(@Req() req: any, @Param('id') id: string) {
    return this.service.deleteSession(req.user.id, id);
  }
}

import { Controller, Post, Get, Delete, Body, Param, Query, UseGuards, Req, HttpCode } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PremiumGuard } from '../../common/guards/premium.guard';
import { ExamSpeakingService } from './exam-speaking.service';
import { CreateExamSpeakingDto } from './dto/create-exam-speaking.dto';
import { SubmitExamSpeakingDto } from './dto/submit-exam-speaking.dto';
import { QueryExamSpeakingDto } from './dto/query-exam-speaking.dto';

@ApiTags('exam-speaking')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PremiumGuard)
@SkipThrottle()
@Controller('exam-speaking')
export class ExamSpeakingController {
  constructor(private readonly service: ExamSpeakingService) {}

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('generate')
  generate(@Req() req: any, @Body() dto: CreateExamSpeakingDto) {
    return this.service.generateSession(req.user.id, dto);
  }

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post(':id/submit')
  @HttpCode(200)
  submit(@Req() req: any, @Param('id') id: string, @Body() dto: SubmitExamSpeakingDto) {
    return this.service.submitAndGrade(req.user.id, id, dto);
  }

  @Get('history')
  getHistory(@Req() req: any, @Query() dto: QueryExamSpeakingDto) {
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

import {
  Controller, Post, Get, Delete, Body, Param, Query,
  UseGuards, Req, HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ExamReadingService } from './exam-reading.service';
import { CreateExamReadingDto } from './dto/create-exam-reading.dto';
import { SubmitExamReadingDto } from './dto/submit-exam-reading.dto';
import { QueryExamReadingDto } from './dto/query-exam-reading.dto';

@ApiTags('exam-reading')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@SkipThrottle()
@Controller('exam-reading')
export class ExamReadingController {
  constructor(private readonly service: ExamReadingService) {}

  // POST /exam-reading/generate — heavy AI call, throttle 5/min
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Post('generate')
  generate(@Req() req: any, @Body() dto: CreateExamReadingDto) {
    return this.service.generateSession(req.user.id, dto);
  }

  // POST /exam-reading/:id/submit
  @Post(':id/submit')
  @HttpCode(200)
  submit(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: SubmitExamReadingDto,
  ) {
    return this.service.submitAnswers(req.user.id, id, dto);
  }

  // GET /exam-reading/history
  @Get('history')
  getHistory(@Req() req: any, @Query() dto: QueryExamReadingDto) {
    return this.service.getHistory(req.user.id, dto);
  }

  // GET /exam-reading/stats
  @Get('stats')
  getStats(@Req() req: any) {
    return this.service.getStats(req.user.id);
  }

  // GET /exam-reading/:id
  @Get(':id')
  getSession(@Req() req: any, @Param('id') id: string) {
    return this.service.getSession(req.user.id, id);
  }

  // DELETE /exam-reading/:id
  @Delete(':id')
  deleteSession(@Req() req: any, @Param('id') id: string) {
    return this.service.deleteSession(req.user.id, id);
  }
}

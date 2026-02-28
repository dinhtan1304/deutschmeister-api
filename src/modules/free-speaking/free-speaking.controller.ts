import { Controller, Post, Get, Delete, Body, Param, Query, UseGuards, Req, HttpCode } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PracticeQuotaGuard } from '../../common/guards/practice-quota.guard';
import { Feature } from '../../common/decorators/feature.decorator';
import { FreeSpeakingService } from './free-speaking.service';
import { CreateFreeSpeakingDto } from './dto/create-free-speaking.dto';
import { SubmitFreeSpeakingDto } from './dto/submit-free-speaking.dto';

@ApiTags('free-speaking')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@SkipThrottle()
@Controller('free-speaking')
export class FreeSpeakingController {
  constructor(private readonly service: FreeSpeakingService) {}

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('generate')
  @Feature('freeSpeaking')
  @UseGuards(PracticeQuotaGuard)
  generate(@Req() req: any, @Body() dto: CreateFreeSpeakingDto) {
    return this.service.generateSession(req.user.id, dto);
  }

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post(':id/submit')
  @HttpCode(200)
  submit(@Req() req: any, @Param('id') id: string, @Body() dto: SubmitFreeSpeakingDto) {
    return this.service.submitAndGrade(req.user.id, id, dto);
  }

  @Get('history')
  getHistory(
    @Req() req: any,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
    @Query('cefrLevel') cefrLevel?: string,
  ) {
    return this.service.getHistory(req.user.id, {
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      status,
      cefrLevel,
    });
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

import { Controller, Post, Get, Delete, Body, Param, Query, UseGuards, Req, HttpCode } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ListeningService } from './listening.service';
import { CreateListeningDto } from './dto/create-listening.dto';
import { SubmitListeningDto } from './dto/submit-listening.dto';

@ApiTags('listening')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@SkipThrottle()
@Controller('listening')
export class ListeningController {
  constructor(private readonly service: ListeningService) {}

  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Post('generate')
  generate(@Req() req: any, @Body() dto: CreateListeningDto) {
    return this.service.generateSession(req.user.id, dto);
  }

  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Post(':id/submit')
  @HttpCode(200)
  submit(@Req() req: any, @Param('id') id: string, @Body() dto: SubmitListeningDto) {
    return this.service.submitAnswers(req.user.id, id, dto);
  }

  @Get('history')
  getHistory(
    @Req() req: any,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('cefrLevel') cefrLevel?: string,
    @Query('status') status?: string,
  ) {
    return this.service.getHistory(req.user.id, {
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined,
      cefrLevel,
      status,
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

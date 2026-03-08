import { Controller, Post, Get, Patch, Body, Query, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { FeedbackService, SubmitFeedbackDto } from './feedback.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AdminGuard } from '../../common/guards/admin.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Feedback')
@Controller('feedback')
@SkipThrottle()
export class FeedbackController {
  constructor(private readonly service: FeedbackService) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit bug report or feedback (public)' })
  submit(
    @Body() dto: SubmitFeedbackDto,
    @CurrentUser('id') userId?: string,
  ) {
    return this.service.submit(dto, userId);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] List all feedback' })
  getAll(
    @Query('status') status?: string,
    @Query('type') type?: string,
    @Query('page') page?: string,
  ) {
    return this.service.getAll({
      status: status || undefined,
      type: type || undefined,
      page: page ? Number(page) : 1,
    });
  }

  @Patch('admin/:id/status')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Update feedback status' })
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'new' | 'reviewed' | 'resolved',
  ) {
    return this.service.updateStatus(id, status);
  }
}

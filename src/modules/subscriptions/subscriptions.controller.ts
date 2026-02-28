import { Controller, Get, Post, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';
import { RequestUpgradeDto, AdminGrantDto, AdminConfirmPaymentDto } from './dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AdminGuard } from '../../common/guards/admin.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly service: SubscriptionsService) {}

  // ─── Public ─────────────────────────────────────────────────────────────────

  @Get('plans')
  @ApiOperation({ summary: 'Get available plans' })
  getPlans() {
    return this.service.getPlans();
  }

  // ─── User ────────────────────────────────────────────────────────────────────

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my subscription' })
  getMySubscription(@CurrentUser('id') userId: string) {
    return this.service.getMySubscription(userId);
  }

  @Post('upgrade')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Request upgrade — returns bank transfer info' })
  requestUpgrade(@CurrentUser('id') userId: string, @Body() dto: RequestUpgradeDto) {
    return this.service.requestUpgrade(userId, dto);
  }

  @Get('quota/:feature')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check practice quota for free users' })
  checkQuota(
    @CurrentUser('id') userId: string,
    @Param('feature') feature: 'writing' | 'reading' | 'listening' | 'speaking' | 'freeSpeaking',
  ) {
    return this.service.checkPracticeQuota(userId, feature);
  }

  // ─── Admin ───────────────────────────────────────────────────────────────────

  @Get('admin/payments')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] List payments' })
  getAllPayments(
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.service.getAllPayments({
      status: status || undefined,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 20,
    });
  }

  @Post('admin/payments/:id/confirm')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Confirm payment — activates premium' })
  confirmPayment(
    @Param('id') id: string,
    @CurrentUser('id') adminId: string,
    @Body() dto: AdminConfirmPaymentDto,
  ) {
    return this.service.confirmPayment(id, adminId, dto);
  }

  @Post('admin/payments/:id/reject')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Reject payment' })
  rejectPayment(
    @Param('id') id: string,
    @CurrentUser('id') adminId: string,
    @Body() dto: AdminConfirmPaymentDto,
  ) {
    return this.service.rejectPayment(id, adminId, dto);
  }

  @Get('admin/list')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] List all subscriptions' })
  getAllSubscriptions(
    @Query('plan') plan?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.service.getAllSubscriptions({
      plan: plan || undefined,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 20,
    });
  }

  @Post('admin/grant/:userId')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Grant premium to user' })
  adminGrant(
    @Param('userId') userId: string,
    @CurrentUser('id') adminId: string,
    @Body() dto: AdminGrantDto,
  ) {
    return this.service.adminGrant(userId, adminId, dto);
  }

  @Post('admin/revoke/:userId')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Revoke premium from user' })
  adminRevoke(
    @Param('userId') userId: string,
    @CurrentUser('id') adminId: string,
  ) {
    return this.service.adminRevoke(userId, adminId);
  }
}

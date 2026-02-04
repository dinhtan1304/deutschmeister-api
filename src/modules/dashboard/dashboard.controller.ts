import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import {
  FullDashboardDto,
  DashboardStatsDto,
  ActivityHeatmapDto,
  WeeklyProgressDto,
  TopicProgressDto,
  RecentActivityDto,
} from './dto';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // ============================================
  // Full Dashboard (all data in one call)
  // ============================================
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy toàn bộ dữ liệu dashboard' })
  @ApiResponse({ status: 200, type: FullDashboardDto })
  async getFullDashboard(@CurrentUser('id') userId: string) {
    return this.dashboardService.getFullDashboard(userId);
  }

  // ============================================
  // Individual Endpoints
  // ============================================

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy thống kê tổng quan' })
  @ApiResponse({ status: 200, type: DashboardStatsDto })
  async getStats(@CurrentUser('id') userId: string) {
    return this.dashboardService.getStats(userId);
  }

  @Get('heatmap')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy dữ liệu heatmap (365 ngày)' })
  @ApiResponse({ status: 200, type: ActivityHeatmapDto })
  async getHeatmap(@CurrentUser('id') userId: string) {
    return this.dashboardService.getActivityHeatmap(userId);
  }

  @Get('weekly')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy tiến độ 7 ngày qua' })
  @ApiResponse({ status: 200, type: [WeeklyProgressDto] })
  async getWeeklyProgress(@CurrentUser('id') userId: string) {
    return this.dashboardService.getWeeklyProgress(userId);
  }

  @Get('topics')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy tiến độ theo topic' })
  @ApiResponse({ status: 200, type: [TopicProgressDto] })
  async getTopicProgress(@CurrentUser('id') userId: string) {
    return this.dashboardService.getTopicProgress(userId);
  }

  @Get('activity')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy hoạt động gần đây' })
  @ApiResponse({ status: 200, type: [RecentActivityDto] })
  async getRecentActivity(@CurrentUser('id') userId: string) {
    return this.dashboardService.getRecentActivity(userId);
  }

  // ============================================
  // Public Stats (for landing page)
  // ============================================
  @Get('public-stats')
  @Public()
  @ApiOperation({ summary: 'Thống kê công khai (không cần login)' })
  async getPublicStats() {
    const [totalWords, totalTopics, totalUsers] = await Promise.all([
      this.dashboardService['prisma'].word.count(),
      this.dashboardService['prisma'].topic.count({ where: { isActive: true } }),
      this.dashboardService['prisma'].user.count({ where: { isActive: true } }),
    ]);

    return {
      totalWords,
      totalTopics,
      totalUsers,
    };
  }
}
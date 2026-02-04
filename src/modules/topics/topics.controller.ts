import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { TopicsService } from './topics.service';
import {
  CreateTopicDto,
  UpdateTopicDto,
  QueryTopicsDto,
  AddWordsToTopicDto,
  TopicResponseDto,
  TopicWithWordsDto,
} from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../../common/guards/admin.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { Request } from 'express';

// Extend Request to include user
interface AuthRequest extends Request {
  user?: {
    id?: string;
    sub?: string;
    userId?: string;
    email?: string;
  };
}

@ApiTags('Topics')
@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  // Helper to get userId from request
  private getUserId(req: AuthRequest): string {
    const user = req.user;
    if (!user) {
      throw new BadRequestException('User not found in request');
    }
    // Try different possible fields for user ID
    const userId = user.id || user.sub || user.userId;
    if (!userId) {
      throw new BadRequestException('User ID not found');
    }
    return userId;
  }

  // ============================================
  // PUBLIC ENDPOINTS
  // ============================================

  @Get()
  @Public()
  @ApiOperation({ summary: 'Lấy danh sách topics' })
  @ApiResponse({ status: 200, description: 'Danh sách topics' })
  async findAll(@Query() query: QueryTopicsDto) {
    return this.topicsService.findAll(query);
  }

  @Get('stats')
  @Public()
  @ApiOperation({ summary: 'Thống kê topics' })
  @ApiResponse({ status: 200, description: 'Thống kê tổng quan' })
  async getStats() {
    return this.topicsService.getStats();
  }

  @Get('user/progress')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy progress của user cho tất cả topics' })
  @ApiResponse({ status: 200, description: 'Progress theo từng topic' })
  async getUserProgress(@Req() req: AuthRequest) {
    const userId = this.getUserId(req);
    return this.topicsService.getUserProgress(userId);
  }

  @Get(':idOrSlug')
  @Public()
  @ApiOperation({ summary: 'Lấy chi tiết topic theo ID hoặc slug' })
  @ApiParam({ name: 'idOrSlug', description: 'Topic ID hoặc slug' })
  @ApiQuery({ name: 'includeWords', required: false, type: Boolean })
  @ApiResponse({ status: 200, type: TopicWithWordsDto })
  @ApiResponse({ status: 404, description: 'Topic không tìm thấy' })
  async findOne(
    @Param('idOrSlug') idOrSlug: string,
    @Query('includeWords') includeWords?: string,
  ) {
    const include = includeWords !== 'false';
    return this.topicsService.findOne(idOrSlug, include);
  }

  // ============================================
  // AUTHENTICATED ENDPOINTS
  // ============================================

  @Put(':topicId/progress')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cập nhật progress cho topic' })
  @ApiParam({ name: 'topicId', description: 'Topic ID' })
  @ApiResponse({ status: 200, description: 'Progress đã cập nhật' })
  async updateProgress(
    @Req() req: AuthRequest,
    @Param('topicId') topicId: string,
    @Body('wordsLearned') wordsLearned: number,
  ) {
    const userId = this.getUserId(req);
    console.log('Updating progress for userId:', userId, 'topicId:', topicId, 'wordsLearned:', wordsLearned);
    return this.topicsService.updateProgress(userId, topicId, wordsLearned);
  }

  // ============================================
  // ADMIN ENDPOINTS
  // ============================================

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Tạo topic mới' })
  @ApiResponse({ status: 201, type: TopicResponseDto })
  @ApiResponse({ status: 409, description: 'Slug đã tồn tại' })
  async create(@Body() dto: CreateTopicDto) {
    return this.topicsService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Cập nhật topic' })
  @ApiParam({ name: 'id', description: 'Topic ID' })
  @ApiResponse({ status: 200, type: TopicResponseDto })
  @ApiResponse({ status: 404, description: 'Topic không tìm thấy' })
  async update(@Param('id') id: string, @Body() dto: UpdateTopicDto) {
    return this.topicsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[Admin] Xóa topic' })
  @ApiParam({ name: 'id', description: 'Topic ID' })
  @ApiResponse({ status: 200, description: 'Đã xóa thành công' })
  @ApiResponse({ status: 404, description: 'Topic không tìm thấy' })
  async remove(@Param('id') id: string) {
    return this.topicsService.remove(id);
  }

  @Post(':topicId/words')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Thêm words vào topic' })
  @ApiParam({ name: 'topicId', description: 'Topic ID' })
  @ApiResponse({ status: 201, description: 'Đã thêm words' })
  async addWords(
    @Param('topicId') topicId: string,
    @Body() dto: AddWordsToTopicDto,
  ) {
    return this.topicsService.addWords(topicId, dto);
  }

  @Delete(':topicId/words')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[Admin] Xóa words khỏi topic' })
  @ApiParam({ name: 'topicId', description: 'Topic ID' })
  @ApiResponse({ status: 200, description: 'Đã xóa words' })
  async removeWords(
    @Param('topicId') topicId: string,
    @Body('wordIds') wordIds: string[],
  ) {
    return this.topicsService.removeWords(topicId, wordIds);
  }
}
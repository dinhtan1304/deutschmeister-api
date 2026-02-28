import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PracticeQuotaGuard } from '../../common/guards/practice-quota.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { Feature } from '../../common/decorators/feature.decorator';
import { ReadingService } from './reading.service';
import { CreateReadingDto, QueryReadingHistoryDto } from './dto/create-reading.dto';
import { SubmitReadingDto } from './dto/submit-reading.dto';

@ApiTags('Reading Comprehension')
@Controller('reading')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@SkipThrottle()
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  // ── GET /reading/topics?level=A1 ──
  @Public()
  @Get('topics')
  @ApiOperation({ summary: 'Lấy chủ đề + loại văn bản theo CEFR level' })
  @ApiResponse({ status: 200, description: 'Danh sách chủ đề và loại văn bản' })
  getTopics(@Query('level') level: string = 'A1') {
    return this.readingService.getTopics(level);
  }

  // ── POST /reading/generate ──
  @Post('generate')
  @Feature('reading')
  @UseGuards(PracticeQuotaGuard)
  @ApiOperation({ summary: 'AI tạo bài đọc hiểu mới' })
  @ApiResponse({ status: 201, description: 'Bài đọc đã được tạo' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  @SkipThrottle({ default: false })
  @Throttle({ ai: { limit: 10, ttl: 60_000 } })
  async generateExercise(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateReadingDto,
  ) {
    return this.readingService.generateExercise(userId, dto);
  }

  // ── POST /reading/:id/submit ──
  @Post(':id/submit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Nộp bài + chấm điểm tự động' })
  @ApiParam({ name: 'id', description: 'Reading Session ID' })
  @ApiResponse({ status: 200, description: 'Đã chấm bài' })
  @ApiResponse({ status: 400, description: 'Bài đã chấm rồi' })
  async submitAnswers(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: SubmitReadingDto,
  ) {
    return this.readingService.submitAnswers(userId, id, dto);
  }

  // ── GET /reading/history ──
  @Get('history')
  @ApiOperation({ summary: 'Lịch sử bài đọc (phân trang)' })
  @ApiResponse({ status: 200, description: 'Danh sách bài đọc' })
  async getHistory(
    @CurrentUser('id') userId: string,
    @Query() query: QueryReadingHistoryDto,
  ) {
    return this.readingService.getHistory(userId, query);
  }

  // ── GET /reading/stats ──
  @Get('stats')
  @ApiOperation({ summary: 'Thống kê kết quả bài đọc' })
  @ApiResponse({ status: 200, description: 'Thống kê' })
  async getStats(@CurrentUser('id') userId: string) {
    return this.readingService.getStats(userId);
  }

  // ── GET /reading/:id ──
  @Get(':id')
  @ApiOperation({ summary: 'Xem chi tiết bài đọc' })
  @ApiParam({ name: 'id', description: 'Reading Session ID' })
  @ApiResponse({ status: 200, description: 'Chi tiết bài đọc' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  async getSession(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.readingService.getSession(userId, id);
  }

  // ── DELETE /reading/:id ──
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Xóa bài đọc' })
  @ApiParam({ name: 'id', description: 'Reading Session ID' })
  @ApiResponse({ status: 200, description: 'Đã xóa' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  async deleteSession(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.readingService.deleteSession(userId, id);
  }
}

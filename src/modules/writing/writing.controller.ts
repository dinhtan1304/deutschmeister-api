import {
  Controller,
  Get,
  Post,
  Patch,
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
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { WritingService } from './writing.service';
import { CreateWritingDto, SubmitWritingDto, QueryWritingHistoryDto } from './dto';

@ApiTags('Writing Workshop')
@Controller('writing')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WritingController {
  constructor(private readonly writingService: WritingService) {}

  // ── GET /writing/topics?level=A1 ──
  @Public()
  @Get('topics')
  @ApiOperation({ summary: 'Lấy gợi ý chủ đề + dạng bài theo CEFR level' })
  @ApiResponse({ status: 200, description: 'Danh sách chủ đề, dạng bài, gợi ý độ dài' })
  getTopicSuggestions(@Query('level') level: string = 'A1') {
    return this.writingService.getTopicSuggestions(level);
  }

  // ── POST /writing/generate ──
  @Post('generate')
  @ApiOperation({ summary: 'Tạo đề bài viết mới (AI generate)' })
  @ApiResponse({ status: 201, description: 'Đề bài đã được tạo' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  async generatePrompt(
    @CurrentUser('sub') userId: string,
    @Body() dto: CreateWritingDto,
  ) {
    return this.writingService.generatePrompt(userId, dto);
  }

  // ── PATCH /writing/:id/draft ──
  @Patch(':id/draft')
  @ApiOperation({ summary: 'Lưu nháp bài viết' })
  @ApiParam({ name: 'id', description: 'Writing Session ID' })
  @ApiResponse({ status: 200, description: 'Đã lưu nháp' })
  async saveDraft(
    @CurrentUser('sub') userId: string,
    @Param('id') id: string,
    @Body() dto: SubmitWritingDto,
  ) {
    return this.writingService.saveDraft(userId, id, dto);
  }

  // ── POST /writing/:id/submit ──
  @Post(':id/submit')
  @ApiOperation({ summary: 'Nộp bài viết + AI chấm bài' })
  @ApiParam({ name: 'id', description: 'Writing Session ID' })
  @ApiResponse({ status: 200, description: 'Bài đã được chấm' })
  @ApiResponse({ status: 400, description: 'Bài đang chấm hoặc đã chấm' })
  @HttpCode(HttpStatus.OK)
  async submitAndGrade(
    @CurrentUser('sub') userId: string,
    @Param('id') id: string,
    @Body() dto: SubmitWritingDto,
  ) {
    return this.writingService.submitAndGrade(userId, id, dto);
  }

  // ── GET /writing/history ──
  @Get('history')
  @ApiOperation({ summary: 'Lịch sử bài viết (phân trang)' })
  @ApiResponse({ status: 200, description: 'Danh sách bài viết' })
  async getHistory(
    @CurrentUser('sub') userId: string,
    @Query() query: QueryWritingHistoryDto,
  ) {
    return this.writingService.getHistory(userId, query);
  }

  // ── GET /writing/stats ──
  @Get('stats')
  @ApiOperation({ summary: 'Thống kê lỗi thường gặp' })
  @ApiResponse({ status: 200, description: 'Thống kê lỗi' })
  async getErrorStats(@CurrentUser('sub') userId: string) {
    return this.writingService.getErrorStats(userId);
  }

  // ── GET /writing/:id ──
  @Get(':id')
  @ApiOperation({ summary: 'Xem chi tiết bài viết + feedback' })
  @ApiParam({ name: 'id', description: 'Writing Session ID' })
  @ApiResponse({ status: 200, description: 'Chi tiết bài viết' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  async getSession(
    @CurrentUser('sub') userId: string,
    @Param('id') id: string,
  ) {
    return this.writingService.getSession(userId, id);
  }

  // ── DELETE /writing/:id ──
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Xóa bài viết' })
  @ApiParam({ name: 'id', description: 'Writing Session ID' })
  @ApiResponse({ status: 200, description: 'Đã xóa' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  async deleteSession(
    @CurrentUser('sub') userId: string,
    @Param('id') id: string,
  ) {
    return this.writingService.deleteSession(userId, id);
  }
}
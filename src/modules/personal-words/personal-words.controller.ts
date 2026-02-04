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
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { PersonalWordsService } from './personal-words.service';
import {
  CreatePersonalWordDto,
  UpdatePersonalWordDto,
  ImportWordsDto,
  QueryPersonalWordsDto,
  BatchDeleteDto,
} from './dto/personal-words.dto';

@ApiTags('personal-words')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('personal-words')
export class PersonalWordsController {
  constructor(private readonly service: PersonalWordsService) {}

  // ============================================
  // CRUD
  // ============================================

  @Post()
  @ApiOperation({ summary: 'Thêm từ mới vào Word Bank' })
  @ApiResponse({ status: 201, description: 'Từ đã được thêm' })
  @ApiResponse({ status: 409, description: 'Từ đã tồn tại' })
  create(
    @CurrentUser('id') userId: string,
    @Body() dto: CreatePersonalWordDto,
  ) {
    return this.service.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách từ (có filter + pagination)' })
  findAll(
    @CurrentUser('id') userId: string,
    @Query() query: QueryPersonalWordsDto,
  ) {
    return this.service.findAll(userId, query);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Thống kê Word Bank' })
  getStats(@CurrentUser('id') userId: string) {
    return this.service.getStats(userId);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Lấy danh sách categories' })
  getCategories(@CurrentUser('id') userId: string) {
    return this.service.getCategories(userId);
  }

  @Get('export')
  @ApiOperation({ summary: 'Export Word Bank (TSV)' })
  async exportWords(
    @CurrentUser('id') userId: string,
    @Res() res: Response,
  ) {
    const tsv = await this.service.exportWords(userId);

    res.setHeader('Content-Type', 'text/tab-separated-values; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="word-bank-${new Date().toISOString().slice(0, 10)}.tsv"`,
    );
    res.send(tsv);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết một từ' })
  @ApiParam({ name: 'id', description: 'Word ID' })
  findOne(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.service.findOne(userId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật từ' })
  @ApiParam({ name: 'id', description: 'Word ID' })
  update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdatePersonalWordDto,
  ) {
    return this.service.update(userId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xoá từ' })
  @ApiParam({ name: 'id', description: 'Word ID' })
  remove(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.service.remove(userId, id);
  }

  // ============================================
  // SPECIAL ACTIONS
  // ============================================

  @Put(':id/favorite')
  @ApiOperation({ summary: 'Toggle yêu thích' })
  @ApiParam({ name: 'id', description: 'Word ID' })
  toggleFavorite(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.service.toggleFavorite(userId, id);
  }

  @Post('import')
  @ApiOperation({ summary: 'Import từ (check trùng, skip nếu đã có)' })
  @ApiResponse({ status: 201, description: 'Import result' })
  importWords(
    @CurrentUser('id') userId: string,
    @Body() dto: ImportWordsDto,
  ) {
    return this.service.importWords(userId, dto);
  }

  @Post('batch-delete')
  @ApiOperation({ summary: 'Xoá nhiều từ cùng lúc' })
  batchDelete(
    @CurrentUser('id') userId: string,
    @Body() dto: BatchDeleteDto,
  ) {
    return this.service.batchDelete(userId, dto);
  }
}
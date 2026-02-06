import { Controller, Get, Post, Delete, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { HistoryService } from './history.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('history')
@ApiBearerAuth()
@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get view history' })
  getAll(@CurrentUser('id') userId: string, @Query('limit') limit?: number) {
    return this.historyService.getAll(userId, limit);
  }

  @Post(':wordId')
  @ApiOperation({ summary: 'Add to history' })
  add(@CurrentUser('id') userId: string, @Param('wordId') wordId: string) {
    return this.historyService.add(userId, wordId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear history' })
  clear(@CurrentUser('id') userId: string) {
    return this.historyService.clear(userId);
  }
}

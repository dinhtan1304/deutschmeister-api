import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProgressService } from './progress.service';
import { ReviewDto, AddWordsDto } from './dto/progress.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('progress')
@ApiBearerAuth()
@Controller('progress')
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Get('due')
  @ApiOperation({ summary: 'Get due cards for review' })
  getDue(@CurrentUser('id') userId: string, @Query('limit') limit?: number) {
    return this.progressService.getDue(userId, limit);
  }

  @Get()
  @ApiOperation({ summary: 'Get all progress' })
  getAll(@CurrentUser('id') userId: string) {
    return this.progressService.getAll(userId);
  }

  @Post('review')
  @ApiOperation({ summary: 'Submit review' })
  review(@CurrentUser('id') userId: string, @Body() dto: ReviewDto) {
    return this.progressService.review(userId, dto);
  }

  @Post('add')
  @ApiOperation({ summary: 'Add words to SRS deck' })
  addWords(@CurrentUser('id') userId: string, @Body() dto: AddWordsDto) {
    return this.progressService.addWords(userId, dto.wordIds);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get SRS stats' })
  getStats(@CurrentUser('id') userId: string) {
    return this.progressService.getStats(userId);
  }
}

import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('favorites')
@ApiBearerAuth()
@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  getAll(@CurrentUser('sub') userId: string) {
    return this.favoritesService.getAll(userId);
  }

  @Post(':wordId')
  @ApiOperation({ summary: 'Add to favorites' })
  add(@CurrentUser('sub') userId: string, @Param('wordId') wordId: string) {
    return this.favoritesService.add(userId, wordId);
  }

  @Delete(':wordId')
  @ApiOperation({ summary: 'Remove from favorites' })
  remove(@CurrentUser('sub') userId: string, @Param('wordId') wordId: string) {
    return this.favoritesService.remove(userId, wordId);
  }

  @Get(':wordId/check')
  @ApiOperation({ summary: 'Check if word is favorite' })
  check(@CurrentUser('sub') userId: string, @Param('wordId') wordId: string) {
    return this.favoritesService.check(userId, wordId);
  }
}

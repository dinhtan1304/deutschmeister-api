import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GamesService } from './games.service';
import { StartGameDto, SubmitAnswerDto, EndGameDto } from './dto/games.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('games')
@ApiBearerAuth()
@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Post('start')
  @ApiOperation({ summary: 'Start game session' })
  startGame(@CurrentUser('sub') userId: string, @Body() dto: StartGameDto) {
    return this.gamesService.startGame(userId, dto);
  }

  @Post('answer')
  @ApiOperation({ summary: 'Submit answer' })
  submitAnswer(@CurrentUser('sub') userId: string, @Body() dto: SubmitAnswerDto) {
    return this.gamesService.submitAnswer(userId, dto);
  }

  @Post('end')
  @ApiOperation({ summary: 'End game session' })
  endGame(@CurrentUser('sub') userId: string, @Body() dto: EndGameDto) {
    return this.gamesService.endGame(userId, dto);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get game history' })
  getHistory(@CurrentUser('sub') userId: string, @Query('limit') limit?: number) {
    return this.gamesService.getHistory(userId, limit);
  }

  @Public()
  @Get('leaderboard')
  @ApiOperation({ summary: 'Get leaderboard' })
  getLeaderboard(@Query('gameType') gameType?: string, @Query('limit') limit?: number) {
    return this.gamesService.getLeaderboard(gameType, limit);
  }
}

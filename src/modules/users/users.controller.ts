import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateProfileDto, UpdateSettingsDto } from './dto/users.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  getProfile(@CurrentUser('id') userId: string) {
    return this.usersService.getProfile(userId);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update profile' })
  updateProfile(@CurrentUser('id') userId: string, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(userId, dto);
  }

  @Get('settings')
  @ApiOperation({ summary: 'Get settings' })
  getSettings(@CurrentUser('id') userId: string) {
    return this.usersService.getSettings(userId);
  }

  @Put('settings')
  @ApiOperation({ summary: 'Update settings' })
  updateSettings(@CurrentUser('id') userId: string, @Body() dto: UpdateSettingsDto) {
    return this.usersService.updateSettings(userId, dto);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get learning stats' })
  getStats(@CurrentUser('id') userId: string) {
    return this.usersService.getStats(userId);
  }

  @Get('xp')
  @ApiOperation({ summary: 'Get XP and level info' })
  getXpInfo(@CurrentUser('id') userId: string) {
    return this.usersService.getXpInfo(userId);
  }

  @Get('me/error-patterns')
  @ApiOperation({ summary: 'Get grammar error patterns from writing sessions' })
  getErrorPatterns(@CurrentUser('id') userId: string) {
    return this.usersService.getErrorPatterns(userId);
  }
}

@ApiTags('leaderboard')
@Controller('leaderboard')
export class LeaderboardController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get XP leaderboard' })
  getLeaderboard(
    @Query('period') period: 'weekly' | 'monthly' | 'all-time' = 'weekly',
    @Query('limit') limit = 20,
  ) {
    return this.usersService.getLeaderboard(period, +limit);
  }
}

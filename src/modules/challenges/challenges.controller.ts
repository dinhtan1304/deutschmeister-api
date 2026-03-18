import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ChallengesService } from './challenges.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('challenges')
@ApiBearerAuth()
@Controller('challenges')
export class ChallengesController {
  constructor(private challengesService: ChallengesService) {}

  @Get('weekly')
  @ApiOperation({ summary: 'Get current week challenges with user progress' })
  getCurrentWeekChallenges(@CurrentUser('id') userId: string) {
    return this.challengesService.getCurrentWeekChallenges(userId);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get past week challenge history' })
  getChallengeHistory(@CurrentUser('id') userId: string) {
    return this.challengesService.getChallengeHistory(userId);
  }
}

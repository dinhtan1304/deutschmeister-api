import { Module } from '@nestjs/common';
import { UsersController, LeaderboardController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController, LeaderboardController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

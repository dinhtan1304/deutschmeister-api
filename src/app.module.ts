import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { WordsModule } from './modules/words/words.module';
import { GamesModule } from './modules/games/games.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { HistoryModule } from './modules/history/history.module';
import { ProgressModule } from './modules/progress/progress.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { TopicsModule } from './modules/topics/topics.module';
import { PersonalWordsModule } from './modules/personal-words';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { WritingModule } from './modules/writing/writing.module';
import { GrammarModule } from './modules/grammar/grammar.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    WordsModule,
    GamesModule,
    FavoritesModule,
    HistoryModule,
    ProgressModule,
    TopicsModule,
    PersonalWordsModule,
    DashboardModule,
    WritingModule,
    GrammarModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
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
import { AiModule } from './modules/ai/ai.module';
import { ReadingModule } from './modules/reading/reading.module';
import { ExamReadingModule } from './modules/exam-reading/exam-reading.module';
import { ExamWritingModule } from './modules/exam-writing/exam-writing.module';
import { ListeningModule } from './modules/listening/listening.module';
import { ExamListeningModule } from './modules/exam-listening/exam-listening.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Rate limiting: two named throttlers so AI endpoints can use a tighter limit
    // without affecting normal API usage.
    //   default → 200 requests / minute per user (generous for normal navigation)
    //   ai      →  10 requests / minute per user (Gemini API cost protection)
    ThrottlerModule.forRoot([
      { name: 'default', ttl: 60_000, limit: 200 },
      { name: 'ai',      ttl: 60_000, limit: 10  },
    ]),
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
    AiModule,
    ReadingModule,
    ExamReadingModule,
    ExamWritingModule,
    ListeningModule,
    ExamListeningModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    // ThrottlerGuard runs after JwtAuthGuard so the userId is available for
    // per-user tracking. Endpoints without @Throttle() use the 'default' limit.
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
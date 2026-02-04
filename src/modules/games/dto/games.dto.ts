import { IsString, IsOptional, IsInt, IsIn, IsBoolean, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StartGameDto {
  @ApiProperty({ enum: ['quick-quiz', 'flashcard', 'fill-blank', 'timed-challenge'] })
  @IsIn(['quick-quiz', 'flashcard', 'fill-blank', 'timed-challenge'])
  gameType: string;

  @ApiProperty({ enum: ['beginner', 'intermediate', 'advanced'] })
  @IsIn(['beginner', 'intermediate', 'advanced'])
  difficulty: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @IsInt()
  @Min(5)
  totalQuestions?: number;
}

export class SubmitAnswerDto {
  @ApiProperty()
  @IsString()
  sessionId: string;

  @ApiProperty()
  @IsString()
  wordId: string;

  @ApiProperty()
  @IsString()
  selectedAnswer: string;

  @ApiProperty()
  @IsString()
  correctAnswer: string;

  @ApiProperty()
  @IsBoolean()
  isCorrect: boolean;

  @ApiProperty()
  @IsInt()
  @Min(0)
  responseTime: number;
}

export class EndGameDto {
  @ApiProperty()
  @IsString()
  sessionId: string;

  @ApiProperty()
  @IsInt()
  score: number;

  @ApiProperty()
  @IsInt()
  bestStreak: number;
}

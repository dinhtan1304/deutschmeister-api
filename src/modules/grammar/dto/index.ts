import { IsOptional, IsString, IsNotEmpty, IsObject, IsInt, IsBoolean, IsIn, Min, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class QueryLessonsDto {
    @ApiPropertyOptional({ description: 'Filter by CEFR level', enum: ['A1', 'A2', 'B1'] })
    @IsOptional()
    @IsString()
    level?: string;
}

export class SubmitExerciseDto {
    @ApiProperty({ description: 'Answers indexed by exercise order, e.g. { "1": "0", "2": "ä" }' })
    @IsNotEmpty()
    @IsObject()
    answers: Record<number, string | string[]>;
}

// ─── Admin DTOs ───────────────────────────────────────────────────────────────

export class CreateGrammarExerciseDto {
    @ApiProperty()
    @IsString()
    exerciseType: string;

    @ApiPropertyOptional({ default: 0 })
    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    order?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    questionDe?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    questionEn?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    questionVi?: string;

    @ApiProperty({ description: 'JSON answer data' })
    @IsObject()
    answerData: Record<string, any>;

    @ApiPropertyOptional({ description: 'JSON explanation' })
    @IsOptional()
    explanation?: Record<string, any>;

    @ApiPropertyOptional({ default: 1 })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    points?: number;
}

export class CreateGrammarLessonDto {
    @ApiProperty()
    @IsString()
    slug: string;

    @ApiProperty({ enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] })
    @IsIn(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'])
    level: string;

    @ApiProperty()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    lessonNumber: number;

    @ApiProperty()
    @IsString()
    titleDe: string;

    @ApiProperty()
    @IsString()
    titleEn: string;

    @ApiProperty()
    @IsString()
    titleVi: string;

    @ApiProperty({ description: 'JSON: { de: [], en: [], vi: [] }' })
    @IsObject()
    objectives: Record<string, any>;

    @ApiProperty({ description: 'JSON theory content' })
    @IsObject()
    theoryContent: Record<string, any>;

    @ApiPropertyOptional({ default: 25 })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    estimatedMinutes?: number;

    @ApiPropertyOptional({ default: 0 })
    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    order?: number;

    @ApiPropertyOptional({ default: true })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiPropertyOptional({ type: [CreateGrammarExerciseDto] })
    @IsOptional()
    @IsArray()
    exercises?: CreateGrammarExerciseDto[];
}

export class UpdateGrammarLessonDto extends PartialType(CreateGrammarLessonDto) {}

// ─── Response DTOs ────────────────────────────────────────────────────────────

export class LessonResponseDto {
    id: string;
    slug: string;
    level: string;
    lessonNumber: number;
    titleDe: string;
    titleEn: string;
    titleVi: string;
    objectives: { de: string[]; en: string[]; vi: string[] };
    estimatedMinutes: number;
    exerciseCount?: number;
}

export class LessonDetailDto extends LessonResponseDto {
    theoryContent: any;
    exercises: ExerciseDto[];
}

export class ExerciseDto {
    id: string;
    exerciseType: string;
    order: number;
    questionDe?: string;
    questionEn?: string;
    questionVi?: string;
    answerData: any;
    explanation?: any;
    points: number;
}

export class ProgressResponseDto {
    lessonId: string;
    lessonSlug: string;
    status: string;
    score?: number;
    correctCount: number;
    totalAttempts: number;
    completedAt?: Date;
}

export class SubmitResultDto {
    score: number;
    correctCount: number;
    totalQuestions: number;
    passed: boolean;
    feedback: {
        exerciseId: string;
        correct: boolean;
        explanation?: any;
    }[];
}

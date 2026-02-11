import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryLessonsDto {
    @ApiPropertyOptional({ description: 'Filter by CEFR level', enum: ['A1', 'A2', 'B1'] })
    @IsOptional()
    @IsString()
    level?: string;
}

export class SubmitExerciseDto {
    @ApiPropertyOptional({ description: 'Array of answers indexed by exercise order' })
    answers: Record<number, string | string[]>;
}

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

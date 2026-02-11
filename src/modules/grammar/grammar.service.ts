import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryLessonsDto, SubmitExerciseDto, SubmitResultDto } from './dto';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class GrammarService {
    constructor(private prisma: PrismaService) { }

    // ============================================
    // PUBLIC METHODS
    // ============================================

    /**
     * Get all lessons, optionally filtered by level
     */
    async findAllLessons(query: QueryLessonsDto) {
        const where = query.level ? { level: query.level, isActive: true } : { isActive: true };

        const lessons = await this.prisma.grammarLesson.findMany({
            where,
            orderBy: [{ level: 'asc' }, { order: 'asc' }],
            include: {
                _count: {
                    select: { exercises: true }
                }
            }
        });

        return lessons.map(lesson => ({
            id: lesson.id,
            slug: lesson.slug,
            level: lesson.level,
            lessonNumber: lesson.lessonNumber,
            titleDe: lesson.titleDe,
            titleEn: lesson.titleEn,
            titleVi: lesson.titleVi,
            objectives: lesson.objectives,
            estimatedMinutes: lesson.estimatedMinutes,
            exerciseCount: lesson._count.exercises,
            isActive: lesson.isActive
        }));
    }

    /**
     * Get lesson detail by slug with all exercises
     */
    async findLessonBySlug(slug: string) {
        const lesson = await this.prisma.grammarLesson.findUnique({
            where: { slug },
            include: {
                exercises: {
                    orderBy: { order: 'asc' }
                }
            }
        });

        if (!lesson) {
            throw new NotFoundException(`Lesson with slug "${slug}" not found`);
        }

        return {
            id: lesson.id,
            slug: lesson.slug,
            level: lesson.level,
            lessonNumber: lesson.lessonNumber,
            titleDe: lesson.titleDe,
            titleEn: lesson.titleEn,
            titleVi: lesson.titleVi,
            objectives: lesson.objectives,
            theoryContent: lesson.theoryContent,
            estimatedMinutes: lesson.estimatedMinutes,
            exercises: lesson.exercises.map(ex => ({
                id: ex.id,
                exerciseType: ex.exerciseType,
                order: ex.order,
                questionDe: ex.questionDe,
                questionEn: ex.questionEn,
                questionVi: ex.questionVi,
                answerData: ex.answerData,
                explanation: ex.explanation,
                points: ex.points
            }))
        };
    }

    /**
     * Get statistics
     */
    async getStats() {
        const [totalLessons, byLevel] = await Promise.all([
            this.prisma.grammarLesson.count({ where: { isActive: true } }),
            this.prisma.grammarLesson.groupBy({
                by: ['level'],
                where: { isActive: true },
                _count: { id: true }
            })
        ]);

        return {
            totalLessons,
            byLevel: byLevel.reduce((acc, item) => {
                acc[item.level] = item._count.id;
                return acc;
            }, {} as Record<string, number>)
        };
    }

    // ============================================
    // AUTHENTICATED METHODS
    // ============================================

    /**
     * Get user's progress for all lessons
     */
    async getUserProgress(userId: string) {
        const progress = await this.prisma.grammarProgress.findMany({
            where: { userId },
            include: {
                lesson: {
                    select: { slug: true, titleVi: true, level: true }
                }
            },
            orderBy: { lesson: { order: 'asc' } }
        });

        return progress.map(p => ({
            lessonId: p.lessonId,
            lessonSlug: p.lesson.slug,
            lessonTitle: p.lesson.titleVi,
            level: p.lesson.level,
            status: p.status,
            score: p.score,
            correctCount: p.correctCount,
            totalAttempts: p.totalAttempts,
            completedAt: p.completedAt
        }));
    }

    /**
     * Submit exercise answers and grade
     */
    async submitExercises(
        userId: string,
        lessonId: string,
        dto: SubmitExerciseDto
    ): Promise<SubmitResultDto> {
        // Get lesson with exercises
        const lesson = await this.prisma.grammarLesson.findUnique({
            where: { id: lessonId },
            include: { exercises: { orderBy: { order: 'asc' } } }
        });

        if (!lesson) {
            throw new NotFoundException(`Lesson not found`);
        }

        // Grade each exercise
        const feedback: SubmitResultDto['feedback'] = [];
        let correctCount = 0;

        for (const exercise of lesson.exercises) {
            const userAnswer = dto.answers[exercise.order];
            const isCorrect = this.checkAnswer(exercise.exerciseType, exercise.answerData, userAnswer);

            if (isCorrect) correctCount++;

            feedback.push({
                exerciseId: exercise.id,
                correct: isCorrect,
                explanation: exercise.explanation
            });
        }

        const totalQuestions = lesson.exercises.length;
        const score = (correctCount / totalQuestions) * 100;
        const passed = score >= 80;

        // Update or create progress
        await this.prisma.grammarProgress.upsert({
            where: {
                userId_lessonId: { userId, lessonId }
            },
            create: {
                userId,
                lessonId,
                status: passed ? 'completed' : 'in_progress',
                score,
                correctCount,
                totalAttempts: 1,
                startedAt: new Date(),
                completedAt: passed ? new Date() : null,
                lastAttemptAt: new Date()
            },
            update: {
                status: passed ? 'completed' : 'in_progress',
                score: { set: score },
                correctCount: { set: correctCount },
                totalAttempts: { increment: 1 },
                completedAt: passed ? new Date() : undefined,
                lastAttemptAt: new Date()
            }
        });

        return {
            score: Math.round(score * 10) / 10,
            correctCount,
            totalQuestions,
            passed,
            feedback
        };
    }

    // ============================================
    // HELPER METHODS
    // ============================================

    private checkAnswer(
        exerciseType: string,
        answerData: any,
        userAnswer: string | string[] | undefined
    ): boolean {
        if (!userAnswer) return false;

        switch (exerciseType) {
            case 'mcq':
                // answerData: { options: [], correctIndex: 0 }
                return userAnswer === String(answerData.correctIndex);

            case 'fill_blank':
                // answerData: { blanks: [{ answer: "", alternatives: [] }] }
                if (typeof userAnswer === 'string') {
                    const blank = answerData.blanks[0];
                    const correct = blank.answer.toLowerCase().trim();
                    const alternatives = blank.alternatives?.map((a: string) => a.toLowerCase().trim()) || [];
                    const user = userAnswer.toLowerCase().trim();
                    return user === correct || alternatives.includes(user);
                }
                return false;

            case 'reorder':
                // answerData: { correctOrder: [] }
                if (Array.isArray(userAnswer)) {
                    return JSON.stringify(userAnswer) === JSON.stringify(answerData.correctOrder);
                }
                return false;

            case 'translate':
                // answerData: { acceptedAnswers: [] }
                const accepted = answerData.acceptedAnswers.map((a: string) =>
                    a.toLowerCase().trim().replace(/[.!?]/g, '')
                );
                const userTranslation = String(userAnswer).toLowerCase().trim().replace(/[.!?]/g, '');
                return accepted.includes(userTranslation);

            case 'error_correct':
                // answerData: { correctedText: "" }
                return String(userAnswer).toLowerCase().trim() ===
                    answerData.correctedText.toLowerCase().trim();

            default:
                return false;
        }
    }
}

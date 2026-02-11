import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiParam,
    ApiQuery,
} from '@nestjs/swagger';
import { GrammarService } from './grammar.service';
import { QueryLessonsDto, SubmitExerciseDto } from './dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Grammar')
@Controller('grammar')
export class GrammarController {
    constructor(private readonly grammarService: GrammarService) { }

    // ============================================
    // PUBLIC ENDPOINTS
    // ============================================

    @Get('lessons')
    @Public()
    @ApiOperation({ summary: 'Get all grammar lessons' })
    @ApiQuery({ name: 'level', required: false, enum: ['A1', 'A2', 'B1'] })
    @ApiResponse({ status: 200, description: 'List of lessons' })
    async findAllLessons(@Query() query: QueryLessonsDto) {
        return this.grammarService.findAllLessons(query);
    }

    @Get('stats')
    @Public()
    @ApiOperation({ summary: 'Get grammar statistics' })
    @ApiResponse({ status: 200, description: 'Statistics' })
    async getStats() {
        return this.grammarService.getStats();
    }

    @Get('lessons/:slug')
    @Public()
    @ApiOperation({ summary: 'Get lesson detail by slug' })
    @ApiParam({ name: 'slug', description: 'Lesson slug, e.g. a1-l01-alphabet' })
    @ApiResponse({ status: 200, description: 'Lesson detail with exercises' })
    @ApiResponse({ status: 404, description: 'Lesson not found' })
    async findLessonBySlug(@Param('slug') slug: string) {
        return this.grammarService.findLessonBySlug(slug);
    }

    // ============================================
    // AUTHENTICATED ENDPOINTS
    // ============================================

    @Get('progress')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user grammar progress' })
    @ApiResponse({ status: 200, description: 'User progress for all lessons' })
    async getUserProgress(@CurrentUser('id') userId: string) {
        return this.grammarService.getUserProgress(userId);
    }

    @Post('lessons/:id/submit')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Submit exercise answers' })
    @ApiParam({ name: 'id', description: 'Lesson ID' })
    @ApiResponse({ status: 200, description: 'Grading result' })
    @ApiResponse({ status: 404, description: 'Lesson not found' })
    async submitExercises(
        @CurrentUser('id') userId: string,
        @Param('id') lessonId: string,
        @Body() dto: SubmitExerciseDto,
    ) {
        return this.grammarService.submitExercises(userId, lessonId, dto);
    }
}

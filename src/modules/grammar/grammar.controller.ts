import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
    HttpCode,
    HttpStatus,
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
import { QueryLessonsDto, SubmitExerciseDto, CreateGrammarLessonDto, UpdateGrammarLessonDto } from './dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AdminGuard } from '../../common/guards/admin.guard';
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

    // ============================================
    // ADMIN ENDPOINTS
    // ============================================

    @Post('lessons')
    @UseGuards(JwtAuthGuard, AdminGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: '[Admin] Create grammar lesson' })
    @ApiResponse({ status: 201, description: 'Lesson created' })
    @ApiResponse({ status: 409, description: 'Slug already exists' })
    async createLesson(@Body() dto: CreateGrammarLessonDto) {
        return this.grammarService.createLesson(dto);
    }

    @Put('lessons/:id')
    @UseGuards(JwtAuthGuard, AdminGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: '[Admin] Update grammar lesson by ID' })
    @ApiParam({ name: 'id', description: 'Lesson ID' })
    @ApiResponse({ status: 200, description: 'Lesson updated' })
    @ApiResponse({ status: 404, description: 'Lesson not found' })
    async updateLesson(@Param('id') id: string, @Body() dto: UpdateGrammarLessonDto) {
        return this.grammarService.updateLesson(id, dto);
    }

    @Delete('lessons/:id')
    @UseGuards(JwtAuthGuard, AdminGuard)
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '[Admin] Delete grammar lesson' })
    @ApiParam({ name: 'id', description: 'Lesson ID' })
    @ApiResponse({ status: 200, description: 'Lesson deleted' })
    @ApiResponse({ status: 404, description: 'Lesson not found' })
    async deleteLesson(@Param('id') id: string) {
        return this.grammarService.deleteLesson(id);
    }
}

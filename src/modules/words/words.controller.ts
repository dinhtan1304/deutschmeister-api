import { Controller, Get, Post, Patch, Delete, Query, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WordsService } from './words.service';
import { SearchWordsDto, RandomWordsDto } from './dto/words.dto';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AdminGuard } from '../../common/guards/admin.guard';

@ApiTags('words')
@Controller('words')
export class WordsController {
  constructor(private wordsService: WordsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Search words' })
  search(@Query() dto: SearchWordsDto) {
    return this.wordsService.search(dto);
  }

  @Public()
  @Get('random')
  @ApiOperation({ summary: 'Get random words' })
  getRandom(@Query() dto: RandomWordsDto) {
    return this.wordsService.getRandom(dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: '[Admin] Create word' })
  createWord(@Body() dto: CreateWordDto) {
    return this.wordsService.createWord(dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: '[Admin] Update word' })
  updateWord(@Param('id') id: string, @Body() dto: UpdateWordDto) {
    return this.wordsService.updateWord(id, dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: '[Admin] Delete word' })
  deleteWord(@Param('id') id: string) {
    return this.wordsService.deleteWord(id);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get word by ID' })
  findById(@Param('id') id: string) {
    return this.wordsService.findById(id);
  }
}

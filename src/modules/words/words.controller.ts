import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WordsService } from './words.service';
import { SearchWordsDto, RandomWordsDto } from './dto/words.dto';
import { Public } from '../../common/decorators/public.decorator';

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

  @Public()
  @Get('stats')
  @ApiOperation({ summary: 'Get word statistics' })
  getStats() {
    return this.wordsService.getStats();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get word by ID' })
  findById(@Param('id') id: string) {
    return this.wordsService.findById(id);
  }
}

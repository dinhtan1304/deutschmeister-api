import { Module } from '@nestjs/common';
import { PersonalWordsController } from './personal-words.controller';
import { PersonalWordsService } from './personal-words.service';

@Module({
  controllers: [PersonalWordsController],
  providers: [PersonalWordsService],
  exports: [PersonalWordsService],
})
export class PersonalWordsModule {}
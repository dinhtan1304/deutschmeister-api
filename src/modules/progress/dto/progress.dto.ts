import { IsString, IsIn, IsArray, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewDto {
  @ApiProperty()
  @IsString()
  wordId: string;

  @ApiProperty({ enum: ['again', 'hard', 'good', 'easy'] })
  @IsIn(['again', 'hard', 'good', 'easy'])
  rating: 'again' | 'hard' | 'good' | 'easy';
}

export class AddWordsDto {
  @ApiProperty({ type: [String], description: 'Word IDs to add to SRS deck' })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  wordIds: string[];
}

import { IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewDto {
  @ApiProperty()
  @IsString()
  wordId: string;

  @ApiProperty({ enum: ['again', 'hard', 'good', 'easy'] })
  @IsIn(['again', 'hard', 'good', 'easy'])
  rating: 'again' | 'hard' | 'good' | 'easy';
}

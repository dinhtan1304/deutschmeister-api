import { IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExamWritingDto {
  @ApiProperty({ enum: ['GOETHE', 'TELC'] })
  @IsIn(['GOETHE', 'TELC'])
  examType: string;

  @ApiProperty({ enum: ['A1', 'A2', 'B1'] })
  @IsIn(['A1', 'A2', 'B1'])
  cefrLevel: string;
}

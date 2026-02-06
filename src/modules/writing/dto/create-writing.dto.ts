import {
  IsString,
  IsEnum,
  IsInt,
  Min,
  Max,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWritingDto {
  @ApiProperty({
    description: 'Chủ đề bài viết',
    example: 'Wohnung',
  })
  @IsString()
  @MaxLength(200)
  topic: string;

  @ApiProperty({
    description: 'Trình độ CEFR',
    enum: ['A1', 'A2', 'B1', 'B2'],
    example: 'A1',
  })
  @IsEnum(['A1', 'A2', 'B1', 'B2'], {
    message: 'cefrLevel phải là A1, A2, B1 hoặc B2',
  })
  cefrLevel: string;

  @ApiProperty({
    description: 'Dạng bài viết',
    enum: [
      'email', 'brief', 'beschreibung', 'tagebuch',
      'dialog', 'aufsatz', 'formular', 'einladung',
      'beschwerde', 'bewerbung',
    ],
    example: 'email',
  })
  @IsEnum(
    [
      'email', 'brief', 'beschreibung', 'tagebuch',
      'dialog', 'aufsatz', 'formular', 'einladung',
      'beschwerde', 'bewerbung',
    ],
    { message: 'writingType không hợp lệ' },
  )
  writingType: string;

  @ApiProperty({
    description: 'Số từ tối thiểu',
    example: 30,
    minimum: 10,
    maximum: 100,
  })
  @IsInt()
  @Min(10)
  @Max(100)
  wordCountMin: number;

  @ApiProperty({
    description: 'Số từ tối đa',
    example: 50,
    minimum: 20,
    maximum: 500,
  })
  @IsInt()
  @Min(20)
  @Max(500)
  wordCountMax: number;
}

import { IsString, IsIn, IsInt, IsOptional, IsEnum, Min, Max } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReadingDto {
  @ApiProperty({ description: 'CEFR Level', example: 'A1', enum: ['A1', 'A2', 'B1', 'B2'] })
  @IsIn(['A1', 'A2', 'B1', 'B2'])
  cefrLevel: string;

  @ApiProperty({ description: 'Chủ đề bài đọc', example: 'Wohnung' })
  @IsString()
  topic: string;

  @ApiProperty({
    description: 'Loại văn bản',
    example: 'anzeige',
    enum: ['anzeige', 'kurznachricht', 'brief', 'artikel', 'dialog'],
  })
  @IsIn(['anzeige', 'kurznachricht', 'brief', 'artikel', 'dialog'])
  textType: string;

  @ApiProperty({ description: 'Số câu hỏi (3-8)', example: 5, minimum: 3, maximum: 8 })
  @IsInt()
  @Min(3)
  @Max(8)
  @Type(() => Number)
  questionCount: number;
}

export class QueryReadingHistoryDto {
  @ApiPropertyOptional({ description: 'Trang', default: 1 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Số bản ghi mỗi trang', default: 10 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Lọc theo trạng thái', enum: ['DRAFT', 'GRADED'] })
  @IsOptional()
  @IsEnum(['DRAFT', 'GRADED'])
  status?: string;

  @ApiPropertyOptional({ description: 'Lọc theo CEFR level', enum: ['A1', 'A2', 'B1', 'B2'] })
  @IsOptional()
  @IsEnum(['A1', 'A2', 'B1', 'B2'])
  cefrLevel?: string;
}

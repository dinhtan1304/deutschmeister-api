import { IsOptional, IsEnum, IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryWritingHistoryDto {
  @ApiPropertyOptional({ description: 'Trang', default: 1 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Số lượng mỗi trang', default: 10 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Lọc theo trạng thái',
    enum: ['DRAFT', 'SUBMITTED', 'GRADING', 'GRADED', 'ERROR'],
  })
  @IsOptional()
  @IsEnum(['DRAFT', 'SUBMITTED', 'GRADING', 'GRADED', 'ERROR'])
  status?: string;

  @ApiPropertyOptional({
    description: 'Lọc theo trình độ',
    enum: ['A1', 'A2', 'B1', 'B2'],
  })
  @IsOptional()
  @IsEnum(['A1', 'A2', 'B1', 'B2'])
  cefrLevel?: string;
}

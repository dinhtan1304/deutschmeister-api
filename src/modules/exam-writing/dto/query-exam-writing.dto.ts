import { IsOptional, IsInt, Min, Max, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryExamWritingDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt() @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt() @Min(1) @Max(50)
  limit?: number = 10;

  @ApiPropertyOptional({ enum: ['DRAFT', 'GRADING', 'GRADED', 'ERROR'] })
  @IsOptional()
  @IsEnum(['DRAFT', 'GRADING', 'GRADED', 'ERROR'])
  status?: string;

  @ApiPropertyOptional({ enum: ['GOETHE', 'TELC'] })
  @IsOptional()
  @IsEnum(['GOETHE', 'TELC'])
  examType?: string;

  @ApiPropertyOptional({ enum: ['A1', 'A2', 'B1'] })
  @IsOptional()
  @IsEnum(['A1', 'A2', 'B1'])
  cefrLevel?: string;
}

import { IsString, MinLength, MaxLength, IsOptional, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AnalyzeGrammarDto {
  @ApiProperty({ example: 'Der Apfel ist rot.', description: 'Câu tiếng Đức cần phân tích' })
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  sentence: string;

  @ApiPropertyOptional({ example: 'A1', enum: ['A1', 'A2', 'B1', 'B2', 'C1'] })
  @IsOptional()
  @IsString()
  @IsIn(['A1', 'A2', 'B1', 'B2', 'C1'])
  cefrLevel?: string;
}

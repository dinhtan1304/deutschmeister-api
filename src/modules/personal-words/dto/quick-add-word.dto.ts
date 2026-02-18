import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class QuickAddWordDto {
  @ApiProperty({ description: 'Từ tiếng Đức', example: 'Wohnung' })
  @IsString()
  word: string;

  @ApiPropertyOptional({ description: 'Nghĩa tiếng Việt', example: 'Căn hộ' })
  @IsString()
  @IsOptional()
  translationVi?: string;

  @ApiPropertyOptional({ description: 'Nghĩa tiếng Anh', example: 'Apartment' })
  @IsString()
  @IsOptional()
  translationEn?: string;

  @ApiPropertyOptional({ description: 'Loại từ', example: 'nomen' })
  @IsString()
  @IsOptional()
  wordType?: string;

  @ApiPropertyOptional({ description: 'Article (der/die/das)', example: 'die' })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiPropertyOptional({ description: 'Số nhiều', example: 'Wohnungen' })
  @IsString()
  @IsOptional()
  plural?: string;

  @ApiPropertyOptional({ description: 'Ví dụ câu' })
  @IsString()
  @IsOptional()
  example?: string;

  @ApiPropertyOptional({ description: 'Level CEFR', example: 'A1' })
  @IsString()
  @IsOptional()
  level?: string;
}

import { IsString, IsOptional, IsInt, Min, Max, IsIn, IsArray, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GENDERS, LEVELS, CATEGORIES } from './words.dto';

export class CreateWordDto {
  @ApiProperty()
  @IsString()
  word: string;

  @ApiProperty({ enum: ['der', 'die', 'das'] })
  @IsIn(['der', 'die', 'das'])
  article: string;

  @ApiProperty({ enum: GENDERS })
  @IsIn(GENDERS)
  gender: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  plural?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  pronunciation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiProperty()
  @IsString()
  translationEn: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  translationVi?: string;

  @ApiProperty({ enum: CATEGORIES })
  @IsIn(CATEGORIES)
  category: string;

  @ApiProperty({ enum: LEVELS })
  @IsIn(LEVELS)
  level: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(10000)
  frequency?: number = 0;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  examples?: string[] = [];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tips?: string[] = [];
}

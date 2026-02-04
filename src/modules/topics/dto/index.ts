import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  IsArray,
  Min,
  MaxLength,
  IsIn,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

// ============================================
// Create Topic DTO
// ============================================
export class CreateTopicDto {
  @ApiProperty({ example: 'wohnen', description: 'URL-friendly slug' })
  @IsString()
  @MaxLength(50)
  slug: string;

  @ApiProperty({ example: 'Wohnen', description: 'German name' })
  @IsString()
  @MaxLength(100)
  nameDe: string;

  @ApiProperty({ example: 'Housing', description: 'English name' })
  @IsString()
  @MaxLength(100)
  nameEn: string;

  @ApiProperty({ example: 'Nhà ở', description: 'Vietnamese name' })
  @IsString()
  @MaxLength(100)
  nameVi: string;

  @ApiPropertyOptional({ example: 'Wortschatz zum Thema Wohnen' })
  @IsOptional()
  @IsString()
  descriptionDe?: string;

  @ApiPropertyOptional({ example: 'Vocabulary about housing and living' })
  @IsOptional()
  @IsString()
  descriptionEn?: string;

  @ApiPropertyOptional({ example: 'Từ vựng về nhà ở và sinh sống' })
  @IsOptional()
  @IsString()
  descriptionVi?: string;

  @ApiPropertyOptional({ example: '🏠', description: 'Emoji icon' })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional({ example: '#4CAF50', description: 'Theme color' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ description: 'Cover image URL' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ example: 'A1', enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] })
  @IsOptional()
  @IsIn(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'])
  level?: string;

  @ApiPropertyOptional({ example: 1, description: 'Display order' })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

// ============================================
// Update Topic DTO
// ============================================
export class UpdateTopicDto extends PartialType(CreateTopicDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

// ============================================
// Query Topics DTO
// ============================================
export class QueryTopicsDto {
  @ApiPropertyOptional({ example: 'A1', enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] })
  @IsOptional()
  @IsIn(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'])
  level?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ default: false, description: 'Include word count and words' })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  includeWords?: boolean;

  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ default: 20, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}

// ============================================
// Add Words to Topic DTO
// ============================================
export class AddWordsToTopicDto {
  @ApiProperty({ type: [String], description: 'Array of word IDs' })
  @IsArray()
  @IsString({ each: true })
  wordIds: string[];

  @ApiPropertyOptional({ default: false, description: 'Mark as core words' })
  @IsOptional()
  @IsBoolean()
  isCore?: boolean;
}

// ============================================
// Response DTOs
// ============================================
export class TopicResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  nameDe: string;

  @ApiProperty()
  nameEn: string;

  @ApiProperty()
  nameVi: string;

  @ApiPropertyOptional()
  descriptionDe?: string;

  @ApiPropertyOptional()
  descriptionEn?: string;

  @ApiPropertyOptional()
  descriptionVi?: string;

  @ApiPropertyOptional()
  icon?: string;

  @ApiPropertyOptional()
  color?: string;

  @ApiPropertyOptional()
  imageUrl?: string;

  @ApiProperty()
  level: string;

  @ApiProperty()
  order: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  wordCount: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class TopicWithWordsDto extends TopicResponseDto {
  @ApiProperty({ type: 'array', description: 'Words in this topic' })
  words: {
    id: string;
    word: string;
    article: string;
    gender: string;
    translationEn: string;
    translationVi: string;
    isCore: boolean;
    order: number;
  }[];
}

export class TopicProgressDto {
  @ApiProperty()
  topicId: string;

  @ApiProperty()
  wordsLearned: number;

  @ApiProperty()
  wordsTotal: number;

  @ApiProperty()
  masteryPercent: number;

  @ApiPropertyOptional()
  lastStudiedAt?: Date;

  @ApiPropertyOptional()
  completedAt?: Date;
}

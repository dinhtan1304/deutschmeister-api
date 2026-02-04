import {
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
  IsBoolean,
  IsObject,
  ValidateNested,
  MaxLength,
  MinLength,
  ArrayMaxSize,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ============================================
// Enums
// ============================================
export enum WordType {
  NOMEN = 'nomen',
  VERB = 'verb',
  ADJEKTIV = 'adjektiv',
  ADVERB = 'adverb',
  PRAPOSITION = 'praposition',
  KONJUNKTION = 'konjunktion',
  PRONOMEN = 'pronomen',
  PARTIKEL = 'partikel',
  ANDERE = 'andere',
}

export enum Level {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
}

export enum Gender {
  MASCULINE = 'masculine',
  FEMININE = 'feminine',
  NEUTER = 'neuter',
}

// ============================================
// Type-specific data DTOs
// ============================================
export class NomenDataDto {
  @ApiProperty({ enum: ['der', 'die', 'das'] })
  @IsString()
  @IsEnum(['der', 'die', 'das'])
  article: 'der' | 'die' | 'das';

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  plural?: string;
}

export class VerbDataDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  partizipII?: string;

  @ApiPropertyOptional({ enum: ['haben', 'sein'] })
  @IsOptional()
  @IsString()
  hilfsverb?: 'haben' | 'sein';

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  trennbar?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  prateritum?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  konjugation?: {
    ich?: string;
    du?: string;
    erSieEs?: string;
    wir?: string;
    ihr?: string;
    sieSie?: string;
  };
}

export class AdjektivDataDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  komparativ?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  superlativ?: string;
}

export class PrapositionDataDto {
  @ApiPropertyOptional({ type: [String], enum: ['akkusativ', 'dativ', 'genitiv', 'wechsel'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  kasus?: string[];
}

// ============================================
// Create DTO
// ============================================
export class CreatePersonalWordDto {
  @ApiProperty({ example: 'Haus' })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  word: string;

  @ApiProperty({ enum: WordType, example: WordType.NOMEN })
  @IsEnum(WordType)
  wordType: WordType;

  @ApiPropertyOptional({ type: NomenDataDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => NomenDataDto)
  nomenData?: NomenDataDto;

  @ApiPropertyOptional({ type: VerbDataDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => VerbDataDto)
  verbData?: VerbDataDto;

  @ApiPropertyOptional({ type: AdjektivDataDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => AdjektivDataDto)
  adjektivData?: AdjektivDataDto;

  @ApiPropertyOptional({ type: PrapositionDataDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => PrapositionDataDto)
  prapositionData?: PrapositionDataDto;

  @ApiProperty({ example: 'house' })
  @IsString()
  @MinLength(1)
  translationEn: string;

  @ApiProperty({ example: 'ngôi nhà' })
  @IsString()
  @MinLength(1)
  translationVi: string;

  @ApiPropertyOptional({ type: [String], example: ['Das Haus ist groß.'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(10)
  examples?: string[];

  @ApiPropertyOptional({ enum: Level, default: Level.A1 })
  @IsOptional()
  @IsEnum(Level)
  level?: Level;

  @ApiPropertyOptional({ example: 'home' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ type: [String], example: ['wohnung', 'ort'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(10)
  tags?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  pronunciation?: string;
}

// ============================================
// Update DTO (all fields optional)
// ============================================
export class UpdatePersonalWordDto extends PartialType(CreatePersonalWordDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isFavorite?: boolean;
}

// ============================================
// Import DTO
// ============================================
export class ImportRowDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  word: string;

  @ApiProperty({ enum: WordType })
  @IsEnum(WordType)
  wordType: WordType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  article?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  plural?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  partizipII?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  hilfsverb?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  komparativ?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  superlativ?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  kasus?: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  translationEn: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  translationVi: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  examples?: string; // pipe-separated: "example1|example2"

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  level?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tags?: string; // comma-separated

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}

export class ImportWordsDto {
  @ApiProperty({ type: [ImportRowDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImportRowDto)
  @ArrayMaxSize(500)
  rows: ImportRowDto[];
}

// ============================================
// Query DTO (filters)
// ============================================
export class QueryPersonalWordsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: WordType })
  @IsOptional()
  @IsEnum(WordType)
  wordType?: WordType;

  @ApiPropertyOptional({ enum: Level })
  @IsOptional()
  @IsEnum(Level)
  level?: Level;

  @ApiPropertyOptional({ enum: Gender })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  favoritesOnly?: boolean;

  @ApiPropertyOptional({ enum: ['word', 'createdAt', 'updatedAt', 'level', 'wordType'], default: 'createdAt' })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'], default: 'desc' })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ default: 50 })
  @IsOptional()
  limit?: number;
}

// ============================================
// Batch Delete DTO
// ============================================
export class BatchDeleteDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(100)
  ids: string[];
}

// ============================================
// Response DTOs
// ============================================
export class ImportResultDto {
  @ApiProperty() added: number;
  @ApiProperty() skipped: number;
  @ApiProperty() failed: number;
  @ApiProperty() errors: { row: number; field: string; message: string }[];
  @ApiProperty() skippedWords: string[];
}

export class StatsDto {
  @ApiProperty() total: number;
  @ApiProperty() favorites: number;
  @ApiProperty() byType: Record<string, number>;
  @ApiProperty() byLevel: Record<string, number>;
}

export class PaginatedResponseDto {
  @ApiProperty() data: any[];
  @ApiProperty() total: number;
  @ApiProperty() page: number;
  @ApiProperty() limit: number;
  @ApiProperty() totalPages: number;
}
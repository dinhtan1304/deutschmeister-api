import { IsOptional, IsString, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCollectionDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  icon?: string;
}

export class UpdateCollectionDto extends PartialType(CreateCollectionDto) {}

export class AddWordToCollectionDto {
  @IsString()
  personalWordId: string;
}

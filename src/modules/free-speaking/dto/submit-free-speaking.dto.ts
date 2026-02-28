import { IsString, IsOptional } from 'class-validator';

export class SubmitFreeSpeakingDto {
  @IsString()
  audioBase64: string;

  @IsString()
  mimeType: string;

  @IsOptional()
  @IsString()
  transcript?: string;
}

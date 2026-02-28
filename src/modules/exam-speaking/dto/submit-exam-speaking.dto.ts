import { IsObject, IsNotEmpty } from 'class-validator';

export class SubmitExamSpeakingDto {
  @IsObject()
  @IsNotEmpty()
  // { "1": { audioBase64: string, transcript: string, mimeType: string }, "2": ..., "3": ... }
  teileData: Record<string, { audioBase64: string; transcript: string; mimeType: string }>;
}

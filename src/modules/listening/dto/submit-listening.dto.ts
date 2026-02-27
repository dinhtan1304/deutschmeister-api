import { IsObject, IsNotEmpty } from 'class-validator';

export class SubmitListeningDto {
  @IsObject()
  @IsNotEmpty()
  userAnswers: Record<string, string>;
}

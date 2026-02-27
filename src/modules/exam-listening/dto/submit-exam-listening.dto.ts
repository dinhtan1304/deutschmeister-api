import { IsObject, IsNotEmpty } from 'class-validator';

export class SubmitExamListeningDto {
  @IsObject()
  @IsNotEmpty()
  userAnswers: Record<string, Record<string, string>>;
}

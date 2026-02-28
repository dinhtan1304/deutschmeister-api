import { IsIn } from 'class-validator';

export class CreateExamSpeakingDto {
  @IsIn(['GOETHE', 'TELC'])
  examType: string;

  @IsIn(['A1', 'A2', 'B1'])
  cefrLevel: string;
}

import { IsIn, IsNotEmpty } from 'class-validator';

export class CreateListeningDto {
  @IsIn(['A1', 'A2', 'B1'])
  cefrLevel: string;

  @IsIn(['dialogue', 'monologue', 'announcement', 'interview', 'radio'])
  scriptType: string;
}

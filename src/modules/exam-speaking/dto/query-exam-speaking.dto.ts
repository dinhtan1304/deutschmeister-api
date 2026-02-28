import { IsOptional, IsIn, IsNumberString } from 'class-validator';

export class QueryExamSpeakingDto {
  @IsOptional() @IsNumberString() page?: number;
  @IsOptional() @IsNumberString() limit?: number;
  @IsOptional() @IsIn(['DRAFT', 'GRADING', 'GRADED', 'ERROR']) status?: string;
  @IsOptional() @IsIn(['GOETHE', 'TELC']) examType?: string;
  @IsOptional() @IsIn(['A1', 'A2', 'B1']) cefrLevel?: string;
}

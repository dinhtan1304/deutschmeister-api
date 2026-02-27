import { IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitReadingDto {
  @ApiProperty({
    description: 'Câu trả lời của user: { questionId: answerId }',
    example: { q1: 'a', q2: 'true', q3: 'b', q4: 'c', q5: 'false' },
  })
  @IsObject()
  userAnswers: Record<string, string>;
}

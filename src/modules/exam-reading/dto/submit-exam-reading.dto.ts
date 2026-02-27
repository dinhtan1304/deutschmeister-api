import { IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitExamReadingDto {
  @ApiProperty({
    description: 'Câu trả lời per-Teil: { "teil_1": { "q1": "richtig", "q2": "falsch" }, "teil_2": { "q1": "a" } }',
    example: { teil_1: { q1: 'richtig', q2: 'falsch' } },
  })
  @IsObject()
  userAnswers: Record<string, Record<string, string>>;
}

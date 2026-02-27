import { IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitExamWritingDto {
  @ApiProperty({
    description: 'Bài viết per-Teil: { "teil_1": "...", "teil_2": "..." }',
    example: { teil_1: 'Liebe Anna, ich schreibe dir...' },
  })
  @IsObject()
  userTexts: Record<string, string>;
}

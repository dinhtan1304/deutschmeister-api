import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitWritingDto {
  @ApiProperty({
    description: 'Bài viết của người dùng',
    example: 'Liebe Anna, ich habe eine neue Wohnung gefunden...',
  })
  @IsString()
  @MinLength(5, { message: 'Bài viết phải có ít nhất 5 ký tự' })
  @MaxLength(5000, { message: 'Bài viết không được quá 5000 ký tự' })
  userText: string;
}

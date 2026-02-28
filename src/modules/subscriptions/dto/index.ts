import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RequestUpgradeDto {
  @ApiProperty({ enum: ['monthly', 'yearly'] })
  @IsIn(['monthly', 'yearly'])
  period: 'monthly' | 'yearly';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;
}

export class AdminGrantDto {
  @ApiProperty({ enum: ['monthly', 'yearly', 'lifetime'] })
  @IsIn(['monthly', 'yearly', 'lifetime'])
  period: 'monthly' | 'yearly' | 'lifetime';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;
}

export class AdminConfirmPaymentDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;
}

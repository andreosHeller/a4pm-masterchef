import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty() @IsString() @IsNotEmpty() @MaxLength(100) login!: string;
  @ApiProperty() @IsString() @IsNotEmpty() @MaxLength(100) senha!: string;
}

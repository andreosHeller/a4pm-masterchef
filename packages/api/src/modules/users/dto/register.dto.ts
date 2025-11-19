import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty() @IsString() @IsNotEmpty() @MaxLength(100) nome!: string;
  @ApiProperty() @IsString() @IsNotEmpty() @MaxLength(100) login!: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  senha!: string;
}

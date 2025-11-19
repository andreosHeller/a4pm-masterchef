import { ApiProperty } from '@nestjs/swagger';

export class PublicUserDto {
  @ApiProperty() id!: number;
  @ApiProperty({ nullable: true }) nome!: string | null;
  @ApiProperty() login!: string;
}

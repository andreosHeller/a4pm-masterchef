import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateRecipeDto {
  @ApiProperty({ description: 'Owner user id' })
  @IsInt()
  @Min(1)
  id_usuarios!: number;

  @ApiPropertyOptional({ description: 'Category id' })
  @IsOptional()
  @IsInt()
  @Min(1)
  id_categorias?: number | null;

  @ApiPropertyOptional({ maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nome?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  tempo_preparo_minutos?: number | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ingredientes?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  modo_preparo?: string | null;
}

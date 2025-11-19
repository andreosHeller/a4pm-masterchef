import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import type { TransformFnParams } from 'class-transformer';

const toOptionalInt = ({ value }: TransformFnParams): number | undefined => {
  if (value === '' || value == null) return undefined;
  const n = Number(value);
  if (!Number.isFinite(n)) return undefined;
  return Math.trunc(n);
};

const toOptionalString = ({ value }: TransformFnParams): string | undefined => {
  if (value === '' || value == null) return undefined;
  return String(value);
};

export class ListQueryDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Transform(toOptionalInt)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ default: 10, maximum: 10 })
  @IsOptional()
  @Transform(toOptionalInt)
  @IsInt()
  @Min(1)
  @Max(10)
  limit?: number;

  @ApiPropertyOptional({
    enum: ['nome', 'criado_em', 'alterado_em'],
    default: 'criado_em',
  })
  @IsOptional()
  @IsIn(['nome', 'criado_em', 'alterado_em'])
  sort?: 'nome' | 'criado_em' | 'alterado_em';

  @ApiPropertyOptional({ enum: ['asc', 'desc'], default: 'desc' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @ApiPropertyOptional({ description: 'Search term' })
  @IsOptional()
  @Transform(toOptionalString)
  @IsString()
  q?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(toOptionalInt)
  @IsInt()
  @Min(1)
  categoriaId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(toOptionalInt)
  @IsInt()
  @Min(1)
  usuarioId?: number;
}

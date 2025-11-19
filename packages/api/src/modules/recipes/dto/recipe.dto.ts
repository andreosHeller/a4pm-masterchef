import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RecipeDto {
  @ApiProperty() id!: number;
  @ApiProperty() id_usuarios!: number;
  @ApiPropertyOptional() id_categorias!: number | null;
  @ApiPropertyOptional() nome!: string | null;
  @ApiPropertyOptional() tempo_preparo_minutos!: number | null;
  @ApiPropertyOptional() ingredientes!: string | null;
  @ApiPropertyOptional() modo_preparo!: string | null;
  @ApiProperty() criado_em!: Date;
  @ApiProperty() alterado_em!: Date;
}

export class PaginatedRecipesDto {
  @ApiProperty({ type: [RecipeDto] }) data!: RecipeDto[];
  @ApiProperty({
    example: { page: 1, limit: 10, total: 2, pages: 1 },
  })
  meta!: { page: number; limit: number; total: number; pages: number };
}

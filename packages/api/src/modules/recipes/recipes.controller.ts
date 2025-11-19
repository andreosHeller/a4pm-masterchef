import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOkResponse, /* ApiQuery, */ ApiTags } from '@nestjs/swagger';
import { RecipesService } from './recipes.service';
import PDFDocument from 'pdfkit';
import type { Response } from 'express';
import { renderRecipe } from '../../utils/recipeRender';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { ListQueryDto } from './dto/list-query.dto';
import { PaginatedRecipesDto, RecipeDto } from './dto/recipe.dto';

@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly svc: RecipesService) {}

  @Get()
  @ApiOkResponse({ type: PaginatedRecipesDto })
  async list(@Query() q: ListQueryDto) {
    return this.svc.list(q);
  }

  @Get(':id')
  @ApiOkResponse({ type: RecipeDto })
  async get(@Param('id') id: string) {
    return this.svc.get(Number(id));
  }

  @Post()
  @ApiOkResponse({ type: RecipeDto })
  async create(@Body() body: CreateRecipeDto) {
    return this.svc.create(body as any);
  }

  @Put(':id')
  @ApiOkResponse({ type: RecipeDto })
  async update(@Param('id') id: string, @Body() body: UpdateRecipeDto) {
    return this.svc.update(Number(id), body as any);
  }

  @Delete(':id')
  @ApiOkResponse({ schema: { example: { ok: true } } })
  async remove(@Param('id') id: string) {
    return this.svc.remove(Number(id));
  }

  @Get(':id/print')
  @ApiOkResponse({ description: 'PDF stream' })
  async print(@Param('id') id: string, @Res() res: Response) {
    const receita = await this.svc.get(Number(id));
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="recipe-${id}.pdf"`);
    doc.pipe(res);
    renderRecipe(doc, receita);
    doc.end();
  }
}

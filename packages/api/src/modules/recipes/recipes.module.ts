import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Receita } from '../../database/models/receita.model';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';

@Module({
  imports: [SequelizeModule.forFeature([Receita])],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}

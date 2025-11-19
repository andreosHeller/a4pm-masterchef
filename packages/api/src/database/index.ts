import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from './models/usuario.model';
import { Categoria } from './models/categoria.model';
import { Receita } from './models/receita.model';

export const DatabaseModels = [Usuario, Categoria, Receita];
export const DatabaseModule = SequelizeModule.forFeature(DatabaseModels);

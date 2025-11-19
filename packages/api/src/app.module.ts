import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from './database/models/usuario.model';
import { Categoria } from './database/models/categoria.model';
import { Receita } from './database/models/receita.model';

import { UsersModule } from './modules/users/users.module';
import { RecipesModule } from './modules/recipes/recipes.module';

console.log(
  '[DB cfg]',
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_NAME,
);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        models: [Usuario, Categoria, Receita],
        autoLoadModels: false,
        synchronize: false,
        logging: false,
      }),
    }),
    UsersModule,
    RecipesModule,
  ],
})
export class AppModule {}

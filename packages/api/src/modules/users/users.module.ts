import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Usuario } from '../../database/models/usuario.model';

@Module({
  imports: [SequelizeModule.forFeature([Usuario])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

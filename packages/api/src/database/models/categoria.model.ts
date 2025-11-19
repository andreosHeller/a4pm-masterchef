import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  HasMany,
} from 'sequelize-typescript';
import { Receita } from './receita.model';

@Table({ tableName: 'categorias', timestamps: false, underscored: true })
export class Categoria extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  declare id: number;

  @Unique('nome_UNIQUE')
  @AllowNull(true)
  @Column(DataType.STRING(100))
  declare nome: string | null;

  @HasMany(() => Receita, { foreignKey: 'id_categorias' })
  declare receitas?: Receita[];
}

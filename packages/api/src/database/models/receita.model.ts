import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Usuario } from './usuario.model';
import { Categoria } from './categoria.model';

@Table({ tableName: 'receitas', timestamps: false, underscored: true })
export class Receita extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  declare id: number;

  @ForeignKey(() => Usuario)
  @AllowNull(false)
  @Column(DataType.INTEGER.UNSIGNED)
  declare id_usuarios: number;

  @BelongsTo(() => Usuario)
  declare usuario?: Usuario;

  @ForeignKey(() => Categoria)
  @AllowNull(true)
  @Column(DataType.INTEGER.UNSIGNED)
  declare id_categorias: number | null;

  @BelongsTo(() => Categoria)
  declare categoria?: Categoria;

  @AllowNull(true)
  @Column(DataType.STRING(100))
  declare nome: string | null;

  @AllowNull(true)
  @Column(DataType.INTEGER.UNSIGNED)
  declare tempo_preparo_minutos: number | null;

  @AllowNull(true)
  @Column(DataType.TEXT)
  declare ingredientes: string | null;

  @AllowNull(true)
  @Column(DataType.TEXT)
  declare modo_preparo: string | null;

  @AllowNull(false)
  @Column(DataType.DATE)
  declare criado_em: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  declare alterado_em: Date;
}

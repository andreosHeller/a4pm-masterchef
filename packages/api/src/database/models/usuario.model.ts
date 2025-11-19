import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
} from 'sequelize-typescript';

@Table({ tableName: 'usuarios', timestamps: false, underscored: true })
export class Usuario extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  declare id: number;

  @AllowNull(true)
  @Column(DataType.STRING(100))
  declare nome: string | null;

  @Unique('login_UNIQUE')
  @AllowNull(false)
  @Column(DataType.STRING(100))
  declare login: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  declare senha: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  declare criado_em: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  declare alterado_em: Date;
}

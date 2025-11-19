require('dotenv').config();
const base = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'teste_receitas_rg_sistemas',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  dialect: 'mysql',
  dialectOptions: { multipleStatements: false },
  define: { underscored: true, freezeTableName: true }
};
module.exports = {
  development: base,
  test: { ...base, database: (process.env.DB_NAME_TEST || (base.database + '_test')) },
  production: base
};
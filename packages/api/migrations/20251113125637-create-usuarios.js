'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true, allowNull: false },
      nome: { type: Sequelize.STRING(100), allowNull: true },
      login: { type: Sequelize.STRING(100), allowNull: false },
      senha: { type: Sequelize.STRING(100), allowNull: false },
      criado_em: { type: Sequelize.DATE, allowNull: false },
      alterado_em: { type: Sequelize.DATE, allowNull: false }
    }, { engine: 'InnoDB' });
    await queryInterface.addIndex('usuarios', { fields: ['login'], unique: true, name: 'login_UNIQUE' });
  },
  down: async (queryInterface) => { await queryInterface.dropTable('usuarios'); }
};

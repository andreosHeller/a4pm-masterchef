'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categorias', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true, allowNull: false },
      nome: { type: Sequelize.STRING(100), allowNull: true }
    }, { engine: 'InnoDB' });
    await queryInterface.addIndex('categorias', { fields: ['nome'], unique: true, name: 'nome_UNIQUE' });
  },
  down: async (queryInterface) => { await queryInterface.dropTable('categorias'); }
};

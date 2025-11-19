'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('receitas', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true, allowNull: false },
      id_usuarios: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
      id_categorias: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
      nome: { type: Sequelize.STRING(100), allowNull: true },
      tempo_preparo_minutos: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
      ingredientes: { type: Sequelize.TEXT, allowNull: true },
      modo_preparo: { type: Sequelize.TEXT, allowNull: true },
      criado_em: { type: Sequelize.DATE, allowNull: false },
      alterado_em: { type: Sequelize.DATE, allowNull: false }
    }, { engine: 'InnoDB' });

    await queryInterface.addIndex('receitas', { fields: ['id_usuarios'], name: 'fk_receitas_1_idx' });
    await queryInterface.addIndex('receitas', { fields: ['id_categorias'], name: 'fk_receitas_2_idx' });

    await queryInterface.addConstraint('receitas', {
      type: 'foreign key',
      fields: ['id_usuarios'],
      name: 'fk_receitas_1',
      references: { table: 'usuarios', field: 'id' },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('receitas', {
      type: 'foreign key',
      fields: ['id_categorias'],
      name: 'fk_receitas_2',
      references: { table: 'categorias', field: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.sequelize.query('ALTER TABLE receitas ADD FULLTEXT ft_nome (nome)');
    await queryInterface.sequelize.query('ALTER TABLE receitas ADD FULLTEXT ft_ingredientes (ingredientes)');
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('receitas');
  }
};

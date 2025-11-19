'use strict';
module.exports = {
  up: async (qi) => {
    const rows = [
      'Bolos e tortas',
      'Carnes',
      'Aves',
      'Peixes e frutos do mar',
      'Saladas e molhos',
      'Sopas',
      'Massas',
      'Bebidas',
      'Doces e sobremesas',
      'Lanches',
      'Alimentação Saudável'
    ].map((nome, i) => ({ id: i+2, nome }));
    
    await qi.bulkInsert('categorias', [{ id: 1, nome: 'Sem categoria' }, ...rows], { ignoreDuplicates: true });
  },
  down: async (qi) => { await qi.bulkDelete('categorias', null, {}); }
};
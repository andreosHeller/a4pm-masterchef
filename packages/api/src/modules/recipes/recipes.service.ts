import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Receita } from '../../database/models/receita.model';
import { FindOptions, Op, literal, WhereOptions, Order } from 'sequelize';

type ListQuery = {
  page?: number;
  limit?: number;
  sort?: 'nome' | 'criado_em' | 'alterado_em';
  order?: 'asc' | 'desc';
  q?: string;
  categoriaId?: number | null;
  usuarioId?: number | null;
};

@Injectable()
export class RecipesService {
  constructor(@InjectModel(Receita) private recipes: typeof Receita) {}

  async list(params: ListQuery) {
    const page = Math.max(1, Number(params.page) || 1);
    const limit = Math.min(10, Math.max(1, Number(params.limit) || 10));
    const offset = (page - 1) * limit;

    const sortCol = (params.sort || 'criado_em') as string;
    const sortOrder = (params.order || 'desc').toUpperCase() as 'ASC' | 'DESC';
    const order: Order = [[sortCol, sortOrder]];

    let where: WhereOptions = {};
    if (params.categoriaId != null)
      where = { ...where, id_categorias: params.categoriaId };
    if (params.usuarioId != null)
      where = { ...where, id_usuarios: params.usuarioId };

    if (params.q && params.q.trim()) {
      const q = params.q.trim();

      where = {
        ...where,
        [Op.or]: [
          literal(
            `MATCH (nome) AGAINST (${this.recipes.sequelize?.escape(q)} IN NATURAL LANGUAGE MODE)`,
          ),
          { nome: { [Op.like]: `%${q}%` } },
          { ingredientes: { [Op.like]: `%${q}%` } },
        ],
      };
    }

    const findOpts: FindOptions = { where, limit, offset, order };
    const { rows, count } = await this.recipes.findAndCountAll(findOpts);

    return {
      data: rows,
      meta: { page, limit, total: count, pages: Math.ceil(count / limit) },
    };
  }

  async get(id: number) {
    const r = await this.recipes.findByPk(id);
    if (!r) throw new NotFoundException('recipe_not_found');
    return r;
  }

  async create(payload: Partial<Receita>) {
    const now = new Date();
    const r = await this.recipes.create({
      ...payload,
      criado_em: now,
      alterado_em: now,
    });
    return r;
  }

  async update(id: number, payload: Partial<Receita>) {
    const r = await this.get(id);
    await r.update({ ...payload, alterado_em: new Date() });
    return r;
  }

  async remove(id: number) {
    const r = await this.get(id);
    await r.destroy();
    return { ok: true };
  }
}

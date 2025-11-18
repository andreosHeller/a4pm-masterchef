import http from '../../api/http'

const clamp = (n, min, max) => Math.max(min, Math.min(max, n))
export default {
  async fetch({ commit }, params = {}) {
    const page = clamp(Number(params.page || 1), 1, 9999)
    const limit = clamp(Number(params.limit || 10), 1, 10)
    const sort = params.sort || 'criado_em'
    const order = params.order || 'desc'
    const q = (params.q || '').trim()
    const categoriaId = params.categoriaId
      ? Number(params.categoriaId)
      : undefined
    const usuarioId = params.usuarioId ? Number(params.usuarioId) : undefined

    const query = { page, limit, sort, order }
    if (q) query.q = q
    if (categoriaId) query.categoriaId = categoriaId
    if (usuarioId) query.usuarioId = usuarioId

    const { data } = await http.get('/recipes', { params: query })
    commit('SET_LIST', data)
    return data
  },
  async get({ commit }, id) {
    const { data } = await http.get(`/recipes/${id}`)
    commit('SET_CURRENT', data)
    return data
  },
  async create(_, payload) {
    const { data } = await http.post('/recipes', payload)
    return data
  },
  async update(_, { id, ...payload }) {
    const { data } = await http.put(`/recipes/${id}`, payload)
    return data
  },
  async remove(_, id) {
    const { data } = await http.delete(`/recipes/${id}`)
    return data
  },
}

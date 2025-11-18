import http from '../../api/http'

export default {
  async register({ commit }, { nome, login, senha }) {
    const { data } = await http.post('/users/register', { nome, login, senha })
    commit('SET_ME', data)
    return data
  },
  async login({ commit }, { login, senha }) {
    const { data } = await http.post('/users/login', { login, senha })
    commit('SET_ME', data)
    return data
  },
  logout({ commit }) {
    commit('SET_ME', null)
    return { ok: true }
  },
}

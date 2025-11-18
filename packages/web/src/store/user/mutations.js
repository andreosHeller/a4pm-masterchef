export default {
  SET_ME(state, payload) {
    // eslint-disable-next-line
    state.me = payload
    if (payload) localStorage.setItem('me', JSON.stringify(payload))
    else localStorage.removeItem('me')
  },
}

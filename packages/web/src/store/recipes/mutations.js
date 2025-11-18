export default {
  SET_LIST(state, { data, meta }) {
    state.list = data // eslint-disable-line
    state.meta = meta // eslint-disable-line
  },
  SET_CURRENT(state, r) {
    state.current = r // eslint-disable-line
  },
}

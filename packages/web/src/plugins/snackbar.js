import Vue from 'vue'

const state = Vue.observable({
  visible: false,
  text: '',
  color: 'warning', // vuetify theme color
  timeout: 4000,
  multiline: false,
  top: true,
  right: true,
})

const set = (opts = {}) => {
  const text = typeof opts === 'string' ? opts : opts.text
  Object.assign(state, {
    visible: true,
    text: text || state.text,
    color: opts.color || state.color,
    timeout: typeof opts.timeout === 'number' ? opts.timeout : state.timeout,
    multiline: !!opts.multiline,
    top: opts.top !== undefined ? !!opts.top : state.top,
    right: opts.right !== undefined ? !!opts.right : state.right,
  })
}

const api = {
  state,
  show: set,
  success: (text, opts = {}) => set({ text, color: 'success', ...opts }),
  info: (text, opts = {}) => set({ text, color: 'info', ...opts }),
  warn: (text, opts = {}) => set({ text, color: 'warning', ...opts }),
  error: (text, opts = {}) => set({ text, color: 'error', ...opts }),
  close: () => {
    state.visible = false
  },
}

export const snack = api

export default {
  install() {
    Vue.prototype.$snack = api
    Vue.mixin({
      computed: {
        $snackState() {
          return state
        },
      },
    })
  },
}

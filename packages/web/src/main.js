import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './translations'
import './assets/tailwind.css'
import '@mdi/font/css/materialdesignicons.css' //eslint-disable-line

import SnackPlugin from './plugins/snackbar'

Vue.use(SnackPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app')

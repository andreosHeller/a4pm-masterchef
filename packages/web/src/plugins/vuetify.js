import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        background: '#2C2C2C',
        primary: '#F59C00',
        secondary: '#F59C00',
        accent: '#F59C00',
        surface: '#2C2C2C',
        info: '#7BAAF7',
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#EF5350',
      },
    },
    options: { customProperties: true },
  },
})

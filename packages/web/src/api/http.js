import axios from 'axios'
import { snack } from '../plugins/snackbar'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE || 'http://localhost:3000',
  timeout: 10000,
})

http.interceptors.response.use(
  (r) => r,
  (err) => {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err.message ||
      'Erro de requisição'
    snack.error(msg, { timeout: 2000, center: true, bottom: true })
    return Promise.reject(err)
  },
)

export default http

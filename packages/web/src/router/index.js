import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/RecipeList.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import RecipeForm from '../views/RecipeForm.vue'
import RecipeView from '../views/RecipeView.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login, meta: { public: true } },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { public: true },
  },
  { path: '/', name: 'home', component: Home, meta: { requiresAuth: true } },
  { path: '/recipes/new', component: RecipeForm, meta: { requiresAuth: true } },
  {
    path: '/recipes/:id/edit',
    component: RecipeForm,
    meta: { requiresAuth: true },
  },
  { path: '/recipes/:id', component: RecipeView, meta: { requiresAuth: true } },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, _from, next) => {
  const isLogged = store.getters['user/isLogged']
  const isPublic = to.matched.some((r) => r.meta.public)
  const needsAuth = to.matched.some((r) => r.meta.requiresAuth)

  if (needsAuth && !isLogged) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (
    isPublic &&
    isLogged &&
    (to.name === 'login' || to.name === 'register')
  ) {
    next({ name: 'home' })
  } else {
    next()
  }
})
export default router

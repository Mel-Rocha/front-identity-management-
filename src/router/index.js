import { createRouter, createWebHistory } from 'vue-router'

// Import das páginas
import Login from '@/pages/login.vue'
import Dashboard from '@/pages/dashboard.vue' // ajuste caso o caminho seja diferente

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }, // se quiser adicionar proteção
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Guard para rotas privadas (opcional)
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    return next({ name: 'Login' })
  }
  next()
})

export default router

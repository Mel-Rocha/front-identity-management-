import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes' // seu arquivo de rotas
import { getToken } from '@/services/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


// Guard global
router.beforeEach((to, from, next) => {
  const token = getToken()

  if (to.meta.requiresAuth && !token) {
    // rota privada, mas não tem token -> redireciona para login
    return next({ name: 'Login' })
  }

  // rota pública ou token presente -> continua
  next()
})

export default router

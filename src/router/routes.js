// src/router/routes.js
import Login from '@/pages/login.vue'
import Dashboard from '@/pages/dashboard.vue'

export const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  // você pode adicionar mais rotas: registro, perfil, etc.
]

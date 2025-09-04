// router/routes.js
import Login from '@/pages/login.vue'
import Dashboard from '@/pages/dashboard.vue'

export const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/', name: 'Dashboard', component: Dashboard },
]

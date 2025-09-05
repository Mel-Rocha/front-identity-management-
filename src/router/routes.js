// src/router/routes.js
import Login from '@/pages/login.vue'
import Dashboard from '@/pages/dashboard.vue'
import Register from '@/pages/register.vue'
import Account from '@/views/pages/account-settings/AccountSettingsAccount.vue'

export const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/account-setting', name: 'AccountSettings', component: Account, meta: { requiresAuth: true } },
]
// src/router/routes.js
import Login from '@/pages/login.vue'
import Dashboard from '@/pages/dashboard.vue'
import Register from '@/pages/register.vue'
import Account from '@/views/pages/account-settings/AccountSettingsAccount.vue'
import UserList from "@/views/pages/account-settings/UserList.vue";

export const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
    {
  path: '/',
  component: () => import('@/layouts/default.vue'), // ou DefaultLayoutWithVerticalNav.vue
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/pages/dashboard.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: 'account-settings',
      name: 'AccountSettings',
      component: () => import('@/views/pages/account-settings/AccountSettingsAccount.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: 'users-list',
      name: 'UsersList',
      component: () => import('@/views/pages/account-settings/UserList.vue'),
      meta: { requiresAuth: true },
    },
  ],
}
]
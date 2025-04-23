import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import Settings from '@/views/Settings.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AboutView',
      component: () => import('../views/AboutView.vue'),

    },

    { path: '/configuracoes',
      name: 'Settings',
      component: () => import('../views/Settings.vue'),
    },
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/index.vue'),
    children: [
      {
        path: 'home',
        name: 'Página Inicial',
        component: () => import('../views/pages/PageInit.vue')
      },
      {
        path: 'registration',
        name: 'Novo Registro',
        component: () => import('../views/pages/NewRegistre.vue')
      },
      {
        path: 'report',
        name: 'Relatório',
        component: () => import('../views/pages/Reports.vue')
      },
      {
        path: 'settings',
        name: 'Configurações',
        component: () => import('../views/pages/Settings.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path === '/') {
    next('home');
  } else {
    next();
  }
})

export default router

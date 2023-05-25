import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import CreateAccount from '../views/AccountView.vue'
import AvaliacaoView from '../views/AvaliacaoView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: AvaliacaoView
  },
  {
    path: '/DashboardView',
    name: 'Dashboard',
    component: DashboardView,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/DashboardView.vue')
  },{
    path: '/avaliacao',
    name: 'Avaliação de historias',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AvaliacaoView.vue')
  },
  {
    path: '/Account',
    name: 'Create Account',
    component: CreateAccount
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

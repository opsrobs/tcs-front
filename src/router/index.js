import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import CreateAccount from '../views/AccountView.vue'
import AvaliationView from '../views/AvaliationView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: AvaliationView
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
    component: () => import(/* webpackChunkName: "about" */ '../views/AvaliationView.vue')
  },
  {
    path: '/Detalhes',
    name: 'Detalhes de prompt', 
    component: () => import(/* webpackChunkName: "about" */ '../views/InstructionsPromptView.vue')
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

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/logoff/',
    name: 'logoff',
    component: () => import(/* webpackChunkName: "logoff" */ '../views/Logoff.vue')
  },
  {
    path: '/resview/',
    name: 'resview',
    component: () => import(/* webpackChunkName: "logoff" */ '../views/ResView.vue')
  },
  {
    path: '/restable/',
    name: 'restable',
    component: () => import(/* webpackChunkName: "logoff" */ '../views/ResTable.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

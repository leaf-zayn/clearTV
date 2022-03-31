import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import(/* webpackChunkName: "about" */ '../views/Welcome.vue')
  },
  {
    path: '/mainMenu',
    name: 'mainMenu',
    component: () => import(/* webpackChunkName: "about" */ '../views/mainMenu.vue')
  },
  {
    path: '/movies',
    name: 'movies',
    component: () => import(/* webpackChunkName: "about" */ '../views/movies.vue')
  },
  {
    path: '/mainMenu/secondMenu',
    name: 'secondMenu',
    component: () => import(/* webpackChunkName: "about" */ '../views/secondMenu.vue')
  },
  {
    path: '/music',
    name: 'music',
    component: () => import(/* webpackChunkName: "about" */ '../views/music.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

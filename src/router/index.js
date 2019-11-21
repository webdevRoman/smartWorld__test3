import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../components/Login.vue'
// import Store from '../store/index'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login
  // }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

// function AuthGuard(from, to, next) {
//   if (Store.getters.isUserAuthenticated)
//     next()
//   else

// }
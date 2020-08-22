import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

const Login = () => import('@/views/auth/Login')
const Dashboard = () => import('@/views/dashboard/Index')
const Monitor = () => import('@/views/dashboard/Monitor')
const Layout = () => import('@/views/layout/App')

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        path: '/dashboard',
        name: 'home',
        component: Dashboard
      },
      {
        path: '/monit',
        name: 'monit',
        component: Monitor
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('CLEAR_ERROR')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let auth = store.getters.isAuth
    if(!auth) {
      store.commit('SET_LOAD_PAGE', true)
      next({ name: 'login' })
    } else {
      store.commit('SET_LOAD_PAGE', true)
      next()
    }
  } else {
    store.commit('SET_LOAD_PAGE', true)
    next()
  }

})

router.afterEach(() => {
  store.commit('SET_LOAD_PAGE', false)
  store.commit('SET_LOADING', false)
})

export default router
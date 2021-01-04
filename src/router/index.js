import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  // 重定向，访问主页直接跳转到登录
  { path: '/', redirect: '/login' },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})

// 挂在路由导航守卫，防止用户不登录直接访问其他页面
router.beforeEach((to, from, next) => {
  // to将要访问的路径，form代表从哪个路径跳转而来 next是一个函数，表示放行，next()放行，next('/login')强制跳转
  // 如果用户访问的登录页，直接放行
  if (to.path === '/login') return next()
  // 从 sessionStorage 中获取到 保存的 token 值
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token，强制跳转到登录页
  if (!tokenStr) return next('/login')
  next()
 })
export default router

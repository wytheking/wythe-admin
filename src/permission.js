import router from '@/router'
import store from '@/store'

// 路由白名单
const whiteList = ['/login', '/404']

/**
 * 路由前置守卫
 * @param {*} to 要去哪
 * @param {*} from 从哪来
 * @param {*} next 是否要去
 */
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    // 1、用户已登录，则不允许进入 login
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 2、用户未登录，只允许进入 login
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

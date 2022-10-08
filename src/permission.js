import router from '@/router'
import store from './store'

// 白名单
const whiteList = ['/login', '/404']

/*
 * 路由前置守卫
 * @param {*} to 要去哪
 * @param {*} from 从哪来
 * @param {*} next 是否要去
 */
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // 1、用户已登录，则不允许进入 login
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户信息，如果不存在获取用户信息
      if (!store.getters.hasUserInfo) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 2、用户未登录，则只允许进入 login
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})

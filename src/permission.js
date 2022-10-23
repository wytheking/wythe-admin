import router from '@/router'
import store from './store'
import { generateTitle } from '@/utils/i18n'

// 白名单
const whiteList = ['/login']

/*
 * 路由前置守卫
 * @param {*} to 要去哪
 * @param {*} from 从哪来
 * @param {*} next 是否要去
 */
router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    const main = 'wythe-admin'
    const center = ' | '
    const title = to.meta.title
    document.title = generateTitle(title) + center + main
  }
  if (store.getters.token) {
    // 1、用户已登录，则不允许进入 login
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户信息，如果不存在获取用户信息
      if (!store.getters.hasUserInfo) {
        // 触发获取用户信息的 action，并获取用户当前权限
        const { permission } = await store.dispatch('user/getUserInfo')
        console.log(permission)
        // 处理用户权限，筛选出需要添加的权限
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        // 利用 addRoute 循环添加
        filterRoutes.forEach((item) => {
          router.addRoute(item)
        })
        // 添加完动态路由之后，需要在进行一次主动跳转
        return next(to.path)
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

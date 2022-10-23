import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import { publicRoutes } from '@/router/publicRoutes'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: publicRoutes
})

/**
 * 初始化路由表
 */
export function resetRouter () {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((menu) => {
      router.removeRoute(menu)
    })
  }
}

export default router

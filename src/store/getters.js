import variables from '@/styles/variables.modules.scss'

// store state 快捷访问
const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  /**
   * 判断用户信息是否存在
   * @param {*} state
   * @returns true 表示用户信息存在
   */
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  // 动态css快捷访问
  cssVar: state => variables,
  sidebarOpened: state => state.app.sidebarOpened,
  language: state => state.app.language
}

export default getters

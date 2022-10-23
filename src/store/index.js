import { createStore } from 'vuex'
import app from './modules/app'
import user from './modules/user'
import theme from './modules/theme'
import getters from './getters'
import permission from './modules/permission'

export default createStore({
  getters,
  modules: {
    app,
    user,
    theme,
    permission
  }
})

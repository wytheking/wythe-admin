import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { isCheckTimeout } from '@/utils/auth'
import md5 from 'md5'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const { icode, time } = getTestICode()
    config.headers.icode = icode
    config.headers.codeType = time
    // 设置token
    if (store.getters.token) {
      // 判断token是否过期 登录超时
      if (isCheckTimeout()) {
        // 退出
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 配置接口国际化
    config.headers['Accept-Language'] = store.getters.language
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data
    // if (code === 401) {
    //   store.dispatch('user/login')
    // }
    // 需要判断当前请求是否成功
    if (success) {
      return data
    } else {
      // 失败（请求成功，业务失败），消息提示
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  // 请求失败
  error => {
    // token 过期
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // 退出
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message)
    return Promise.reject(new Error(error.message))
  }
)

/**
 * 返回 Icode 的实现
 */
function getTestICode () {
  const now = parseInt(Date.now() / 1000)
  const code = now + 'LGD_Sunday-1991-12-30'
  return {
    icode: md5(code),
    time: now
  }
}

export default service

import axios from 'axios'
import { getToken } from './auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API + '/v1',
  timeout: 5000
})

// 请求拦截
service.interceptors.request.use(
  config => {
    const isToken = (config.headers || {}).isToken === false
    if (getToken() && !isToken) {
      config.headers.Authentication = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    return config
  }
)

export default service

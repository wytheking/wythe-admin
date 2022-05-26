import axios from 'axios'
import { getItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API + '/v1',
  timeout: 5000
})

// 请求拦截
service.interceptors.request.use(
  config => {
    const isToken = (config.headers || {}).isToken === false
    if (getItem(TOKEN) && !isToken) {
      config.headers.Authentication = 'Bearer ' + getItem(TOKEN) // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    return config
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const { status, data } = response
    // 需要判断当前请求是否成功
    if (status === 200) {
      // 成功返回解析后的数据
      return data
    } else {
      // 失败(请求成功，业务失败)，消息提示
      const { msg } = data
      ElMessage.error(msg)
      return Promise.reject(new Error(msg))
    }
  },
  error => {
    const { data } = error.response
    ElMessage.error(data.msg)
    return Promise.reject(data)
  }
)

export default service

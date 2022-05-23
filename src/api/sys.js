import service from '@/utils/request'

/**
 * 登录
 */
export const login = data => {
  return service({
    url: '/user/login',
    method: 'POST',
    data
  })
}

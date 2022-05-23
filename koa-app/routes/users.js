const Router = require('koa-router')
const UsersController = require('../config/controllers/users')

const router = new Router({
  prefix: '/api/v1'
})

/**
 * 用户接口
 */
// 用户注册
router.post('/user/register', UsersController.create)

// 用户登录
router.post('/user/login', UsersController.login)

// 获取用户
router.post('/user/query', UsersController.detail)

module.exports = router

const Router = require('koa-router')
const ArtileController = require('../config/controllers/article')

const router = new Router({
  prefix: '/api/v1'
})

/**
 * 文章接口
 */
// 创建文章
router.post('/article/create', ArtileController.create)

// 获取文章详情
router.post('/article/search', ArtileController.detail)

module.exports = router

const ArticleModel = require('../modules/article')

class articleController {
  /**
   * 创建文章
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async create (ctx) {
    // 接收客服端
    const req = ctx.request.body
    if (req.title && req.author && req.content && req.category) {
      try {
        console.log('ArticleModel', ArticleModel)
        // 创建文章模型
        const ret = await ArticleModel.createArticle(req)
        console.log('ret', ret)

        // 使用刚刚创建的文章ID查询文章详情，且返回文章详情信息
        const data = await ArticleModel.getArticleDetail({ id: ret.id })
        console.log('data', data)

        ctx.response.status = 200
        ctx.body = {
          code: 200,
          msg: '创建文章成功',
          data
        }
      } catch (err) {
        ctx.response.status = 412
        ctx.body = {
          code: 412,
          msg: '创建文章失败',
          data: err
        }
      }
    } else {
      ctx.response.status = 416
      ctx.body = {
        code: 200,
        msg: '参数不齐全'
      }
    }
  }

  /**
   * 获取文章详情
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async detail (ctx) {
    // let id = ctx.params.id; // 接受get方法参数
    const req = ctx.request.body
    if (req.id) {
      try {
        // 查询文章详情模型
        const data = await ArticleModel.getArticleDetail(req)
        ctx.response.status = 200
        ctx.body = {
          code: 200,
          msg: '查询成功',
          data
        }
      } catch (err) {
        ctx.response.status = 412
        ctx.body = {
          code: 412,
          msg: '查询失败',
          data: err
        }
      }
    } else {
      ctx.response.status = 416
      ctx.body = {
        code: 416,
        msg: '文章ID必须传'
      }
    }
  }
}

module.exports = articleController

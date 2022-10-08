const UsersModel = require('../modules/users')

// 引入jwt做token验证
const jwt = require('jsonwebtoken')

// 解析token
const tools = require('../../public/javascripts/tool')

// 统一设置token有效时间
const expireTime = '86400s' // 24小时

class usersController {
  /**
   * 用户注册
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async create (ctx) {
    // 接收客服端
    const req = ctx.request.body
    if (req.userName && req.password) {
      const user = await UsersModel.getUser(req.userName)
      if (user.userName) {
        ctx.response.status = 412
        ctx.body = {
          code: 412,
          msg: '用户名已存在'
        }
      } else {
        try {
          // 创建用户模型
          const ret = await UsersModel.createUser(req)
          // 使用刚刚创建的用户ID查询用户详情，且返回用户详情信息
          const data = await UsersModel.getUserInfo({ userId: ret.userId })
          ctx.response.status = 200
          ctx.body = {
            code: 200,
            msg: '用户注册成功',
            data
          }
        } catch (err) {
          ctx.response.status = 412
          ctx.body = {
            code: 412,
            msg: '用户注册失败',
            data: err
          }
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
   * 用户登录
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async login (ctx) {
    const req = ctx.request.body
    if (!req.userName || !req.password) {
      ctx.response.status = 500
      ctx.body = {
        code: '500',
        msg: '用户名或密码不能为空'
      }
    } else {
      try {
        const data = await UsersModel.getUser(req.userName)
        if (data.password === req.password) {
          // 生成token，验证登录有效期
          const token = jwt.sign({
            user: req.userName,
            password: req.password
          }, 'wy_the_admin', { expiresIn: expireTime })
          // const info = {
          //   createdAt: data.createdAt,
          //   updatedAt: data.updatedAt,
          //   userName: data.userName,
          //   userId: data.userId
          // }
          ctx.response.status = 200
          ctx.body = {
            code: '200',
            token: token,
            // userInfo: JSON.stringify(info),
            msg: '登陆成功'
          }
        } else {
          ctx.response.status = 403
          ctx.body = {
            code: '403',
            msg: '用户密码错误'
          }
        }
      } catch (err) {
        ctx.response.status = 412
        ctx.body = {
          code: '412',
          msg: '该用户尚未注册'
        }
      }
    }
  }

  /**
   * 获取用户详情
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async detail (ctx) {
    // let id = ctx.params.id; // 接受get方法参数
    const req = ctx.request.body
    const token = ctx.headers.authorization
    if (token) {
      if (req) {
        try {
          const result = await tools.verToken(token)
          console.log('token验证：', result)
          // 查询用户详情模型
          let data = null
          if (req.userId) {
            data = await UsersModel.getUserInfo(req.userId)
          } else if (req.userName) {
            data = await UsersModel.getUser(req.userName)
          } else {
            ctx.response.status = 416
            ctx.body = {
              code: 416,
              msg: '用户ID必须传'
            }
          }
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
          msg: '参数错误'
        }
      }
    } else {
      ctx.response.status = 401
      ctx.body = {
        code: 401,
        msg: '登陆过期，请重新登陆'
      }
    }
  }
}

module.exports = usersController

const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koajwt = require('koa-jwt')
const cors = require('koa-cors')

const article = require('./routes/article')
const users = require('./routes/users')

const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

// error handler
onerror(app)

// 跨域
app.use(cors())

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(resolve('./public')))

app.use(views(resolve('./public'), {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  // await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  return next().catch((err) => {
    console.log('错误：', err)
    if (err.status === 401) {
      ctx.response.status = 401
      ctx.body = {
        code: '401',
        msg: '登陆过期，请重新登陆'
      }
    } else {
      throw err
    }
  })
})

app.use(koajwt({
  secret: 'wy_the_admin'
}).unless({
  path: [/^\/api\/v1\/user\/register/, /^\/api\/v1\/user\/login/, /^\/favicon.ico/]
}))

// routes
app.use(article.routes(), article.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app

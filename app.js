const Koa = require('koa')
const app = new Koa()
// const views = require('koa-views')
const json = require('koa-json')
// const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const noauth = require('./routes/noAuth')
const api = require('./routes/api')

const jwt = require('koa-jwt')
const config = require('./config/index')
// error handler
// onerror(app)

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function(ctx, next) {
  return next().catch(err => {
    if (401 == err.status) {
      ctx.status = 401
      ctx.body = 'Protected resource, use Authorization header to get access\n'
    } else {
      throw err
    }
  })
})

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// app.use(
//   views(__dirname + '/views', {
//     extension: 'pug'
//   })
// )

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(
  jwt({secret: config.jwtsecret}).unless({path: [/^\/public/, /^\/noauth/]})
)
// routes
app.use(noauth.routes(), noauth.allowedMethods())
app.use(api.routes(), api.allowedMethods())

// // error-handling
// app.on('error', (err, ctx) => {
//   console.error('server error', err, ctx)
// })

module.exports = app

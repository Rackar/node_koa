const router = require('koa-router')()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config')

router.post('/login', async function(ctx, next) {
  let { username, password } = ctx.request.body
  let result = await User.findOne({ username, password })

  if (result) {
    let token = jwt.sign(
      {
        username, //payload部分可解密获取，不能放敏感信息
        userid: result._id
      },
      config.jwtsecret,
      {
        expiresIn: config.expiresIn // 授权时效1天
      }
    )
    ctx.body = {
      msg: '登录成功',
      token
    }
  } else {
    ctx.response.status = 401
    ctx.body = {
      msg: '登录失败',
      token: null
    }
  }
})

router.post('/signup', async function(ctx, next) {
  let { username, password } = ctx.request.body
  var user = await new User({
    username,
    password
  })
  user.save()
  ctx.body = {
    msg: '注册成功'
  }
})

module.exports = router

const router = require('koa-router')()
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const config = require('../../config')

router.post('/login', async function(ctx, next) {
  let {mobile, pwd} = ctx.request.body
  let result = await User.findOne({mobile, pwd})

  if (result) {
    
    let token = jwt.sign(
      {
        username:result.username, //payload部分可解密获取，不能放敏感信息
        userid: result.id,
        mobile
      },
      config.jwtsecret,
      {
        expiresIn: config.expiresIn // 授权时效1天
      }
    )
    let userData = {
      userid: result.id,
      username: result.username,
      mobile: result.mobile,
      token:'Bearer '+ token,
      liking: result.liking
    }
    ctx.body = {
      msg: '登录成功',
      data:userData ,
      status: 1,
    }
  } else {
    ctx.response.status = 401
    ctx.body = {
      msg: '登录失败',
      data: null,
      status: 0
    }
  }
})

router.post('/signup', async function(ctx, next) {
  let {username, pwd,mobile} = ctx.request.body
  let existUser = await User.find({mobile})
  if(existUser.length!==0) {
    ctx.response.status = 401
    ctx.body = {
      msg: '用户已存在',
      data: null,
      status: 0
    }
  }else{
    var user =  new User({
      username,
      pwd,mobile
    })
    await user.save()
    ctx.body = {
      msg: '注册成功'
    }
  }
  
})

module.exports = router

const router = require('koa-router')()
const Article = require('../models/article')
const users = require('./users')
router.prefix('/api')

router.get('/article', async function(ctx, next) {
  let result = await Article.find().then(resultArr => {
    return resultArr.map(obj => {
      return { content: obj.content, title: obj.title }
    })
  })
  ctx.body = result
})

router.post('/article', async function(ctx, next) {
  let body = ctx.request.body
  var article = await new Article({
    content: ctx.request.body.content,
    title: ctx.request.body.title
  })
  article.save()

  ctx.body = {
    msg: '新增成功'
  }
})
router.use(users.routes(), users.allowedMethods())

module.exports = router

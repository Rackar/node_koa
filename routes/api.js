const router = require('koa-router')()
const Article = require('../models/article')
router.prefix('/api')

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

module.exports = router

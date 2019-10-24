const router = require('koa-router')()
const Article = require('../models/article')
router.prefix('/api')

router.get('/', function(ctx, next) {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/article', async function(ctx, next) {
  let result = await Article.find({})
  console.log(result)
  ctx.body = result
})

router.post('/article', function(ctx, next) {
  var article = new Article({
    content: 'a',
    title: 'b'
  })
  article.save()

  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router

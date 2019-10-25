const router = require('koa-router')()
const Article = require('../models/article')
const users = require('./users')
router.prefix('/noauth')

router.get('/article', async function(ctx, next) {
  let result = await Article.find()
  // .then(resultArr => {
  //   return resultArr.map(obj => {
  //     return {content: obj.content, title: obj.title}
  //   })
  // })
  result = result.map(obj => {
    return {content: obj.content, title: obj.title}
  })
  ctx.body = result
})

router.use(users.routes(), users.allowedMethods())

module.exports = router

const router = require('koa-router')()
const Article = require('../models/article')
const users = require('./users/index')
const upload = require('./upload')
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

router.use(users.routes(), users.allowedMethods()) // /login  /signup
router.use(upload.routes(), upload.allowedMethods()) // /upload
module.exports = router

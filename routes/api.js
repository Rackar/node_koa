const multer = require('koa-multer')

const router = require('koa-router')()
const Article = require('../models/article')
router.prefix('/api')

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
    // cb(null, 'public/uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname)
  }
})
const upload = multer({storage: storage})

router.post('/image', upload.single('avatar'))
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

const router = require('koa-router')()
const multer = require('koa-multer')

router.prefix('/upload')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname)
  }
})
const upload = multer({storage: storage})

router.post('/image', upload.single('avatar'), function(ctx, next) {
  ctx.body = 'ok'
})

module.exports = router

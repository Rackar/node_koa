const router = require("koa-router")();
const multer = require("koa-multer");

// router.prefix("/upload");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post("/image", upload.single("file"), function (ctx, next) {
  let data = null, msg = '', status = 0
  let params = {}
  if (ctx.req.file) {
    data = {
      path: ctx.req.file.path,
      filename: ctx.req.file.filename,
      contentType: ctx.req.file.mimetype
    };
    params = ctx.req.body
    console.log(params, data)
    msg = "图片上传成功"
    status = 1
  } else {
    msg = "请使用POST方式form-data方式上传,文件key为file"
    status = 0
  }


  ctx.body = {
    status,
    msg,
    data
  };
});

// router.post('/image', upload.single('avatar').then((ctx, next) =>{
//   let data = {
//     path: ctx.request.file.path,
//     filename: ctx.request.file.filename,
//     contentType: ctx.request.file.mimetype
//   }

//   ctx.body ={
//     status: 1,
//     msg: '上传图片成功',
//     data: data
//   }
// }))

module.exports = router;

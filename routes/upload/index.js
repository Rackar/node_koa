const router = require("koa-router")();
const multer = require("koa-multer");
const fs = require('fs')

router.prefix("/upload");
const uploadDir="uploads/"

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage });

const exist= fs.existsSync(uploadDir)
if(!exist){
  fs.mkdirSync(uploadDir)
}

router.post("/image", upload.single("avatar"), function(ctx, next) {
  let data = {
    path: ctx.req.file.path,
    filename: ctx.req.file.filename,
    contentType: ctx.req.file.mimetype
  };

  ctx.body = {
    status: 1,
    msg: "上传图片成功",
    data: data
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

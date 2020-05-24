const router = require("koa-router")();
const multer = require("koa-multer");

router.prefix("/upload");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "/root/myapp/node_koa/uploads/");
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
// router.post("/upload", upload.single("file"), ctx => {
//   ctx.body = "上传成功"
// })
router.post("/image", upload.single("file"), function (ctx, next) {
  let data = {
    path: ctx.req.file.path,
    filename: ctx.req.file.filename,
    contentType: ctx.req.file.mimetype,
  };

  ctx.body = {
    status: 1,
    msg: "上传图片成功",
    data: data,
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

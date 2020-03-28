const multer = require("koa-multer");

const router = require("koa-router")();
const person = require("./api/person/index");
const star = require("./api/star/index");
const lianyue = require("./noauth/lianyue/addArticle");
const Article = require("../models/article");
router.prefix("/api");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
    // cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post("/image", upload.single("avatar"));
const axios = require('axios');

var addLink = async function (ctx, next) {
  // res.send('respond with a resource');
  let params = ctx.request.body;

  let url = params.url
    .split(/\n/)
    .filter(ele => ele !== "" && ele !== " ");
  let pass = params.pass;
  let gzlist = "ilianyue";
  let push = await axios.post("http://123.206.94.184:5000/add", { url, pass, gzlist });
  console.log(push.data);

  if (push.data == "ok") {
    ctx.body = {
      status: 1,
      msg: "文章发布成功"
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "文章发布失败"
    };
  }

};

router.post("/lianyue", addLink);

router.use(person.routes(), person.allowedMethods()); // /person
router.use(star.routes(), star.allowedMethods()); // /stars
// router.use(lianyue.routes(), lianyue.allowedMethods()); // /person
module.exports = router;

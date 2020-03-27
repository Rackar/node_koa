const router = require("koa-router")();

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
module.exports = router;

const router = require("koa-router")();
const axios = require("axios");

var addLink = async function (ctx, next) {
  // res.send('respond with a resource');
  let params = ctx.request.body;

  let url = params.url.split(/\n/).filter((ele) => ele !== "" && ele !== " ");
  let pass = params.pass;
  let gzlist = "ilianyue";
  let push = await axios.post("http://175.24.95.47:5003/add", {
    url,
    pass,
    gzlist,
  });
  console.log(push.data);

  if (push.data == "ok") {
    ctx.body = {
      status: 1,
      msg: "文章发布成功",
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "文章发布失败",
    };
  }
};

router.post("/lianyue", addLink);
module.exports = router;

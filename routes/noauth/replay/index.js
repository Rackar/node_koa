const router = require("koa-router")();
var Replay = require("../../../models/replay");
var add = async function (ctx, next) {
  // res.send('respond with a resource');
  let {url,submitter} = ctx.request.body;
  let exist = await Replay.findOne(
    {
      url
    }
  );
  if(exist){
    ctx.body = {
      status: 2,
      msg: "该记录已存在"
    };
    return
  }

  var replay = new Replay({url,submitter});
  await replay.save();

  ctx.body = {
    status: 1,
    msg: "录像增加成功",
  };
};

var total = async function(ctx, next) {
  // let id = ctx.params.id;
  let replays = await Replay.find();
  if (replays&&replays.length) {
    let data = replays.filter(obj => obj.url)
    ctx.body = {
      status: 1,
      data: data
    };
  }
};

router.get("/replays", total);
router.post("/replays", add);
module.exports = router;

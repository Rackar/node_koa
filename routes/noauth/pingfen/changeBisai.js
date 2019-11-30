var Bisai = require("../../../models/pingfen/bisai");
var ObjectID = require("mongodb").ObjectID;
var signup = async function(ctx, next) {
  var body = ctx.request.body;
  // var newid = new ObjectID()

  let { zhuban, title } = body;

  let first = await Bisai.findOne({});
  let _id = new ObjectID();
  if (first)
    // let _id = ObjectID("5ddb90b8d6f343e724488221");
    _id = first._id;
  // // let fl = new flow(obj);
  // // let result = await fl.save();
  let result = await Bisai.updateOne(
    { _id: _id },
    {
      $set: {
        zhuban: zhuban,
        title: title
      }
    },
    { upsert: true }
  );

  // let fl = new flow({
  //   cansaiId,
  //   huanjieId,
  //   _id
  // });
  // let result = await fl.save();
  if (result)
    ctx.body = {
      msg: "比赛变更成功",
      data: result,
      status: 1
    };
  else {
    ctx.response.status = 400;
    ctx.body = {
      msg: "请求失败",
      data: null,
      status: 2
    };
  }
};
module.exports = signup;

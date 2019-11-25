var flow = require("../../../models/pingfen/flow");
var ObjectID = require("mongodb").ObjectID;
var signup = async function(ctx, next) {
  var body = ctx.request.body;
  // var newid = new ObjectID()
  let _id = ObjectID("5ddb90b8d6f343e724488221");
  let { cansaiId, huanjieId } = body;

  // // let fl = new flow(obj);
  // // let result = await fl.save();
  let result = await flow.updateOne(
    { _id: _id },
    {
      $set: {
        cansaiId: cansaiId,
        huanjieId: huanjieId
      }
    }
  );

  // let fl = new flow({
  //   cansaiId,
  //   huanjieId,
  //   _id
  // });
  // let result = await fl.save();
  if (result)
    ctx.body = {
      msg: "环节变更成功",
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

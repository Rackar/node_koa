var flow = require("../../../models/pingfen/flow");
var Record = require("../../../models/pingfen/record");
var ObjectID = require("mongodb").ObjectID;
var signup = async function(ctx, next) {
  var body = ctx.request.body;
  // var newid = new ObjectID()

  let { cansaiId, huanjieId, pingweiId, fenshu } = body;

  let first = await flow.findOne({});
  if (first) {
    if (cansaiId == first.cansaiId && huanjieId == first.huanjieId) {
      //   let record = new Record({
      //     cansaiId,
      //     huanjieId,
      //     pingweiId,
      //     fenshu
      //   });
      //     let result = await record.save();
      let result = await Record.updateOne(
        { cansaiId, huanjieId, pingweiId },
        {
          $set: {
            cansaiId,
            huanjieId,
            pingweiId,
            fenshu
          }
        },
        { upsert: true }
      );
      if (result)
        ctx.body = {
          msg: "评分成功",
          data: result,
          status: 1
        };
    } else {
      ctx.response.status = 400;
      ctx.body = {
        msg: "未开始",
        data: null,
        status: 2
      };
    }
  } else {
    ctx.response.status = 400;
    ctx.body = {
      msg: "请求失败",
      data: null,
      status: 2
    };
  }
};
module.exports = signup;

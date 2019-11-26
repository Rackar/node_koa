var cansai = require("../../../models/pingfen/cansai");
var huanjie = require("../../../models/pingfen/huanjie");
var pingwei = require("../../../models/pingfen/pingwei");
var Flow = require("../../../models/pingfen/flow");
var Record = require("../../../models/pingfen/record");
var ObjectID = require("mongodb").ObjectID;
var user = async function(ctx, next) {
  let cs = await cansai.find();
  let hj = await huanjie.find();
  let pw = await pingwei.find();
  let flow = await Flow.find();
  let record = await Record.find();
  if (true) {
    ctx.body = {
      status: 1,
      msg: "获取点击最多人物列表成功",
      data: { cs, hj, pw, flow, record }
    };
  }
};
module.exports = user;

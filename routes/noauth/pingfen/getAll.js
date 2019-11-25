var cansai = require("../../../models/pingfen/cansai");
var huanjie = require("../../../models/pingfen/huanjie");
var pingwei = require("../../../models/pingfen/pingwei");
var Flow = require("../../../models/pingfen/flow");
var ObjectID = require("mongodb").ObjectID;
var user = async function(ctx, next) {
  var body = ctx.request.body;
  let cs = await cansai.find();
  let hj = await huanjie.find();
  let pw = await pingwei.find();
  let flow = await Flow.find();
  if (true) {
    ctx.body = {
      status: 1,
      msg: "获取点击最多人物列表成功",
      data: { cs, hj, pw, flow }
    };
  }
};
module.exports = user;

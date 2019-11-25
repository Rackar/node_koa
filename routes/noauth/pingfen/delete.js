var cansai = require("../../../models/pingfen/cansai");
var huanjie = require("../../../models/pingfen/huanjie");
var pingwei = require("../../../models/pingfen/pingwei");
var ObjectID = require("mongodb").ObjectID;
var user = async function(ctx, next) {
  var body = ctx.request.body;
  let result = null;
  if (body.type == "pw") {
    result = await pingwei.remove({
      _id: ObjectID(body._id)
    });
  } else if (body.type == "cs") {
    result = await cansai.remove({
      _id: ObjectID(body._id)
    });
  } else if (body.type == "hj") {
    result = await huanjie.remove({
      _id: ObjectID(body._id)
    });
  } else {
  }

  if (result) {
    ctx.body = {
      status: 1,
      msg: "删除成功",
      data: result
    };
  }
};
module.exports = user;

var Person = require("../../../models/person");
var ObjectID = require("mongodb").ObjectID;
var user = async function(ctx, next) {
  var body = ctx.request.body;
  let limitNum = body.limit ? body.limit : 8;
  let person = await Person.find()
    .sort({"count.watched": -1})
    .limit(limitNum);

  if (person.length) {
    ctx.body = {
      status: 1,
      msg: "获取点击最多人物列表成功",
      data: person
    };
  }
};
module.exports = user;

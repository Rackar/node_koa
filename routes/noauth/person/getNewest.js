var Person = require("../../../models/person");
var user = async function(ctx, next) {
  var body = ctx.request.body;
  let limitNum = body.limit ? body.limit : 8;
  let person = await Person.find()
    .sort({createdAt: -1})
    .limit(limitNum);

  if (person.length) {
    ctx.body = {
      status: 1,
      msg: "拉取最新人物列表成功",
      data: person
    };
  }
};
module.exports = user;

var Pingwei = require("../../../models/pingfen/pingwei");
var signup = async function(ctx, next) {
  var body = ctx.request.body;
  // var newid = new ObjectID()
  var regperson = new Pingwei({
    // _id: newid,
    name: body.name,
    username: body.username,
    password: body.password,
    avatar: body.avatar ? body.avatar : "person.png"
  });

  let result = await regperson.save();

  if (result)
    ctx.body = {
      msg: "新增人物成功",
      data: { id: result.id },
      status: 1
    };
  else {
    ctx.response.status = 400;
    ctx.body = {
      msg: "新增人物失败",
      data: null,
      status: 2
    };
  }
};
module.exports = signup;

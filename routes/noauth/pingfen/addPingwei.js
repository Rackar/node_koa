var Pingwei = require("../../../models/pingfen/pingwei");
var signup = async function(ctx, next) {
  var body = ctx.request.body;
  if (body.username === "" || body.password === "" || body.name === "") {
    ctx.response.status = 400;
    ctx.body = {
      msg: "评委信息不能为空，添加失败",
      data: null,
      status: 2
    };
    return;
  }

  let pw = await Pingwei.findOne({ username: body.username });
  if (pw) {
    ctx.response.status = 400;
    ctx.body = {
      msg: "评委用户名已存在，请更换",
      data: null,
      status: 2
    };
    return;
  }
  // var newid = new ObjectID()
  var regperson = new Pingwei({
    // _id: newid,
    name: body.name,
    username: body.username,
    password: body.password,
    pwtype: body.pwtype,
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

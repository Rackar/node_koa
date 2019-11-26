var flow = require("../../../models/pingfen/flow");
const jwt = require("jsonwebtoken");
const config = require("../../../config");

var ObjectID = require("mongodb").ObjectID;
var signup = async function(ctx, next) {
  var body = ctx.request.body;
  // var newid = new ObjectID()

  let { username, password } = body;

  let result = await flow.findOne({ username, password });
  if (result) {
    let token = jwt.sign(
      {
        username: result.username, //payload部分可解密获取，不能放敏感信息
        name: result.name
      },
      config.jwtsecret,
      {
        expiresIn: config.expiresIn // 授权时效1天
      }
    );
    let userData = {
      name: result.name,
      username: result.username,
      token: "Bearer " + token
    };
    ctx.body = {
      msg: "登录成功",
      data: userData,
      status: 1
    };
  } else {
    ctx.response.status = 401;
    ctx.body = {
      msg: "登录失败",
      data: null,
      status: 0
    };
  }
};
module.exports = signup;

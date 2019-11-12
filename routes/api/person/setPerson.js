var Person = require("../../../models/person");
var signup = async function(ctx, next) {
  let body = ctx.request.body;

  let person = await Person.findOne({
    _id: body._id,
    createrId: body.createrId
  });
  if (person) {
    let updataPerson = await Person.updateOne(
      {
        _id: body._id
      },
      {
        name: body.name,
        birthday: body.birthday,
        deathday: body.deathday,
        info: body.info,
        avatarfilePath: body.avatarfilePath ? body.avatarfilePath : "person.png"
      }
    );
    if (updataPerson)
      ctx.body = {
        msg: "编辑人物成功",

        status: 1
      };
    else {
      ctx.response.status = 400;
      ctx.body = {
        msg: "编辑人物失败",
        status: 2
      };
    }
  }
};
module.exports = signup;

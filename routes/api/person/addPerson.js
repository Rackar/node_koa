var Person = require("../../../models/person");
var signup = async function(ctx, next) {
  var body = ctx.request.body;
  // var newid = new ObjectID()
  var regperson = new Person({
    // _id: newid,
    name: body.name,
    birthday: body.birthday,
    deathday: body.deathday,
    info: body.info,
    avatarfilePath: body.avatarfilePath
      ? body.avatarfilePath
      : "default/person.png",
    createrId: body.createrId,
    articles: [],
    photo: [],
    liked: [],
    count: {
      followed: 1,
      following: 1,
      like: 1,
      liked: 1,
      articles: 1,
      words: 1
    }
  });

  let result = await regperson.save();
  // (function(err, content) {
  //   if (err) {
  //     // return res.send({
  //     //   status: 2,
  //     //   msg: err || '新增人物失败'
  //     // })
  //     ctx.response.status = 400
  //   ctx.body = {
  //     msg: err ||'新增人物失败',
  //     data: null,
  //     status: 2
  //   }
  //   } else {

  //     // let rebody={
  //     //   status: 1,
  //     //   msg: '新增人物成功',
  //     //   // id: newid
  //     // }
  //     ctx.response.status = 200
  //     ctx.body = {
  //       msg: err ||'新增人物成功',
  //       data: {id:content.id},
  //       status: 1
  //     }
  //   }
  // })
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

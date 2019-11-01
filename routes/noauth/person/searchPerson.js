var Person = require("../../../models/person");
var ObjectID = require("mongodb").ObjectID;
var user = async function(ctx, next) {
  var name = ctx.request.body.name;
  let person = await Person.find({
    name: { $regex: name }
  });
  if (person.length) {
    // await Person.updateOne(
    //   {
    //     _id: ObjectID(id)
    //   },
    //   {
    //     $inc: {
    //       "count.searched": 1
    //     }
    //   }
    // );

    ctx.body = {
      status: 1,
      msg: "拉取用户成功",
      data: person
    };
  }
};
module.exports = user;

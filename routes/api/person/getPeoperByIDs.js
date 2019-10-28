var Person = require("../../../models/person");
var ObjectID = require("mongodb").ObjectID;
var person = function(ctx, next) {
  var idArr = ctx.request.params.ids.map(sid => ObjectID(sid));

  Person.find(
    {
      _id: { $in: idArr }
    },
    function(err, body) {
      if (err || !body) {
        return res.send({
          status: 2,
          msg: err || "无此人物"
        });
      } else {
        let bodys = body;

        return res.send({
          status: 1,
          msg: "拉取系列集合成功",
          data: bodys
        });
      }
    }
  );
};
module.exports = person;

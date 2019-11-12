const router = require("koa-router")();
var User = require("../../../models/user");
router.prefix("/stars");
var add = async function(ctx, next) {
  // res.send('respond with a resource');
  let addStarsNum = ctx.request.body.stars;
  let id = ctx.state.user.userid;
  //   let user = await User.findOne({_id: id});

  let result = await User.updateOne(
    {
      _id: id
    },
    {
      $addToSet: {
        starsLogs: [addStarsNum]
      }
    }
  );
  if (result) {
    ctx.body = {
      status: 1,
      msg: "增加成功"
    };
  }
};

var total = async function(ctx, next) {
  // let id = ctx.params.id;
  let id = ctx.state.user.userid;
  let user = await User.findOne({_id: id});
  if (user) {
    let arr = user.starsLogs;
    var sum = arr.reduce((prev, next, index, array) => prev + next);
    ctx.body = {
      status: 1,
      msg: "星星总数",
      data: sum
    };
  }
};

router.post("/total", total);
router.post("/add", add);

const router = require("koa-router")();
var User = require("../../../models/user");
router.prefix("/stars");
var add = async function(ctx, next) {
  // res.send('respond with a resource');
  let addStarsNum = ctx.request.body.stars;
  let id = ctx.state.user.userid;
  console.log("add Stars: " + addStarsNum);
  //   let user = await User.findOne({_id: id});
  let log = {
    stars: addStarsNum,
    createdAt: Date.now()
  };

  let result = await User.updateOne(
    {
      _id: id
    },
    {
      $addToSet: {
        starsLogs: [log]
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
  let user = await User.findOne({ _id: id });
  if (user) {
    let arr = user.starsLogs;
    var sum = arr.length
      ? arr.reduce((prev, next, index, array) => {
          // console.log(prev);
          return { stars: prev.stars + next.stars };
        })
      : 0;
    let data = {
      stars: sum,
      real_name: user.username,
      history: arr
    };
    ctx.body = {
      status: 1,
      msg: "星星总数",
      data: data
    };
  }
};

router.post("/total", total);
router.post("/add", add);
module.exports = router;

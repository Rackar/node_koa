const router = require("koa-router")();
var Card = require("../../../models/card");

var add = async function (ctx, next) {
  // res.send('respond with a resource');
  let addCard = ctx.request.body.card;
  let id = ctx.state.user.userid;
  console.log("add card: " + addCard);
  // addCard.userid===id

  addCard.userid = id;
  var card = new Card(addCard);
  await card.save();

  ctx.body = {
    status: 1,
    msg: "卡片增加成功",
  };
};

var change = async function (ctx, next) {
  // res.send('respond with a resource');
  let changedCard = ctx.request.body.card;
  let id = ctx.state.user.userid;
  let detail=changedCard.changeMoney
  console.log("change card: " + changedCard.changeMoney);
  // addCard.userid===id

  let cardExist = await Card.findOne({
    _id: changedCard._id,
    userid: id,
  });
  if (cardExist) {
    let card = await Card.updateOne(
      {
        _id: changedCard._id,
      },
      {
        $addToSet: {
          log: [
            {
              detail: detail,
              changeDate: Date.now(),
            },
          ],
        },
      }
    );
    if (card)
      ctx.body = {
        msg: "编辑卡片成功",

        status: 1,
      };
    else {
      ctx.response.status = 400;
      ctx.body = {
        msg: "编辑卡片失败",
        status: 2,
      };
    }
  } else {
    ctx.body = {
      status: 2,
      msg: "未找到卡片",
    };
  }
};
var del = async function (ctx, next) {
  let id = ctx.query.id;
  // let addCard = ctx.request.body.card;
  let userid = ctx.state.user.userid;
  let cards = await Card.findOne({ userid: userid, _id: id });
  // addCard.userid===id
  if (cards) {
    var card = await Card.deleteOne({ _id: id });
    // await card.save();
    if (card) {
      ctx.body = {
        status: 1,
        msg: "卡片删除成功",
      };
    } else {
      ctx.body = {
        status: 2,
        msg: "卡片删除失败",
      };
    }
  }
};

var total = async function (ctx, next) {
  // let id = ctx.params.id;
  let id = ctx.state.user.userid;
  let cards = await Card.find({ userid: id });
  // if (cards) {
  ctx.body = {
    status: 1,
    msg: "全部卡片信息",
    data: cards,
  };
  // }
};

router.get("/cards", total);
router.post("/cards", add);
router.put("/cards", change);
router.delete("/cards", del);
module.exports = router;

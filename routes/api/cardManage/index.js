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
module.exports = router;

const router = require("koa-router")();
const BuyEvents = require("../../../models/BuyEvents");
const WrapEvents = require("../../../models/WrapEvents");
const Comment = require("../../../models/Comment");
router.prefix("/filoli");
const addComment = async function (ctx, next) {
  // res.send('respond with a resource');
  let comment = ctx.request.body.comment;
  let CommentModel = new Comment(comment)

  let result = await CommentModel.save()
  if (result) {
    ctx.body = {
      status: 1,
      msg: "增加成功"
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "增加失败"
    };
  }
};
const getComment = async function (ctx, next) {
  let id = ctx.query.id;
  let comments = await Comment.find(
    { dNFTid: id },
  );
  if (comments && comments.length) {
    ctx.body = {
      status: 1,
      msg: "已获取所有评论",
      data: comments
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "无数据",
      data: []
    };
  }
};
const dnfts = async function (ctx, next) {
  let dnfts = await WrapEvents.find();
  if (dnfts && dnfts.length) {
    let list = dnfts.map(de => {
      return {
        NFTCotract: de.returnValues.NFTCotract,
        NFTid: de.returnValues.NFTid,
        dNFTid: de.returnValues.dNFTid,
        Principal: de.returnValues.Principal,
        updatedAt: de.updatedAt
      }
    })

    ctx.body = {
      status: 1,
      msg: "已获取所有dNFT",
      data: list
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "无数据",
      data: []
    };
  }
};
const boughters = async function (ctx, next) {
  let id = ctx.query.id;
  let buyer = await BuyEvents.find(
    { "returnValues.dNFTid": id },
    // {
    //   "returnValues.$": 1
    // }
  );
  if (buyer && buyer.length) {
    let list = buyer.map(de => {
      return {
        Buyer: de.returnValues.Buyer,
        dNFTid: de.returnValues.dNFTid,
        amount: de.returnValues.amount,
        updatedAt: de.updatedAt
      }
    })

    ctx.body = {
      status: 1,
      msg: "已获取所有交易记录",
      data: list
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "无数据",
      data: []
    };
  }
};

router.get("/dnfts", dnfts);
router.get("/boughters", boughters);
router.get("/comments", getComment);
router.post("/comments", addComment);
module.exports = router;

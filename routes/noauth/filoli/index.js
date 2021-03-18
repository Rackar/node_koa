const router = require("koa-router")();
const web3 = require('web3');
const BuyEvents = require("../../../models/BuyEvents");
const WrapEvents = require("../../../models/WrapEvents");
const Comment = require("../../../models/Comment");
const NFT = require("../../../models/NFT");
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
  let uad = ctx.query.uad;
  let query = {}
  if (id) {
    query["returnValues.dNFTid"] = id
  }
  if (uad) {
    query["returnValues.Buyer"] = web3.utils.toChecksumAddress(uad)
  }
  let buyer = await BuyEvents.find(
    query,
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
const addNFT = async function (ctx, next) {
  let nft = ctx.request.body.nft;
  let NFTModel = new NFT(nft)

  let result = await NFTModel.save()
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
const getNFT = async function (ctx, next) {
  let id = ctx.query.id;
  let uad = ctx.query.uad;

  let result = await NFT.find(
    { id: id },
  );
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

router.get("/dnfts", dnfts);
router.get("/boughters", boughters);
router.get("/comments", getComment);
router.post("/comments", addComment);
router.post("/nfts", addNFT);
router.get("/nfts", getNFT);
module.exports = router;

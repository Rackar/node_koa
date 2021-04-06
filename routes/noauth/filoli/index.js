const router = require("koa-router")();
const web3 = require('web3');
const BuyEvents = require("../../../models/BuyEvents");
const WrapEvents = require("../../../models/WrapEvents");
const Comment = require("../../../models/Comment");
const NFT = require("../../../models/NFT");
let myWeb3 = require('../../../src/web3')
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
  let uad = ctx.query.uad;
  let query = {}
  if (uad) {
    query["returnValues.Principal"] = web3.utils.toChecksumAddress(uad)
  }
  let dnfts = await WrapEvents.find(query);
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
    let nftIds = list.map(de => de.NFTid)
    let nftMetas = await NFT.find({ nftid: { $in: nftIds } });

    let newList = list.map(el => {
      let obj = nftMetas.find(item => item.nftid == el.NFTid)
      if (obj) {
        el.name = obj.name
        el.description = obj.description
        el.image = obj.image
      }
      return el

    })
    ctx.body = {
      status: 1,
      msg: "已获取所有dNFT",
      data: newList
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "无数据",
      data: []
    };
  }
};

const sellingDnfts = async function (ctx, next) {
  let uad = ctx.query.uad;
  let query = {
    Selling: true
  }
  if (uad) {
    query["returnValues.Principal"] = web3.utils.toChecksumAddress(uad);
  }
  let dnfts = await WrapEvents.find(query);
  if (dnfts && dnfts.length) {
    let list = dnfts.map(async de => {
      let sell = await myWeb3.getSellingStatus(de.returnValues.dNFTid)
      return {
        NFTCotract: de.returnValues.NFTCotract,
        NFTid: de.returnValues.NFTid,
        dNFTid: de.returnValues.dNFTid,
        Principal: de.returnValues.Principal,
        updatedAt: de.updatedAt,
        selling: sell
      }
    }).filter(dnft => dnft.selling === true)
    let nftIds = list.map(de => de.NFTid)
    let nftMetas = await NFT.find({ nftid: { $in: nftIds } });

    let newList = list.map(el => {
      let obj = nftMetas.find(item => item.nftid == el.NFTid)
      if (obj) {
        el.name = obj.name
        el.description = obj.description
        el.image = obj.image
      }
      return el

    })
    ctx.body = {
      status: 1,
      msg: "已获取所有dNFT",
      data: newList
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "无数据",
      data: []
    };
  }
};

async function findMetaWithDNFTid(dNFTid) {
  let res = await WrapEvents.findOne({ "returnValues.dNFTid": dNFTid })
  let meta = await NFT.findOne({ nftid: res.returnValues.NFTid })
  if (meta && meta.name)
    return meta
  else
    return {}

}
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

    //后端查NFT名称，不太必要
    // for (let i = 0; i < list.length; i++) {
    //   const dNFTid = list[i].dNFTid;
    //   let res = await WrapEvents.findOne({ "returnValues.dNFTid": dNFTid })
    //   let meta = await NFT.findOne({ nftid: res.returnValues.NFTid })
    //   if (meta && meta.name) { list[i].name = meta.name }
    // }

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

  let result = await NFT.findOne(
    { nftid: id },
  );
  if (result) {
    ctx.body = {
      status: 1,
      msg: "查询成功",
      data: result
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "查询失败"
    };
  }
};

const getETHprice = async function (ctx, next) {
  let price = global.ethPrice
  ctx.body = {
    status: 1,
    msg: "查询成功",
    data: price
  };

};

router.get("/dnfts", dnfts); //拉取dnfts
router.get("/boughters", boughters);//获取购买者
router.get("/comments", getComment);//拉取评论
router.post("/comments", addComment);//添加评论
router.post("/nfts", addNFT); //测试添加nft
router.get("/nfts", getNFT); //测试获取单个nft
router.get("/ethprice", getETHprice); //获取eth币市值
module.exports = router;

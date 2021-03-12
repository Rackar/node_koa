const router = require("koa-router")();
const BuyEvents = require("../../../models/BuyEvents");
const WrapEvents = require("../../../models/WrapEvents");
router.prefix("/filoli");
var add = async function (ctx, next) {
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
module.exports = router;

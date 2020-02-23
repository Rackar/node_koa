const router = require("koa-router")();

var GPS = require("../../../models/gps");
var add =async function (ctx, next) {
  var params = {...req.body};
  console.log(req.body);
  var newPoint = new GPS(params);

  let result = await newPoint.save();
  if (!result) {
     ctx.body ={
      status: 2,
      msg: err || "入库失败"
    }
  } else {
    ctx.body ={
        status: 1,
        msg: "入库成功"
      }

  }
};
var get =async function (ctx, next) {
 let result = await GPS.find()

ctx.body={
    status: 1,
    msg: "获取全部数据成功",
    data: result
  }
};
var getlast =async function (ctx, next) {
    let result = await  GPS.findOne()    .sort({
      _id: -1
    })
    
    ctx.body={
        status: 1,
        msg: "获取最近一次数据成功",
        data: result
      }
};

var getById =async function (ctx, next) {
    let result = await GPS.findById(ctx.params.id)
   
   ctx.body={
       status: 1,
       msg: "获取数据成功",
       data: result
     }
   };

router.post("/", add);
router.get("/", get);
router.get("/:id", getById);
router.get("/last", getlast);
module.exports = router;
const router = require("koa-router")();

var Jiapu = require("../../../models/jiapu");
var add = async function (ctx, next) {
  var params = { ...ctx.request.body };
  console.log(params)
  var newPoint = new Jiapu(params);

  let result = await newPoint.save();
  if (!result) {
    ctx.body = {
      status: 2,
      msg: err || "入库失败"
    }
  } else {
    ctx.body = {
      status: 1,
      msg: "入库成功"
    }

  }
};
var get = async function (ctx, next) {
  let result = await Jiapu.find()

  ctx.body = {
    status: 1,
    msg: "获取全部数据成功",
    data: result
  }
};
var getByGroupId = async function (ctx, next) {
  let result = await Jiapu.find({ groupId: ctx.params.groupId })
  ctx.body = {
    status: 1,
    msg: "获取最近一次数据成功",
    data: result
  }
};

var getById = async function (ctx, next) {
  let result = await Jiapu.findById(ctx.params.id)

  ctx.body = {
    status: 1,
    msg: "获取数据成功",
    data: result
  }
};

var Group = require("../../../models/jiapuGroup");
var addGroups = async function (ctx, next) {
  var params = { ...ctx.request.body };
  console.log(params)
  var newPoint = new Group(params);

  let result = await newPoint.save();
  if (!result) {
    ctx.body = {
      status: 2,
      msg: err || "入库失败"
    }
  } else {
    ctx.body = {
      status: 1,
      msg: "入库成功"
    }

  }
};
var getGroups = async function (ctx, next) {
  let result = await Group.find()

  ctx.body = {
    status: 1,
    msg: "获取全部数据成功",
    data: result
  }
};


var getGroupById = async function (ctx, next) {
  let result = await Group.findById(ctx.params.id)

  ctx.body = {
    status: 1,
    msg: "获取数据成功",
    data: result
  }
};

router.prefix("/jiapu");

router.post("/", add);
router.get("/", get);
router.get("/:id", getById);
router.get("/ingroup/:groupId", getByGroupId);

router.post("/groups", addGroups);
router.get("/groups", getGroups);
router.get("/groups/:id", getGroupById);
module.exports = router;
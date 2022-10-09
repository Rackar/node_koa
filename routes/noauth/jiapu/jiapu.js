const router = require("koa-router")();

var Jiapu = require("../../../models/jiapu");
var Group = require("../../../models/jiapuGroup");
var Counter = require("../../../models/jiapuConter");
const jiapuGroup = require("../../../models/jiapuGroup");
var add = async function (ctx, next) {
  var params = { ...ctx.request.body };
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
var addMany = async function (ctx, next) {
  var params = { ...ctx.request.body };
  let list = params.list.map(el => el)
  let result = await Jiapu.insertMany(list);
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

var addGroups = async function (ctx, next) {
  var params = { ...ctx.request.body };
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

async function updateGroup(ctx, next) {
  let updataPerson = await Group.updateOne(
    {
      _id: body._id
    },
    {
      nodeId: body.nodeId,
      info: body.info,
      name: body.name
    }
  );
  if (updataPerson)
    ctx.body = {
      msg: "编辑成功",
      status: 1
    };
  else {
    ctx.response.status = 400;
    ctx.body = {
      msg: "编辑失败",
      status: 2
    };
  }
}


var getGroupById = async function (ctx, next) {
  let result = await Group.findById(ctx.params.id)

  ctx.body = {
    status: 1,
    msg: "获取数据成功",
    data: result
  }
};

async function forceInitData(ctx, next) {
  await Counter.deleteMany({})
  await Jiapu.deleteMany({})
  await jiapuGroup.deleteMany({})
  const { jpData, groupData } = require("./jpdata")

  let group = new jiapuGroup(groupData);
  let resultGroup = await group.save()
  for (let i = 0; i < jpData.length; i++) {
    const element = jpData[i];
    element.groupId = resultGroup._id
  }
  let result = await Jiapu.insertMany(jpData);
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
}
forceInitData({})

router.prefix("/jiapu");

router.post("/", add);
router.post("/list", addMany)
router.get("/", get);

router.post('/reinit', forceInitData)



router.post("/groups", addGroups);
router.get("/groups", getGroups);
router.put("/groups", updateGroup);
router.get("/groups/:id", getGroupById);
router.get("/ingroup/:groupId", getByGroupId);
router.get("/:id", getById);

module.exports = router;
const router = require("koa-router")();

const jiapu = require("../../../models/jiapu"); //需修改

const modelSchema = jiapu
const modelName = "模型名称" //需修改
const allowReturnProps = []

router.prefix("/jiapu"); //需修改此路由前缀

router.post("/", add);
router.post("/many", addMany)
router.get("/", get);
router.put("/", updateHandle);
router.delete("/", deleteLogicly);
// router.post('/reinit', forceInitData)  //调试用 初始化数据库



/**
 * 新增，body参数的data为新建数据模型
 * @param {*} ctx 
 * @param {*} next 
 */
const add = async function (ctx, next) {
  const params = { ...ctx.request.body };
  const newModel = new modelSchema(params.data);
  try {
    let result = await newModel.save();
    if (!result) {
      ctx.body = {
        status: 2,
        msg: modelName + "新增失败"
      }
    } else {
      ctx.body = {
        status: 1,
        msg: modelName + "新增成功"
      }

    }
  } catch (error) {
    ctx.body = {
      status: 2,
      msg: error && error.toString() + " " + modelName || modelName + "新增失败"
    }
  }


};

/**
 * 批量新增，body参数的data数组，为新建数据模型
 * @param {*} ctx 
 * @param {*} next 
 */
const addMany = async function (ctx, next) {
  const params = { ...ctx.request.body };
  let list = params.data.map(el => el)
  let result = await modelSchema.insertMany(list);
  if (!result) {
    ctx.body = {
      status: 2,
      msg: modelName + "批量新增失败"
    }
  } else {
    ctx.body = {
      status: 1,
      msg: modelName + "批量新增成功"
    }

  }
};
/**
 * 获取全部
 * @param {*} ctx 
 * @param {*} next 
 */
const get = async function (ctx, next) {
  let result = await modelSchema.find()

  ctx.body = {
    status: 1,
    msg: modelName + "获取全部数据成功",
    data: result
  }
};


const getById = async function (ctx, next) {
  let result = await modelSchema.findById(ctx.params.id)

  ctx.body = {
    status: 1,
    msg: modelName + "获取数据成功",
    data: result
  }
};


/**
 * put修改，body参数的data数组，为要修改的数据模型
 * @param {*} ctx 
 * @param {*} next 
 */
async function updateHandle(ctx, next) {
  let data = ctx.request.body.data
  let updataModel = await modelSchema.updateOne(
    {
      _id: data._id
    },
    data
  );
  if (updataModel)
    ctx.body = {
      msg: modelName + "编辑成功",
      status: 1
    };
  else {
    ctx.response.status = 400;
    ctx.body = {
      msg: modelName + "编辑失败",
      status: 2
    };
  }
}

/**
 * 逻辑删除
 * @param {*} ctx 
 * @param {*} next 
 */
const deleteLogicly = async function (ctx, next) {
  let id = ctx.query.id;

  let findId = await modelSchema.findOne({ _id: id });
  if (findId) {
    let result = await modelSchema.updateOne(
      {
        _id: data._id
      },
      { actived: false }
    );
    // await card.save();
    if (result) {
      ctx.body = {
        status: 1,
        msg: modelName + "逻辑删除成功",
      };
    } else {
      ctx.body = {
        status: 2,
        msg: modelName + "逻辑删除失败,未找到id",
      };
    }
  }
};

/**
 * 物理删除
 * @param {*} ctx 
 * @param {*} next 
 */
const del = async function (ctx, next) {
  let id = ctx.query.id;

  let findId = await modelSchema.findOne({ _id: id });
  if (findId) {
    const result = await modelSchema.deleteOne({ _id: id });
    // await card.save();
    if (result) {
      ctx.body = {
        status: 1,
        msg: modelName + "物理删除成功",
      };
    } else {
      ctx.body = {
        status: 2,
        msg: modelName + "物理删除失败,未找到id",
      };
    }
  }
};



/**
 * 初始化数据库使用
 * @param {*} ctx 
 * @param {*} next 
 */
async function forceInitData(ctx, next) {
  // await Counter.deleteMany({})
  // await modelSchema.deleteMany({})
  // await jiapuGroup.deleteMany({})
  const { jpData, groupData } = require("./data")

  let group = new jiapuGroup(groupData);
  let resultGroup = await group.save()
  for (let i = 0; i < jpData.length; i++) {
    const element = jpData[i];
    element.groupId = resultGroup._id
  }
  let result = await modelSchema.insertMany(jpData);
  if (!result) {
    ctx.body = {
      status: 2,
      msg: "入库失败"
    }
  } else {
    ctx.body = {
      status: 1,
      msg: "入库成功"
    }

  }
}
// forceInitData({})



module.exports = router;
const router = require("koa-router")();

// 爬取国土云审核数据入库，为方便统计省级审核工作量

var GTYSH = require("../../../models/gtysh");
var GTYRecord = require("../../../models/gtyrecord");
var add = async function (ctx, next) {
  var params = { ...req.body };
  console.log(req.body);
  var newPoint = new GTYSH(params);

  let result = await newPoint.save();
  if (!result) {
    ctx.body = {
      status: 2,
      msg: err || "入库失败",
    };
  } else {
    ctx.body = {
      status: 1,
      msg: "入库成功",
    };
  }
};
var get = async function (ctx, next) {
  let result = await GTYSH.find();

  ctx.body = {
    status: 1,
    msg: "获取全部数据成功",
    data: result,
  };
};
var getlast = async function (ctx, next) {
  let result = await GTYSH.findOne().sort({
    _id: -1,
  });

  ctx.body = {
    status: 1,
    msg: "获取最近一次数据成功",
    data: result,
  };
};

var getById = async function (ctx, next) {
  let result = await GTYSH.findById(ctx.params.id);

  ctx.body = {
    status: 1,
    msg: "获取数据成功",
    data: result,
  };
};
const axios = require("axios");
// axios.defaults.baseURL = "/dhl"; // 设置请求URL
//TODO 1.修改token
let Basic =
  "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZGJkZmYzYi1lZGU4LTQ4NzAtYTI1MC05ZWNiZWQ3YzE0MjYiLCJ1c2VyaWQiOiIxMjU4MTE3ODAiLCJwaG9uZSI6IjE4NjQ3MTE5ODQxIiwidW5pdHR5cGVjb2RlIjoiMTAiLCJsZXZlbCI6IjQiLCJpc2FkbWluIjoiMSIsInVuaXRic20iOiI2MTgwNDJhZC0wNzkyLTRmZjctYTk5NS0wMjBhYTZmMTlmNzkiLCJ1bml0bmFtZSI6IuWGheiSmeWPpOiHquayu-WMuua1i-e7mOWcsOeQhuS_oeaBr-S4reW_gyIsInh6cWRtIjoiMTUwMDAwIiwidXNlcnRpdGxlIjoiIiwicmVhbG5hbWUiOiLmnajml60iLCJkYXRhcG93ZXJ0eXBlIjoiMCIsInVuaXF1ZV9uYW1lIjoiZ3RkY3k0NTM0OTUiLCJyb2xlIjoid2VidXNlciIsIm5iZiI6MTcwNzI0MzU0OSwiZXhwIjoxNzA3MzI5OTQ5LCJpYXQiOjE3MDcyNDM1NDksImlzcyI6Imh0dHA6Ly93d3cua2luZ29pdC5jb20iLCJhdWQiOiJraW5nbyJ9.Qf_Cbyyx1VXo--q-lZpEGb4eQOXgrOmxsutWSy_9qo8";

async function getShjg(workid,forceUpdateShjg=false) { //已拉取过的审核结果不进行更新
  let data = {
    workid: workid,
    ywlx: "wpzfdktb",
    flowid: 6250,
    nodeid: null,
  };

  if(!forceUpdateShjg){
   let res=await GTYRecord.findOne({tbbsm:workid})
   if(res){
    return false;
   }
  }

  // let res = await axios.post('https://jg.landcloud.org.cn:8553/webapi/workflow/getworkaudit', data)
  await sleepTime(0.5);
  let res = await axios({
    url: "https://jg.landcloud.org.cn:8553/webapi/workflow/getworkaudit",
    method: "post",
    data: data,
    headers: {
      Authorization: Basic,
    },
    timeout:60000
  });
  
  let shjl = res.data.data.shjl;
  for (let i = 0; i < shjl.length; i++) {
    const el = shjl[i];
    await GTYSH.updateOne(
      { tjry: el.tjry, tbbsm: el.tbbsm, shsj: el.shsj }, //人员 图斑标识 审核时间都相同
      { $setOnInsert: el }, //存在则不操作，不存在则新增
      { upsert: true } //当满足查询条件的记录存在,则不执行$setOnInsert中的操作，当满足条件的记录不存在则执行$setOnInsert操作
    );
  }
  return true
}

async function tick() {
  // let startPage = 1
  let startPage = 295
  let pageSize = 100
  let total = await getOnePage(startPage, pageSize);
  console.log(`finish first page ${startPage}`)
  if (total > 0) {
    let count = total / pageSize - 1;
    for (let i = startPage+1; i < count; i++) {
      await getOnePage(i, pageSize);
      console.log(`finish page ${i}/${count}`)
    }
  }
}

async function getOnePage(pageIndex = 1, pageSize = 100) {
//TODO 2.修改查询参数
  let data = {"ywlx":"wpzfdktb","xzqdm":"","level":1,"userxzqdm":"150000","pageSize":20,"pageIndex":1,"order":"","isUseCacheCount":true,"optype":"21","unitname":"内蒙古自治区测绘地理信息中心","loginsystem":"wpzftb","taskid":54,"querydatatype":0,"conditions":[{"fieldname":"dlrdgdmj","conditiontype":"10","isexportexcelheader":false,"values":["0"],"label":"耕地面积"},{"fieldname":"nodeid","conditiontype":1,"isexportexcelheader":false,"values":["4"],"label":"核查节点"},{"bsm":0,"xzqdm":null,"tbbsm":null,"wzzl":null,"xmmc":null,"xmyt":null,"stq":null,"tdqdfs":null,"fieldname":"lx","conditiontype":1,"talias":null,"values":[230,231],"label":null,"isexportexcelheader":false,"useorquery":false,"totalcondition":"1","type":"child"}]}

  data.pageSize = pageSize;
  data.pageIndex = pageIndex;
  await sleepTime(0.5);
  let res = await axios({
    url: "https://jg.landcloud.org.cn:8553/webapi/api/vlist",
    method: "post",
    data: data,
    headers: {
      Authorization: Basic,
    },
    timeout:60000
  });
  
  
  let records = res.data.data.records;
  for (let i = 0; i < records.length; i++) {
    const element = records[i];
    let iSsRecordNotExist= await getShjg(element.tbbsm);
    
    if(iSsRecordNotExist){
     await GTYRecord.updateOne(
        {  tbbsm: element.tbbsm }, // 图斑标识相同
        { $setOnInsert: element }, //存在则不操作，不存在则新增
        { upsert: true } //当满足查询条件的记录存在,则不执行$setOnInsert中的操作，当满足条件的记录不存在则执行$setOnInsert操作
      );
    }
    console.log(`finish record ${i+1}/${records.length}`)
  }
  //await GTYRecord.insertMany(records)
  return res.data.data.total;
}

function sleepTime(num = 1) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, num * 1000 * (Math.random() * 0.4 + 0.8));
  });
}

function plusNumber(a, b) {
  return a + b;
}

function tongjiShengjiShenhe() {
  // 聚合统计 各人的工作量
  let res = GTYSH.aggregate([
    {$match:{nodename:'省级审核'}}, //筛选条件
    {
        $group: {
           // _id: "$tjry", // 分组的关键字段是tjry, 按人员聚合统计。
             _id: {tjry:"$tjry",shsm:"$shsm"}, // 按照多个字段聚合分组
            count: { $sum: 1 } // 统计每个组中的文档数量
        }
    }])
    console.log(res)
    let result = {}
    for (let i = 0; i < res.length; i++) {
      const element = res[i];
     if(result[element._id.tjry]) {
      result[element._id.tjry][result[element._id.shsm]]=element.count
     }else{
      result[element._id.tjry]={}
      result[element._id.tjry][result[element._id.shsm]]=element.count
     }
    }
    for (const name in result) {
      if (Object.hasOwnProperty.call(result, name)) {
        const shjl = result[name];
        let totalCount=0;
        for (const key in shjl) {
          if (Object.hasOwnProperty.call(shjl, key)) {
            const countlist = shjl[key];
            console.log(`${name}审核 ${key}: ${countlist}`)
            totalCount+=countlist;
          }
        }
        console.log(`${name}审核 总数: ${totalCount}`)
      }
    }

}

function testTick(){
   getOnePage(1, 10);
}
router.prefix("/gtysh");

router.post("/", add);
router.get("/", get);
router.get("/tick", tick); //遍历所有页面数据
router.get("/test", testTick); //测试用
router.get("/last", getlast);
router.get("/:id", getById);
router.get("/tongji", tongjiShengjiShenhe);

module.exports = router;

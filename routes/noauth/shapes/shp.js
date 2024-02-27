const router = require("koa-router")();

var SHP = require("../../../models/location/shp");
var add = async function (ctx, next) {
  var params = { ...ctx.request.body };
  var newPoint = new SHP(params);

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
var getAll = async function (ctx, next) {
  let result = await SHP.find();

  ctx.body = {
    status: 1,
    msg: "获取全部数据成功",
    data: result,
  };
};
var getlast = async function (ctx, next) {
  let result = await SHP.findOne().sort({
    _id: -1,
  });

  ctx.body = {
    status: 1,
    msg: "获取最近一次数据成功",
    data: result,
  };
};

var getById = async function (ctx, next) {
  let result = await SHP.findById(ctx.params.id);

  ctx.body = {
    status: 1,
    msg: "获取数据成功",
    data: result,
  };
};

var getByParams = async function (ctx, next) {
  let params = ctx.query

  // 删除空参数（以及0）的键
  let keys= Object.keys(params).filter(key => !params[key])
  keys.forEach(key=>{delete params[key]})
    

  let result = await SHP.find(params);

  ctx.body = {
    status: 1,
    msg: "获取数据成功",
    data: result,
  };
};

async function searchWithInPolygon(ctx, next) {
  let box=[[110.5,41],[112,41],[112,39.5],[110.5,39.5],[110.5,41]]
  let location = findWithin(box);
  let result = await SHP.find({
    location
  });
  ctx.body = {
    status: 1,
    msg: "获取数据成功",
    data: result,
  };
}

async function searchIntersect(ctx, next) {
  let box=[[110.5,41],[112,41],[112,39.5],[110.5,39.5],[110.5,41]]
  let location = findIntersect(box);
  let result = await SHP.find({
    location
  });
  ctx.body = {
    status: 1,
    msg: "获取数据成功",
    data: result,
  };
}

async function searchWithPoint(ctx, next) {
  let lng = 110.9, lat = 39.9, distance = 50000
  let location = findNearPoint(lng, lat, distance);
  let result = await SHP.find({
    location
  });
  ctx.body = {
    status: 1,
    msg: "获取数据成功",
    data: result,
  };
}

function findWithin(pointList) {
 let  location= {
    $geoWithin: {
       $geometry: {
          type: "Polygon", // 可选项，指定要查询的形状类型（点、线或面）
          coordinates: [pointList] // 包含闭合边界点的数组 pointList= [[x1, y1], [x2, y2], ...]
       }
    }
  }
  return location
}

function findIntersect(pointList) {
  let  location= {
     $geoIntersects: {
        $geometry: {
           type: "Polygon", // 可选项，指定要查询的形状类型（点、线或面）
           coordinates: [pointList] // 包含闭合边界点的数组 pointList= [[x1, y1], [x2, y2], ...]
        }
     }
   }
   return location
 }

function findNearPoint(x,y,distanceInMeters) {
 let  location={
    $near: {
       $geometry: {
          type: "Point", // 必需项，指定要查询的形状类型为点
          coordinates: [ x, y ] // 经度和纬度值的数组
       },
       $maxDistance: distanceInMeters // 最大距离（单位：米）
    }
  }
  return location
}



// 参考 https://www.itzhimei.com/archives/8111.html
// db.places.find({
//   loc: {
//     $geoWithin: {
//       $centerSphere: [[x, y], 0.5],
//     },
//   },
// });
// db.places.aggregate([
//   {
//     $geoNear: {
//       near: { type: "Point", coordinates: [x, y] },
//       distanceField: "dist",
//       limit: 3,
//     },
//   },
// ]);

// 官网参考   https://mongoosejs.com/docs/geojson.html

router.prefix("/shapes");

router.post("/", add);
router.get("/", getAll);
router.get("/byintersect", searchIntersect);
router.get("/bybox", searchWithInPolygon);
router.get("/bypoint", searchWithPoint);

router.get("/find", getByParams);

router.get("/last", getlast);

router.get("/:id", getById);
module.exports = router;

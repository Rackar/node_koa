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

var getByPoint = async function (ctx, next) {
  let x = ctx.params.x || 110;
  let y = ctx.params.y || 40;
  let result = await searchWithPoint(x, y);

  ctx.body = {
    status: 1,
    msg: "获取数据成功",
    data: result,
  };
};

async function searchWithPoint(lng = 110, lat = 40, distance = 0.01) {
  let box = pointToBox(lng, lat, distance);
  let result = await SHP.find({
    location: {
      $geoWithin: {
        $geometry: {
          type: "Polygon",
          coordinates: [box],
        },
      },
    },
  });
  return result;
}

function pointToBox(lng, lat, distance = 0.01) {
  let array = [
    [112, 40],
    [111, 40],
    [111, 41],
    [112, 41],
    [112, 40],
  ];

  return array;
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
router.get("/bypoint", getByPoint);
router.get("/last", getlast);

router.get("/:id", getById);
module.exports = router;

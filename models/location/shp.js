const mongoose = require("../../api/db_mongoose");
//var Schema = mongoose.Schema;
const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const citySchema = new mongoose.Schema({
  name: String,
  location: {
    type: pointSchema,
    required: true,
  },
});

const polygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Polygon"],
    required: true,
  },
  coordinates: {
    type: [[[Number]]], // Array of arrays of arrays of numbers
    required: true,
  },
});

const shpSchema = new mongoose.Schema(
  {
    name: String, // 批文名称
    type: String, // 批文类型
    tbbh: String, //关联图斑编号
    areaCode: String, //行政区划
    setupDate: String, // 批准日期
    setupUnit: String, // 批准单位
    location: polygonSchema,
  },
  { timestamps: true, strict: false }
);

// 为location字段创建2dsphere索引
shpSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Shp", shpSchema);

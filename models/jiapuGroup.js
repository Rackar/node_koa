var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;
const Counter = require("./jiapuConter")

var JiapuGroupSchema = new Schema({
  "key": Number, //自增id
  "nodeId": String, // 本家族始祖id 作为根节点
  "name": String, //家谱名称
  "info": String, //简介信息 
  "public": { type: Boolean, default: true },
  "active": { type: Boolean, default: true },
},
  {
    strict: false,
    //  timestamps: true 
  });

// JiapuGroupSchema.pre(['save', 'insertMany'], function (next) {
//   let doc = this;
//   Counter.findByIdAndUpdate({ _id: 'jiapuGroupKey' }, { $inc: { seq: 1 } }, { new: true, upsert: true }, function (error, counter) {
//     if (error)
//       return next(error);
//     doc.key = counter.seq;
//     next();
//   });
// });
// JiapuGroupSchema.pre(/^insert/, function (next) {
//   let doc = this;
//   Counter.findByIdAndUpdate({ _id: 'jiapuGroupKey' }, { $inc: { seq: 1 } }, { new: true, upsert: true }, function (error, counter) {
//     if (error)
//       return next(error);
//     doc.key = counter.seq;
//     next();
//   });
// });
module.exports = mongoose.model("JiapuGroup", JiapuGroupSchema);

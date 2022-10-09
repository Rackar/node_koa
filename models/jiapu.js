var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;

var JiapuSchema = new Schema({
  "groupId": String, //所在家族id
  "node": Boolean, //是否是根节点 true是，
  "n": String, //姓名
  "pic": String, //头像地址链接
  "key": String,   //索引编号
  "d": String, //代数
  "y": String,// 生日-去世
  born: Number,
  die: Number,
  "s": String, //性别（M F)
  f: String, //父亲索引编号
  m: String,  //母亲索引编号
  "ux": String, //妻子索引编号
  "vir": String, //丈夫索引编号
  "j": String //简介
},
  {
    strict: false,
    // timestamps: true 
  });

// JiapuSchema.pre('save', function (next) {
//   let doc = this;
//   Counter.findByIdAndUpdate({ _id: 'jiapuKey' }, { $inc: { seq: 1 } }, { new: true, upsert: true }, function (error, counter) {
//     if (error)
//       return next(error);
//     doc.key = counter.seq;
//     next();
//   });
// });
module.exports = mongoose.model("JIAPU", JiapuSchema);

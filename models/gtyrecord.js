var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;

var gtyRecordSchema = new Schema({

  querytbbh:String, //    "LJ1505242023051410270321"
  tbbh: String , //"1410270321"
  "tbbsm":{
    type: String,
    index: true,    //索引
    unique: true   //唯一
  }, // "4c6e70985674487c99f2fa90874d9a03",
  "xzqdm": String, //"150000",
  dkbh:String //   "150626202401290004"
  
},
{ timestamps: true,strict:false });
module.exports = mongoose.model("gtyRecord", gtyRecordSchema);

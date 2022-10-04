var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;

var JiapuGroupSchema = new Schema({
  "nodeId": String, // 本家族始祖id 作为根节点
  "info": String, //介绍信息 

},
  { strict: false, timestamps: true });
module.exports = mongoose.model("JIAPUGroup", JiapuGroupSchema);

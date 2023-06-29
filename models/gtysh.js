var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;

var gtyshSchema = new Schema({

  "bsm": String, //"63958385",
  "xzqdm": String, //"150000",
  "tbbsm": String, // "4c6e70985674487c99f2fa90874d9a03",
  "shsm": String, // "通过",
  "shry": String, //"126110638",
  "shsj": String, //"2023-06-28 16:09:51",
  "sjshjg": String, //"Y",
  "state": String, //"1",
  "lccontent": String, // "灌溉蓄水池",
  "nodename": String, //"省级审核",
  "createtime": String, //"2023-06-28 16:09:51",
  "nodeid": String, //"3",
  "tjry": String, // "刘春然",
  "level": String, // "4",

});
module.exports = mongoose.model("gtysh", gtyshSchema);

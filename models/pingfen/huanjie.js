var mongoose = require("../../api/db_mongoose");
var Schema = mongoose.Schema;
// var List =  require("./list");
// var Image =require('./image.js');

var HuanjieSchema = new Schema(
  {
    name: {
      type: String
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Huanjie", HuanjieSchema);

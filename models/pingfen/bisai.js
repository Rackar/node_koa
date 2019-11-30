var mongoose = require("../../api/db_mongoose");
var Schema = mongoose.Schema;
// var List =  require("./list");
// var Image =require('./image.js');

var BisaiSchema = new Schema(
  {
    title: {
      type: String
    },
    zhuban: {
      type: String
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Bisai", BisaiSchema);

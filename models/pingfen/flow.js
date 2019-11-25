var mongoose = require("../../api/db_mongoose");
var Schema = mongoose.Schema;
// var List =  require("./list");
// var Image =require('./image.js');

var FlowSchema = new Schema(
  {
    cansaiId: {
      type: String
    },
    huanjieId: {
      type: String
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Flow", FlowSchema);

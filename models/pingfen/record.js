var mongoose = require("../../api/db_mongoose");
var Schema = mongoose.Schema;
// var List =  require("./list");
// var Image =require('./image.js');

var RecordSchema = new Schema(
  {
    huanjieId: String,
    cansaiId: String,
    pingweiId: String,
    fenshu: Number
  },
  { timestamps: true }
);
module.exports = mongoose.model("Record", RecordSchema);

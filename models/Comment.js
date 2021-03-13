var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  userAddress: String,
  dNFTid: String,
  content: String,
});
module.exports = mongoose.model("Comment", CommentSchema);

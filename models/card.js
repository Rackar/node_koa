var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;

var CardSchema = new Schema({
  name: {
    type: String,
  },
  money: {
    type: String,
  },
  hangye: {
    type: String,
  },
  endDate: {
    type: String,
  },
  startDate: {
    type: String,
  },
  userid: {
    type: String,
  },
});
module.exports = mongoose.model("Card", CardSchema);

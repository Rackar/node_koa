var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;

var CardSchema = new Schema({
  name: {
    type: String,
  },
  money: {
    type: Number,
  },
  hangye: {
    type: String,
  },
  endDate: {
    type: Date,
  },
  startDate: {
    type: Date,
  },
  log:[{
    changedMoney:Number,
    changeDate: Number
    }],
  userid: {
    type: String,
  },
},
{ timestamps: true });
module.exports = mongoose.model("Card", CardSchema);

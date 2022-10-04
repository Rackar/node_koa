var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;

var PointSchema = new Schema({
  indexId:Number,
  name:String,
  type:String,
  address:String,
  location: {
    type: Object,
    // coordinates: [Number]
}
},
{strict: false,  timestamps: true });
module.exports = mongoose.model("POINT", PointSchema);

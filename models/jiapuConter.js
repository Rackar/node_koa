var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;
const CounterSchema = Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

//jiapuKey
//jiapuGroupKey


module.exports = mongoose.model('counter', CounterSchema);
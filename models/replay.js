const mongoose = require("../api/db_mongoose");
const { Schema } = mongoose;

const ReplaySchema = new Schema({
  url:String,
  submitter:String
}, { strict: false, timestamps: true });
module.exports = mongoose.model("Replay", ReplaySchema);
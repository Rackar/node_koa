
var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;

var WrapSchema = new Schema({
    address: String,
    returnValues:{NFTCotract:String,
        NFTid: String,
        Principal: String
    }
},{ strict : false,timestamps: true });
module.exports = mongoose.model("Wrap", WrapSchema);

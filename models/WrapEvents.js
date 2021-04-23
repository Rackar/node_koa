
var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;

var WrapSchema = new Schema({
    address: String,
    transactionHash: String,
    returnValues: {
        NFTCotract: String,
        NFTid: String,
        dNFTid: String,
        Principal: String,
        Selling: {
            type: String,
            default: "true"
        }
    },
    ownerClaimed: {
        type: String,
        default: "false"
    }
}, { strict: false, timestamps: true });
module.exports = mongoose.model("Wrap", WrapSchema);

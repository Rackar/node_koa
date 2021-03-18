var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;

var NFTSchema = new Schema({
    nftid: String,
    contractAd: String,
    name: String,
    description: String,
    image: String,
    attributes: Array
}, { strict: false, timestamps: true });
module.exports = mongoose.model("NFT", NFTSchema);

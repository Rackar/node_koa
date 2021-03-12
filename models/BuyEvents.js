
var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;

var BuySchema = new Schema({
    address: String,

    returnValues: {
        Buyer: String,
        dNFTid: String,
        amount: String,
    },

}, { strict: false, timestamps: true });
module.exports = mongoose.model("Buy", BuySchema);

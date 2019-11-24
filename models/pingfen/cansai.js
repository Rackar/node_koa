var mongoose = require("../../api/db_mongoose");
var Schema = mongoose.Schema;
// var List =  require("./list");
// var Image =require('./image.js');

var CansaiSchema = new Schema(
  {
    name: {
      type: String
    },
    avatar: {
      type: String
    },

    count: {
      watched: Number,
      followed: Number,
      following: Number,
      like: Number,
      liked: Number,
      articles: Number,
      words: Number,
      searched: Number
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Cansai", CansaiSchema);

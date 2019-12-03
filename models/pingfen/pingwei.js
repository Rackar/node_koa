var mongoose = require("../../api/db_mongoose");
var Schema = mongoose.Schema;
// var List =  require("./list");
// var Image =require('./image.js');

var PingweiSchema = new Schema(
  {
    name: {
      type: String
    },
    description: {
      type: String
    },
    username: { type: String },
    password: { type: String },
    pwtype: { type: String },
    record: [
      {
        _id: Schema.Types.ObjectId,
        huanjieId: String,
        cansaiId: String,
        fenshu: Number
      }
    ],

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
module.exports = mongoose.model("Pingwei", PingweiSchema);

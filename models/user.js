var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String
  },
  mobile: {
    type: String
  },
  pwd: {
    type: String
  },
  articles: [
    {
      _id: Schema.Types.ObjectId,
      title: String
    }
  ],
  following: [],
  followed: [],
  liking: [],
  info: "",
  starsLogs: [],
  avatar: {
    type: String
  },
  count: {
    followed: Number,
    following: Number,
    like: Number,
    liked: Number,
    articles: Number,
    words: Number
  }
});
module.exports = mongoose.model("User", UserSchema);

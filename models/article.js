var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  userid: Schema.Types.ObjectId,
  username: String,
  previewImageId: String,
  title: String,
  content: String,
  output: String,
  publicdate: Date,
  editdate: Date,
  clickCount: Number,
  liked: [
    {
      userid: Schema.Types.ObjectId,
      username: String
    }
  ],
  likedCount: Number,

  comment: [
    {
      userid: Schema.Types.ObjectId,
      username: String,
      content: String,
      publicdate: Date
    }
  ]
});
module.exports = mongoose.model("Article", ArticleSchema);

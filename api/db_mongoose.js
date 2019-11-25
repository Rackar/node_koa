var mongoose = require("mongoose");
var testDB = global.production
  ? "mongodb://172.17.0.5:27017/rackar"
  : "mongodb://localhost:27017/rackar";
// var testDB = "mongodb://localhost:27017/rackar"; //本地
mongoose.connect(
  testDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err) {
    if (err) {
      console.log("connect fail");
    } else {
      console.log("connect success");
    }
  }
);
module.exports = mongoose;

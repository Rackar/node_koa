var mongoose = require("mongoose");
// var testDB = 'mongodb://10.163.6.211:27017/rackar'
var testDB = "mongodb://127.0.0.1:27017/rackar";
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
//8250 6644

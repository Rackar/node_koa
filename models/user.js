var mongoose = require('../api/db_mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  }
})
module.exports = mongoose.model('User', UserSchema)

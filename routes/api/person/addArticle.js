// var express = require('./node_modules/express');
// var router = express.Router();
var Person = require('../../../models/person')
var ObjectID = require('mongodb').ObjectID
var addComment = async function(ctx, next) {
  // res.send('respond with a resource');
  let params = ctx.request.body

  let person = await Person.updateOne(
    {
      _id: ObjectID(params.personid)
    },
    {
      $addToSet: {
        articles: [
          {
            _id: ObjectID(),
            createrid: params.createrid,
            text: params.text,
            title: params.title
          }
        ]
      }
    }
    // ,
    // function(err, content) {
    //   if (err) {
    //     return res.send({
    //       status: 2,
    //       msg: err || '文章发布失败'
    //     })
    //   } else {
    //     return res.send({
    //       status: 1,
    //       msg: '文章发布成功'
    //     })
    //   }
    // }
  )
  if (person) {
    ctx.body = {
      status: 1,
      msg: '文章发布成功'
    }
  }
}

module.exports = addComment

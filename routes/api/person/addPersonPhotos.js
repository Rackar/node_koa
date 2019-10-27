// var express = require('./node_modules/express');
// var router = express.Router();
var Person = require('../../../models/person')
var ObjectID = require('mongodb').ObjectID
var addComment =async function(ctx, next) {
  // res.send('respond with a resource');
  let params = ctx.request.body
  let photos = params.photos.map(photo => {
    return {
      _id: ObjectID(),
      title: photo.name,
      url: photo.url
    }
  })

 let person=await Person.updateOne(
    {
      _id: ObjectID(params.personid)
    },
    {
      $addToSet: {
        photos: { $each: photos }
      }
    }
    // ,
    // function(err, content) {
    //   if (err) {
    //     return res.send({
    //       status: 2,
    //       msg: err || '照片发布失败'
    //     })
    //   } else {
    //     return res.send({
    //       status: 1,
    //       msg: '照片发布成功',
    //       data: content
    //     })
    //   }
    // }
  )
  if(person){
    ctx.body={
                status: 1,
          msg: '照片发布成功',
          data: person
    }
  }
}

module.exports = addComment

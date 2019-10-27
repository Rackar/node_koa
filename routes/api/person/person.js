var Person = require('../../../models/person')
var jwt = require('jsonwebtoken') // 使用jwt签名
var config = require('../../../config') // 使用jwt签名
var ObjectID = require('mongodb').ObjectID
var user =async function(ctx, next) {
  var id = ctx.params.id
  let person =await Person.findOne(
    {
      _id: ObjectID(id)
    }
    // ,
    // function(err, body) {
    //   if (err || !body) {
    //     return res.send({
    //       status: 2,
    //       msg: err || '无此人物'
    //     })
    //   } else {
    //     var userData = {
    //       _id: id,
    //       name: body.name,
    //       birthday: body.birthday,
    //       deathday: body.deathday,
    //       info: body.info,
    //       createrId: body.createrId,
    //       articles: body.articles,
    //       avatarfilePath: body.avatarfilePath,
    //       photos: body.photos,
    //       liked: body.liked
    //     }

    //     return res.send({
    //       status: 1,
    //       msg: '拉取用户成功',
    //       data: userData
    //     })
    //   }
    // }

  )
  if(person){
    ctx.body={
                status: 1,
          msg: '拉取用户成功',
          data: person
    }
  }
}
module.exports = user

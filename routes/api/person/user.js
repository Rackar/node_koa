var Person = require('../../../models/person')
var jwt = require('jsonwebtoken') // 使用jwt签名
var config = require('../../../config') // 使用jwt签名
var ObjectID = require('mongodb').ObjectID
var user =async function(ctx, next) {
  var id = ctx.params.id
  let persons=await Person.find(
    {
      createrId: id
    })
  if(persons){
    ctx.body={
      data:persons,
      status: 1,
          msg: '拉取用户成功',
    }
  }
    // ,
    // function(err, body) {
    //   if (err || !body) {
    //     return res.send({
    //       status: 2,
    //       msg: err || '无此人物'
    //     })
    //   } else {
    //     let bodys = body

    //     // var userData = {
    //     //   _id: id,
    //     //   name: body.name,
    //     //   birthday: body.birthday,
    //     //   deathday: body.deathday,
    //     //   info: body.info,
    //     //   createrId: body.createrId,
    //     //   articles: body.articles,
    //     //   photo: body.photo
    //     // }

    //     return res.send({
    //       status: 1,
    //       msg: '拉取用户成功',
    //       data: bodys
    //     })
    //   }
    // }
  // )
}
module.exports = user

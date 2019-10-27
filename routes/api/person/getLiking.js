var Person = require('../../../models/person')
var User = require('../../../models/user')

var ObjectID = require('mongodb').ObjectID
var user =async function(ctx, next) {
  let id = ctx.request.params.id
  let user =await User.findOne({ _id: id })
  if (user){
    let idArr = content.liking.map(sid => {
      return ObjectID(sid.personid)
    })
    let persons=await Person.find(
      {
        _id: { $in: idArr }
      })
    if(persons && persons.length){
      ctx.body={
        status: 1,
              msg: '拉取系列集合成功',
              data: persons
      }
    }else{
      ctx.body={
        status: 2,
        msg: err || '无此人物'
      }
    }
  }
  // User.findOne({ _id: id }, function(err, content) {
  //   if (err || !content) {
  //     return res.send({ status: 0, msg: err || '用户信息错误，请重新登录' })
  //   } else {
  //     let idArr = content.liking.map(sid => {
  //       return ObjectID(sid.personid)
  //     })
  //     console.log(idArr)
  //     // let ts = idArr.map(sid => {
  //     //   return ObjectID(sid)
  //     // } )

  //     Person.find(
  //       {
  //         _id: { $in: idArr }
  //       },
  //       function(err, body) {
  //         if (err || !body) {
  //           return res.send({
  //             status: 2,
  //             msg: err || '无此人物'
  //           })
  //         } else {
  //           let bodys = body

  //           return res.send({
  //             status: 1,
  //             msg: '拉取系列集合成功',
  //             data: bodys
  //           })
  //         }
  //       }
  //     )
  //   }
  // })
}
module.exports = user

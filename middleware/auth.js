const jwt = require('jsonwebtoken')
const config = require('../config')

var hasOwnProperty = Object.hasOwnProperty

/**
 * Pretty JSON response middleware.
 *
 *  - `pretty` default to pretty response [true]
 *  - `param` optional query-string param for pretty responses [none]
 *
 * @param {Object} opts
 * @return {GeneratorFunction}
 * @api public
 */

module.exports = function({ directPath } = {}) {
  // var opts = opts || {}
  // var param = opts.param
  // var pretty = null == opts.pretty ? true : opts.pretty
  // var spaces = opts.spaces || 2

  return async function checkJWT(ctx, next) {
    let enterAuth = ifPathNeedAuth(directPath, ctx.request.url)
    if (enterAuth) {
      if (ifTokenExist()) {
        let token = getToken(ctx)
        let result = await verifyToken(token, config.jwtsecret).catch(err => {
          ctx.throw(401, 'Bad token"')
        })
        console.log(result)
        return next()
      } else {
        ctx.status = 401
        ctx.body = 'token'
      }
    } else {
      return next()
    }
  }
}

function ifPathNeedAuth(directPath, requestUrl) {
  if (Array.isArray(directPath)) {
    return directPath.findIndex(requestUrl) == -1
  } else {
    return true
  }
}
function ifTokenExist(ctx) {
  return true
}
function getToken(ctx) {
  let token =
    ctx.request.body.token ||
    ctx.request.query.token ||
    (ctx.request.headers && ctx.request.headers['authorization'])
  return token
}
function verifyToken(token, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        return reject()
      } else {
        if (decoded) {
          return resolve(decoded)
        } else {
          return reject()
        }
      }
    })
  })
}

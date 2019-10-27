const router = require('koa-router')()

var person = require('./getPerson')
var user = require('./getPersonsByUser')

/* GET users listing. */

router.prefix('/person')

router.get('/:id', person)

router.get('/user/:id', user)

module.exports = router

const router = require('koa-router')()

var add = require('./addPerson')
var addArticle = require('./addArticle')
var addPhotos = require('./addPersonPhotos')
var person = require('./getPerson')
var editPerson = require('./setPerson')
var user = require('./getPersonsByUser')
var liked = require('./setLiked')
var personIDs = require('./getPeoperByIDs')
var getLiking = require('./getLiking')
/* GET users listing. */

router.prefix('/person')

router.post('/', add)
router.post('/article', addArticle)
router.post('/photos', addPhotos)
router.get('/:id', person)
router.put('/', editPerson)

router.get('/user/:id', user)
router.post('/liked', liked)
router.post('/getpeopelbyids', personIDs)
router.get('/getlikings/:id', getLiking)

module.exports = router

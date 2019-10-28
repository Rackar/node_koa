const router = require("koa-router")();

var add = require("./addPerson");
var addArticle = require("./addArticle");
var addPhotos = require("./addPersonPhotos");
var editPerson = require("./setPerson");
var user = require("./getPersonsByUser");
var liked = require("./setLiked");
var personIDs = require("./getPeoperByIDs");
var getLiking = require("./getLiking");
/* GET users listing. */

router.prefix("/person");

router.post("/", add);
router.put("/", editPerson);
router.post("/article", addArticle);
router.post("/photos", addPhotos);

router.post("/user", user);
router.post("/liked", liked);
router.post("/getpeopelbyids", personIDs);
router.post("/getlikings", getLiking);
router.post("/getPopular", getLiking);
router.post("/getNewest", getLiking);

module.exports = router;

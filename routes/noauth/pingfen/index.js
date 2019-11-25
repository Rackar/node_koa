const router = require("koa-router")();

var addPingwei = require("./addPingwei");
var addcansai = require("./addCansai");
var addhuanjie = require("./addHuanjie");
var getAll = require("./getAll");
var del = require("./delete");
// var getPopular = require("./getPopular");
// var getNewest = require("./getNewest");
// var user = require("./getPersonsByUser");
// let search = require("./searchPerson");

/* GET users listing. */

router.prefix("/pingfen");
router.get("/all", getAll);
router.post("/delete", del);
router.post("/addpingwei", addPingwei);
router.post("/addcansai", addcansai);
router.post("/addhuanjie", addhuanjie);
// router.get("/:id", person);
// router.get("/user/:id", user);
// router.post("/popular", getPopular);
// router.post("/newest", getNewest);

module.exports = router;

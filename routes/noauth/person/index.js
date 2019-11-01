const router = require("koa-router")();

var person = require("./getPerson");
var getPopular = require("./getPopular");
var getNewest = require("./getNewest");
var user = require("./getPersonsByUser");
let search = require("./searchPerson");

/* GET users listing. */

router.prefix("/person");

router.get("/:id", person);

router.get("/user/:id", user);
router.post("/search", search);
router.post("/popular", getPopular);
router.post("/newest", getNewest);

module.exports = router;

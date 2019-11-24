const multer = require("koa-multer");

const router = require("koa-router")();
const person = require("./api/person/index");
const star = require("./api/star/index");
const Article = require("../models/article");
router.prefix("/api");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
    // cb(null, 'public/uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post("/image", upload.single("avatar"));

router.use(person.routes(), person.allowedMethods()); // /person
router.use(star.routes(), star.allowedMethods()); // /stars
module.exports = router;

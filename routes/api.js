const multer = require("koa-multer");

const router = require("koa-router")();

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

module.exports = router;

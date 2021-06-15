const router = require("koa-router")();
// const users = require("./users/index");
const upload = require("./upload");



// router.use(users.routes(), users.allowedMethods()); // /login  /signup
router.use(upload.routes(), upload.allowedMethods()); // /upload

module.exports = router;

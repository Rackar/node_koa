const router = require("koa-router")();
const Article = require("../models/article");
const users = require("./users/index");
const upload = require("./upload");
const person = require("./noauth/person/index");
const gtysh = require("./noauth/gty/sh");
const lianyue = require("./noauth/lianyue/addArticle");
const replay = require("./noauth/replay/index");
const point = require("./noauth/geo/point");
const jiapu = require("./noauth/jiapu/jiapu");

const shapes = require("./noauth/shapes/shp");
router.prefix("/noauth");

// router.get("/article", async function(ctx, next) {
//   let result = await Article.find();
//   // .then(resultArr => {
//   //   return resultArr.map(obj => {
//   //     return {content: obj.content, title: obj.title}
//   //   })
//   // })
//   result = result.map(obj => {
//     return { content: obj.content, title: obj.title };
//   });
//   ctx.body = result;
// });

router.use(users.routes(), users.allowedMethods()); // /login  /signup
router.use(upload.routes(), upload.allowedMethods()); // /upload
router.use(person.routes(), person.allowedMethods()); // /person
router.use(lianyue.routes(), lianyue.allowedMethods()); // /person
router.use(gtysh.routes(), gtysh.allowedMethods()); // /gtysh
router.use(replay.routes(), replay.allowedMethods()); // /person
router.use(point.routes(), point.allowedMethods()); // /person
router.use(jiapu.routes(), jiapu.allowedMethods()); // /person

router.use(shapes.routes(), shapes.allowedMethods()); // /person
module.exports = router;

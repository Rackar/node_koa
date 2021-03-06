const router = require("koa-router")();
const Article = require("../models/article");
const users = require("./users/index");
const upload = require("./upload");
const person = require("./noauth/person/index");
const lianyue = require("./noauth/lianyue/addArticle");
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
module.exports = router;

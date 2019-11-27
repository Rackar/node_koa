const router = require("koa-router")();

var addPingwei = require("./addPingwei");
var addcansai = require("./addCansai");
var addhuanjie = require("./addHuanjie");
var getAll = require("./getAll");
var del = require("./delete");
var changeHuanjie = require("./changeHuanjie");
var add = require("./dafen");
var login = require("./login");

/* GET users listing. */

router.prefix("/pingfen");
router.get("/all", getAll); //查询所有数据
router.post("/delete", del); //删除某一条数据
router.post("/addpingwei", addPingwei); //新增评委
router.post("/addcansai", addcansai); //新增队伍
router.post("/addhuanjie", addhuanjie); //新增比赛环节
router.post("/changehuanjie", changeHuanjie); //设定当前为哪个环节和队伍评分
router.post("/add", add); //评委打分
router.post("/login", login); //评委登录

module.exports = router;

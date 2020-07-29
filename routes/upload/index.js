const router = require("koa-router")();
const multer = require("koa-multer");
const fs = require("fs");
let request = require("request");
let { APPID, APPSECRET } = require("./secret.js");
router.prefix("/upload");
let cacheInfo = {
  ACCESS_TOKEN: "",
  expires_time: 0,
  jsapi_ticket: "",
  signature: "",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "/root/myapp/node_koa/uploads/");
    let folder = "uploads/";
    let params = req._parsedUrl.query || "";
    let arr = params.split("&");
    let query = {};
    for (const param of arr) {
      let key = param.split("=")[0];
      let value = param.split("=")[1];
      query[key] = value;
    }
    let project = query.project || "";
    project = decodeURI(project);
    if (project) {
      folder += project;
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
      }
    }
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
// router.post("/upload", upload.single("file"), ctx => {
//   ctx.body = "上传成功"
// })
router.post("/image", upload.single("file"), function (ctx, next) {
  let folder = "";
  if (ctx.request.query.project) folder = ctx.request.query.project + "/";
  let params = "";
  if (ctx.request.query.shareTitle)
    params += "&shareTitle=" + encodeURI(ctx.request.query.shareTitle);
  if (ctx.request.query.shareDesc)
    params += "&shareDesc=" + encodeURI(ctx.request.query.shareDesc);
  if (ctx.request.query.shareImageUrl)
    params += "&shareImageUrl=" + encodeURI(ctx.request.query.shareImageUrl);
  let data = {
    path: ctx.req.file.path,
    // filename: ctx.req.file.filename, //只传递图片地址
    filename: "index.html?img=" + folder + ctx.req.file.filename + params, //传递网页地址
    contentType: ctx.req.file.mimetype,
  };
  console.log(data);
  ctx.body = {
    status: 1,
    msg: "上传图片成功",
    data: data,
  };
});

router.get("/token", async function (ctx, next) {
  let pageurl = ctx.req.headers.referer;
  let data = null;
  if (checkCacheTokenExp()) {
    cacheInfo.jsapi_ticket = await refreshToken(pageurl);
  }
  data = createUrlSign(pageurl, cacheInfo.jsapi_ticket);

  ctx.body = {
    status: 1,
    msg: "返回token",
    data: data,
  };
});
function checkCacheTokenExp() {
  let now = new Date().getTime();
  let err = cacheInfo.expires_time === 0 || now > cacheInfo.expires_time;
  return err;
}

function createUrlSign(url, ticket) {
  let result = {
    jsapi_ticket: ticket,
    noncestr: Math.random().toString(36).substr(2, 15),
    timestamp: Math.floor(new Date().getTime() / 1000) + "",
    url: url,
  };

  let string1 = `jsapi_ticket=${result.jsapi_ticket}&noncestr=${result.noncestr}&timestamp=${result.timestamp}&url=${result.url}`;
  const jsSHA = require("jssha");
  let shaObj = new jsSHA(string1, "TEXT");
  result.signature = shaObj.getHash("SHA-1", "HEX");
  return result;
}

function refreshToken(pageurl) {
  return new Promise((resolve, reject) => {
    // let APPID = "";
    // let APPSECRET = "";
    let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`;
    let option = {
      url: url, //请求路径
      method: "GET", //请求方式，默认为get
    };
    request(option, async (error, response, body) => {
      if (response.statusCode == 200) {
        // await dirExist.dirExists("./resultDataHB");
        // let fileName = `resultDataHB/${timeStr}环保空气污染指数.json`;
        // fileName = await dirExist.renameJsonFileIfExist(fileName);

        let data = JSON.parse(body);
        if (!data.errcode) {
          let { access_token, expires_in } = data;
          let now = new Date().getTime();
          console.log(now, "刷新token");
          cacheInfo.expires_time = now + expires_in * 1000;
          cacheInfo.ACCESS_TOKEN = access_token;

          let jsapi = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`;
          request({ url: jsapi }, async (err, res, body) => {
            let data = JSON.parse(body);
            if (!data.errcode) {
              resolve(data.ticket);
            } else {
              reject();
            }
          });

          let body = JSON.stringify(data, null, 2);
          // if (global.writeToJSON)
          //   await fs.writeFile(fileName, body, "utf8", (err) => {
          //     if (err) throw err;
          //     console.log("写入完成：" + fileName);
          //   });
        } else {
          reject();
        }
      }
    });
  });
}
// router.post('/image', upload.single('avatar').then((ctx, next) =>{
//   let data = {
//     path: ctx.request.file.path,
//     filename: ctx.request.file.filename,
//     contentType: ctx.request.file.mimetype
//   }

//   ctx.body ={
//     status: 1,
//     msg: '上传图片成功',
//     data: data
//   }
// }))

module.exports = router;

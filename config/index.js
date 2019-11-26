let secret = {
  jwtsecret: "Jwtsecret_needchangesdfnow", //密码
  expiresIn: 60 * 60 * 24 * 1 //token过期时间
};
try {
  secret = require("./secret");
} catch (error) {}

module.exports = {
  jwtsecret: secret.jwtsecret, //密码
  expiresIn: secret.expiresIn //token过期时间
};

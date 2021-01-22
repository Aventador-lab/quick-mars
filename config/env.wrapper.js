const pkgJSON = require("../package.json");

const localEnv = require("./.env.locale");

const mixinProperty = (key, defaultValue = "") => {
  return process.env[key] || localEnv[key] || defaultValue;
};
const pkgVer = pkgJSON.version||'0.0.0'



module.exports = {
  APP_NAME:mixinProperty('APP_NAME','QMars-server'),
  APP_VERSION:mixinProperty('APP_VERSION',pkgVer),
  NODE_ENV:mixinProperty('NODE_ENV','production'),
  PORT:parseInt(mixinProperty('PORT','3456')),
  MONGODB_URL:mixinProperty('MONGODB_URL','')
}

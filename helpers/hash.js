const crypto = require('crypto');

const SALT = process.env.TOKEN_SALT || '';

const md5 = (string/*:string*/)/*:string*/ => {
  return crypto.createHash('md5').update(string,'utf8').digest('hex');  
}

module.exports = (string/*:string*/, salt/*:?string*/ = SALT)/*:string*/ => {
  const email = string.trim();
  return md5(email.concat(salt));
}
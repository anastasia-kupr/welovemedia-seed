const crypto = require('crypto');

module.exports = (string) => {
  return crypto
    .createHash('md5')
    .update(string.trim(), 'utf8')
    .digest('hex');
};
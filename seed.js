require('dotenv').config({path: __dirname + '/.env'});
const fs = require("fs");

const md5 = require('./helpers/md5');
const getHash = require('./helpers/hash');

const count = process.env.COUNT || 5000;
const filename = `./seeds/subsctibers-${count}.sql`;

var stream = fs.createWriteStream(filename, {flags: 'w'});

module.exports = async () => {


  const domains = [
    "mailer-wld.pl"
  ]

  stream.write(`INSERT INTO "subscribers"
  ("mailings",
  "active",
  "base_limit",
  "base_id",
  "name",
  "email",
  "token",
  "md5",
  "domain",
  "lead_active",
  "gender",
  "year_of_birth",
  "city",
  "province",
  "created",
  "attr_str_1")  VALUES\n`);
  const count2 = 10;
  for (let i = 0; i < count - 1; i += count2) { //50000000
    let output = '';

    for (let b = i; b < i + count2; b++) {
      const base_id = b < i + count2 / 2 ? 1 : 2;
      const name = randomString(20);
      const email = `${name}0${i}@${domains[0]}`;
      const token = getHash(email);
      const subscriberMd5 = md5(email);
      const year_of_birth = Math.floor(Math.random() * 85) + 1933;
      const lead_active = Math.floor(Math.random() * 10);
      const gender = !!(Math.floor(Math.random() * 2));
      const city = Math.floor(Math.random() * 85);
      const province = Math.floor(Math.random() * 16);
      output += `('{}',true,10,${base_id},'name_${name}0${i}@${domains[0]}','${email}',decode('${token}', 'hex'),decode('${subscriberMd5}', 'hex'),'${domains[0]}','${lead_active}',${gender},${year_of_birth},${city},${province},'2018-12-12 22:34:15','surname_${name}000000000${i}@${domains[0]}'),\n`;
    }

    stream.write(output);
  }

  const base_id = 1;
  const name = randomString(20);
  const email = `${name}00@${domains[0]}`;
  const token = getHash(email);
  const subscriberMd5 = md5(email);
  const year_of_birth = Math.floor(Math.random() * 85) + 1933;
  const lead_active = Math.floor(Math.random() * 10);
  const gender = !!(Math.floor(Math.random() * 2));
  const city = Math.floor(Math.random() * 85);
  const province = Math.floor(Math.random() * 16);
  const lastOutput = `('{}',true,10,${base_id},'name_${name}00@${domains[0]}','${email}',decode('${token}', 'hex'),decode('${subscriberMd5}', 'hex'),'${domains[0]}','${lead_active}',${gender},${year_of_birth},${city},${province},'2018-12-12 22:34:15','surname_${name}0000000000@${domains[0]}');`;

  stream.write(lastOutput);

};

function randomString(len, charSet) {
  charSet = charSet || 'abcdefghijklmnopqrstuvwxyz';
  let randomString = '';
  for (let i = 0; i < len; i++) {
    let randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}

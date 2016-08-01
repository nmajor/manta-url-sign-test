require('dotenv').config({ silent: true });
require('babel-register');
require('babel-polyfill');

console.log(process.env.MANTA_APP_USER);

import manta from 'manta';
import request from 'request';

function daysFromNow(days) {
  const someDate = new Date();
  someDate.setDate(someDate.getDate() + days);
}

const client = manta.createClient({
  sign: manta.privateKeySigner({
    key: process.env.MANTA_APP_KEY.replace(/\\n/g, '\n'),
    keyId: process.env.MANTA_APP_KEY_ID,
    user: process.env.MANTA_APP_USER,
  }),
  user: process.env.MANTA_APP_USER,
  url: process.env.MANTA_APP_URL,
  connectTimeout: 25000,
});

// https://us-east.manta.joyent.com//nmajor/public/emailgate/compilations/rkIBle-O/email-rJe-0sgebu.pdf

const options = {
  // algorithm: opts.algorithm,
  expires: daysFromNow(5),
  // host: url.parse(opts.url).host,
  keyId: process.env.MANTA_APP_KEY_ID,
  // log: opts.log,
  // method: 'HEAD',
  method: 'OPTIONS',
  // role: opts.role,
  // 'role-tag': opts['role-tag'],
  path: '/nmajor/public/emailgate/compilations/rkIBle-O/email-rJe-0sgebu.pdf',
  // sign: client.sign,
  // user: 'nmajor',
  // subuser: 'emailgate',
  // mantaSubUser: true,
};


function buildUrl() {
  return new Promise((resolve) => {
    client.signURL(options, (err, resource) => {
      if (err) { console.log('Error! ', err); return; }

      resolve(`https://us-east.manta.joyent.com${resource}`);
    });
  });
}

buildUrl()
.then((url) => {
  request({
    method: 'OPTIONS',
    // method: 'GET',
    uri: url,
  }, (error, response, body) => {
    if (error) {
      console.error('upload failed:', error);
      return;
    }

    console.log('Response:', response);
    console.log('Body:', body);
  });
});

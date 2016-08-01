'use strict';

var _manta = require('manta');

var _manta2 = _interopRequireDefault(_manta);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config({ silent: true });
require('babel-register');
require('babel-polyfill');

console.log(process.env.MANTA_APP_USER);

function daysFromNow(days) {
  var someDate = new Date();
  someDate.setDate(someDate.getDate() + days);
}

var client = _manta2.default.createClient({
  sign: _manta2.default.privateKeySigner({
    key: process.env.MANTA_APP_KEY.replace(/\\n/g, '\n'),
    keyId: process.env.MANTA_APP_KEY_ID,
    user: process.env.MANTA_APP_USER
  }),
  user: process.env.MANTA_APP_USER,
  url: process.env.MANTA_APP_URL,
  connectTimeout: 25000
});

// https://us-east.manta.joyent.com//nmajor/public/emailgate/compilations/rkIBle-O/email-rJe-0sgebu.pdf

var options = {
  // algorithm: opts.algorithm,
  expires: daysFromNow(5),
  // host: url.parse(opts.url).host,
  keyId: process.env.MANTA_APP_KEY_ID,
  // log: opts.log,
  // method: 'HEAD',
  method: 'OPTIONS',
  // role: opts.role,
  // 'role-tag': opts['role-tag'],
  path: '/nmajor/public/emailgate/compilations/rkIBle-O/email-rJe-0sgebu.pdf'
};

function buildUrl() {
  return new Promise(function (resolve) {
    client.signURL(options, function (err, resource) {
      if (err) {
        console.log('Error! ', err);return;
      }

      resolve('https://us-east.manta.joyent.com' + resource);
    });
  });
}

buildUrl().then(function (url) {
  (0, _request2.default)({
    method: 'OPTIONS',
    // method: 'GET',
    uri: url
  }, function (error, response, body) {
    if (error) {
      console.error('upload failed:', error);
      return;
    }

    console.log('Response:', response);
    console.log('Body:', body);
  });
});
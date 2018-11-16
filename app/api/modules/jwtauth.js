'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const jwtSecret = process.env.JWT_SECRET;

// Sign a JWT and return a promise with it
const jwtSign = payload => new Promise((resolve, reject) => {
  _jsonwebtoken2.default.sign({ payload }, jwtSecret, {
    expiresIn: Math.floor(Date.now() / 1000) //+ (60 * 60),
  }, (err, genToken) => {
    if (err) {
      reject(err);
    } else {
      resolve(genToken);
    }
  });
});

// Verify token
const jwtVerify = token => new Promise((resolve, reject) => {
  const tokenToCheck = token.split(' ')[1];
  _jsonwebtoken2.default.verify(tokenToCheck, jwtSecret, (err, decoded) => {
    if (err) {
      reject(err);
    } else {
      console.log(decoded);
      resolve(decoded);
    }
  });
});

exports.default = { jwtSign, jwtVerify };
//# sourceMappingURL=jwtauth.js.map
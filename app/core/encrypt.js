'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareHash = exports.genHash = undefined;

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saltRounds = 10;
const pepper = process.env.PEPPER || '11';

// adds a pepper from server and returns a fixed length password.
const addPepper = plainPassword => {
  if (!pepper) {
    throw new Error('No internal pepper set');
  }
  const hmac = _crypto2.default.createHmac('sha1', pepper);
  hmac.update(plainPassword);
  return hmac.digest('hex');
};

// returns a promise with the generated salt
// need to save salt to database
const genSalt = rounds => new Promise((resolve, reject) => {
  _bcrypt2.default.genSalt(rounds, (err, salt) => {
    if (err) reject(err);else resolve(salt);
  });
});

// returns a promise with password hash from plain password.
const genHash = plainPassword => new Promise((resolve, reject) => {
  // uses function addPepper to pepper the password before salting it
  let pepperedPassword;
  try {
    pepperedPassword = addPepper(plainPassword);
  } catch (err) {
    reject(err);
  }
  // generates Salt and then uses it to hash the peppered password
  genSalt(saltRounds).then(dataSalt => {
    // uses the generated salt and the peppered password to return a hashed password to store in DB
    _bcrypt2.default.hash(pepperedPassword, dataSalt, (err, hashedPassword) => {
      if (err) reject(err);else resolve(hashedPassword);
    });
    // catches the error from the genSalt function
  }).catch(err => {
    throw new Error('function genSalt - encrypt.js, Salt generation failed', err);
  });
});

// compares plain password with stored hash from DB returns promise with boolean value
const compareHash = (plainPassword, dbHash) => new Promise((resolve, reject) => {
  // uses function addPepper to pepper the password before checking equality.
  const pepperedPassword = addPepper(plainPassword);
  // compares peppered password with the password from DB
  _bcrypt2.default.compare(pepperedPassword, dbHash, (err, result) => {
    if (err) reject(err);else resolve(result);
  });
});

// For local testing
// genHash('rami')
//   .then((myHash) => {
//     compareHash('rami', myHash)
//       .then(data => console.log(data))
//       .catch(err => console.log(err));
//   }).catch(err => console.log(err));

exports.genHash = genHash;
exports.compareHash = compareHash;
//# sourceMappingURL=encrypt.js.map
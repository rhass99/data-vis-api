'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
const pepper = process.env.PEPPER;

// adds a pepper from server and returns a fixed length password.
const addPepper = toHMAC => {
  if (!pepper) {
    throw new Error('No internal Password hasher');
  }
  const hmac = _crypto2.default.createHmac('sha1', pepper);
  hmac.update(toHMAC);
  return hmac.digest('hex');
};

const comparePassword = async (plainPassword, hash) => {
  // uses function addPepper to pepper the password before checking equality.
  const pepperedPassword = addPepper(plainPassword);
  try {
    const truth = await _bcrypt2.default.compare(pepperedPassword, hash);
    return truth;
  } catch (err) {
    throw err;
  }
};

// Returns a promise with updated object with new keys
// password_salt and password_hash
const hashPassword = async clientUserAcc => {
  // uses function addPepper to pepper the password before checking equality.
  const pepperedPassword = addPepper(clientUserAcc.password_hash);
  try {
    // Creates salt and adds it to the clientUserAcc
    const dataSalt = await _bcrypt2.default.genSalt(saltRounds);
    clientUserAcc.password_salt = dataSalt;
    // Hashes password and adds it to ClientUserAcc
    const dataHash = await _bcrypt2.default.hash(pepperedPassword, dataSalt);
    clientUserAcc.password_hash = dataHash;
    clientUserAcc.password_strength = saltRounds;
  } catch (err) {
    throw err;
  }
  // Returns a Promise of the ClientUserAccount
  return clientUserAcc;
};

// Check for account password - used in UserAccount middleware
const checkUserAccountPass = async (plain, hash) => {
  let isRegistered = false;
  try {
    isRegistered = await comparePassword(plain, hash);
  } catch (err) {
    throw err;
  }
  return isRegistered;
};

exports.default = {
  hashPassword,
  comparePassword,
  saltRounds,
  checkUserAccountPass
};

// // For local testing promise based bcrypt not used
// genSalt().then((salt) => {
//   genHash('rami', salt)
//     .then((myHash) => {
//       compareHash('rami', myHash)
//         .then(data => console.log(data))
//         .catch(err => console.log(err));
//     }).catch(err => console.log(err));
// }).catch(err => console.log(err));

// const myObj = {
//   password: '123',
// };

// hashPassword(myObj)
//   .then((data) => {
//     comparePassword(myObj.password, data.password_hash)
//       .then(truth => console.log(truth))
//       .catch(err => console.log('compare', err));
//   })
//   .catch(err => console.log('hash', err));
//# sourceMappingURL=encrypt.js.map
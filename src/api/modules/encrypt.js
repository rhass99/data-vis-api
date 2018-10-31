import bcrypt from 'bcrypt';
import crypto from 'crypto';

const saltRounds = 10;
const pepper = process.env.PEPPER;

// adds a pepper from server and returns a fixed length password.
const addPepper = (toHMAC) => {
  if (!pepper) {
    throw new Error('No internal Password hasher');
  }
  const hmac = crypto.createHmac('sha1', pepper);
  hmac.update(toHMAC);
  return hmac.digest('hex');
};

const comparePassword = async (plainPassword, hash) => {
  // uses function addPepper to pepper the password before checking equality.
  const pepperedPassword = addPepper(plainPassword);
  try {
    const truth = await bcrypt.compare(pepperedPassword, hash);
    return truth;
  } catch (err) {
    throw (err);
  }
};


// Returns a promise with updated object with new keys
// password_salt and password_hash
const hashPassword = async (clientUserSignup) => {
  const clientUserAcc = clientUserSignup;
  // uses function addPepper to pepper the password before checking equality.
  const pepperedPassword = addPepper(clientUserAcc.password);
  try {
    // Creates salt and adds it to the clientUserAcc
    const dataSalt = await bcrypt.genSalt(saltRounds);
    clientUserAcc.password_salt = dataSalt;
    // Hashes password and adds it to ClientUserAcc
    const dataHash = await bcrypt.hash(pepperedPassword, dataSalt);
    clientUserAcc.password_hash = dataHash;
  } catch (err) {
    throw (err);
  }
  // Returns a Promise of the ClientUserAccount
  return clientUserAcc;
};

export {
  hashPassword,
  comparePassword,
  saltRounds,
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
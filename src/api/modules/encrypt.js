import bcrypt from 'bcrypt';
import crypto from 'crypto';

const saltRounds = 10;
const pepper = process.env.PEPPER;
// const idGen = process.env.IDGEN;

// adds a pepper from server and returns a fixed length ID.
// const idGenerator = (toHMAC) => {
//   if (!idGen) {
//     throw new Error('No internal idGenerator');
//   }
//   const hmac = crypto.createHmac('sha1', pepper);
//   hmac.update(toHMAC);
//   return hmac.digest('hex');
// };

// adds a pepper from server and returns a fixed length password.
const addPepper = (toHMAC) => {
  if (!pepper) {
    throw new Error('No internal Password hasher');
  }
  const hmac = crypto.createHmac('sha1', pepper);
  hmac.update(toHMAC);
  return hmac.digest('hex');
};

// returns a promise with the generated salt
// need to save salt to database
const genSalt = () => new Promise((resolve, reject) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) reject(err);
    else resolve(salt);
  });
});

// returns a promise with password hash from plain password.
const genHash = (plainPassword, dataSalt) => new Promise((resolve, reject) => {
  // uses function addPepper to pepper the password before salting it
  let pepperedPassword;
  try {
    pepperedPassword = addPepper(plainPassword);
  } catch (err) {
    reject(err);
  }
  // uses the generated salt and the peppered password to return a hashed password to store in DB
  bcrypt.hash(pepperedPassword, dataSalt, (err, hashedPassword) => {
    if (err) reject(err);
    else resolve(hashedPassword);
  });
});

// compares plain password with stored hash from DB returns promise with boolean value
const compareHash = (plainPassword, dbHash) => new Promise((resolve, reject) => {
  // uses function addPepper to pepper the password before checking equality.
  const pepperedPassword = addPepper(plainPassword);
  // compares peppered password with the password from DB
  bcrypt.compare(pepperedPassword, dbHash, (err, result) => {
    if (err) reject(err);
    else resolve(result);
  });
});

// For local testing
// genHash('rami')
//   .then((myHash) => {
//     compareHash('rami', myHash)
//       .then(data => console.log(data))
//       .catch(err => console.log(err));
//   }).catch(err => console.log(err));

export {
  genHash,
  compareHash,
  genSalt,
  saltRounds,
};
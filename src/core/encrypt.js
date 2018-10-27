import bcrypt from 'bcrypt';
import crypto from 'crypto';

const saltRounds = 10;
const pepper = process.env.PEPPER;

// adds a pepper from server and returns a fixed length password.
const addPepper = (plainPassword) => {
  if (!pepper) {
    throw new Error('No internal pepper set');
  }
  const hmac = crypto.createHmac('sha1', pepper);
  hmac.update(plainPassword);
  return hmac.digest('hex');
};

// returns a promise with the generated salt
// need to save salt to database
const genSalt = rounds => new Promise((resolve, reject) => {
  bcrypt.genSalt(rounds, (err, salt) => {
    if (err) reject(err);
    else resolve(salt);
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
  genSalt(saltRounds).then((dataSalt) => {
    // uses the generated salt and the peppered password to return a hashed password to store in DB
    bcrypt.hash(pepperedPassword, dataSalt, (err, hashedPassword) => {
      if (err) reject(err);
      else resolve(hashedPassword);
    });
    // catches the error from the genSalt function
  }).catch((err) => {
    throw new Error('function genSalt - encrypt.js, Salt generation failed', err);
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
};
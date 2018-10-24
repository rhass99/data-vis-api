import bcrypt from 'bcrypt';
import crypto from 'crypto';

const saltRounds = 10;
const pepper = process.env.PEPPER;

// adds a pepper from server and returns a fixed length password.
const addPepper = (plainPassword) => {
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
  const pepperedPassword = addPepper(plainPassword);
  genSalt(saltRounds).then((dataSalt) => {
    bcrypt.hash(pepperedPassword, dataSalt, (err, hashedPassword) => {
      if (err) reject(err);
      else resolve(hashedPassword);
    });
  });
});

// compares plain password with stored hash from DB returns promise with boolean value
const compareHash = (plainPassword, dbHash) => new Promise((resolve, reject) => {
  const pepperedPassword = addPepper(plainPassword);
  bcrypt.compare(pepperedPassword, dbHash, (err, result) => {
    if (err) reject(err);
    else resolve(result);
  });
});

genHash('rami').then((myHash) => {
  compareHash('ramiii', myHash).then(data => console.log(data));
});


console.log('me first');
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

// Sign a JWT and return a promise with it
const jwtSign = payload => new Promise((resolve, reject) => {
  jwt.sign({ payload }, jwtSecret, {
    expiresIn: Math.floor(Date.now() / 1000), //+ (60 * 60),
  },
  (err, genToken) => {
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
  jwt.verify(tokenToCheck, jwtSecret, (err, decoded) => {
    if (err) {
      reject(err);
    } else {
      console.log(decoded);
      resolve(decoded);
    }
  });
});

export default { jwtSign, jwtVerify };
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

const jwtSign = payload => new Promise((resolve, reject) => {
  jwt.sign({ payload }, jwtSecret, {
    expiresIn: Math.floor(Date.now() / 1000) + (60 * 60),
  },
  (err, genToken) => {
    if (err) {
      reject(err);
    } else {
      resolve(genToken);
    }
  });
});

export default jwtSign;
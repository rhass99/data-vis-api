import db from '../../models/index';
import { genHash, genSalt, saltRounds } from './encrypt';

const checkUserAccount = (email) => {
  db.UserAccount.findOne({ where: { email } })
    .then(account => account)
    .catch(err => console.log(err));
};

const addUserAccount = (userAccount) => {
  genSalt()
    .then((dataSalt) => {
      userAccount.password_salt = dataSalt;
      genHash(userAccount.password, dataSalt)
        .then((hashedPassword) => {
          userAccount.password_hash = hashedPassword;
          db.UserAccount.create({
            first_name: userAccount.first_name,
            last_name: userAccount.last_name,
            email: userAccount.email,
            password_hash: userAccount.password_hash,
            password_strength: saltRounds,
            password_salt: userAccount.password_salt,
          })
            .then(data => data)
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

export {
  addUserAccount,
};
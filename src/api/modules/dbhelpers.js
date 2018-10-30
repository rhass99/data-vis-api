import db from '../../models/index';
import { genHash, genSalt, saltRounds } from './encrypt';

const addUserAccount = async (userAccount) => {
  try {
    const dataSalt = await genSalt();
    userAccount.password_salt = dataSalt;
    const dataHash = await genHash(userAccount.password, dataSalt);
    userAccount.password_hash = dataHash;
    const createdUserAccount = await db.UserAccount.create({
      first_name: userAccount.first_name,
      last_name: userAccount.last_name,
      email: userAccount.email,
      password_hash: userAccount.password_hash,
      password_strength: saltRounds,
      password_salt: userAccount.password_salt,
    });
    return createdUserAccount;
  } catch (err) {
    // console.log(err);
    return err;
  }
};

export default addUserAccount;
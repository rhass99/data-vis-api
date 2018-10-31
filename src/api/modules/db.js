import db from '../../models/index';
import {
  genHash, genSalt, saltRounds, compareHash,
} from './encrypt';

// Create a new UserAccount in DB
const addUserAccount = async (clientUserSignup) => {
  // Mutate the clientUserAcc and then pass it to "create" function to add to DB
  const clientUserAcc = clientUserSignup;
  try {
    // Generates Salt and adds it to userAccount object
    const dataSalt = await genSalt();
    clientUserAcc.password_salt = dataSalt;
    // Generates password hash and adds it to userAccount object
    const dataHash = await genHash(clientUserAcc.password, dataSalt);
    clientUserAcc.password_hash = dataHash;
    // Creates UserAccount in DB using db object created by sequelize
    const dbCreatedUserAccount = await db.UserAccount.create({
      first_name: clientUserAcc.first_name,
      last_name: clientUserAcc.last_name,
      email: clientUserAcc.email,
      password_hash: clientUserAcc.password_hash,
      password_strength: saltRounds,
      password_salt: clientUserAcc.password_salt,
    });
    return dbCreatedUserAccount;
  } catch (err) {
    // Throws the error to the middleware function to be passed on express error handler
    throw err;
  }
};

// Search DB for UserAccount by email to check if it Exists.
const findByEmail = async (email) => {
  let data;
  try {
    // Checks for UserAccount existence in DB by email
    data = await db.UserAccount.findOne({ where: { email } });
    if (!data) {
      // Null is passed on to the createUser function to let it create new UserAccount
      return null;
    }
  } catch (err) {
    // Throws the error to the middleware function to be passed on express error handler
    throw err;
  }
  return data;
};

const checkUserAccountPass = async (plain, hash) => {
  let isRegistered = false;
  try {
    isRegistered = await compareHash(plain, hash);
  } catch (err) {
    throw err;
  }
  return isRegistered;
};

export {
  findByEmail,
  addUserAccount,
  checkUserAccountPass,
};
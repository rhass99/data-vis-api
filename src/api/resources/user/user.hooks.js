import db from '../../../models/index';
import encrypt from '../../modules/encrypt';


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

// Check for account password
const checkUserAccountPass = async (plain, hash) => {
  let isRegistered = false;
  try {
    isRegistered = await compareHash(plain, hash);
  } catch (err) {
    throw err;
  }
  return isRegistered;
};

// Create a new user on signup after checking existance in DB
const createUser = async (clientUserAccount) => {
  try {
    // Check UserAccount already exists in DB
    const userCheck = await findByEmail(clientUserAccount.email);
    // If UserAccount is new, add it to DB and return it.
    if (!userCheck) {
      return encrypt.hashPassword(clientUserAccount);
    }
    const existsError = new Error('User Exists in Database, cannot create');
    throw existsError;
  } catch (err) {
    return db.sequelize.Promise.reject(err);
  }
};

export default {
  createUser,
  findByEmail,
  checkUserAccountPass,
};
import db from '../../models/index';

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
  checkUserAccountPass,
};
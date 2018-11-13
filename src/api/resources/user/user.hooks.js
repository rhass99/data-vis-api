import db from '../../../models/index';
import encrypt from '../../modules/encrypt';

// Create a new user on signup after checking existance in DB
const createUser = async (clientUserAccount) => {
  try {
    // Check UserAccount already exists in DB
    const userCheck = await db.UserAccount.findOne({ where: { email: clientUserAccount.email } });
    // If UserAccount is new, add it to DB and return it.
    if (!userCheck) {
      return encrypt.hashPassword(clientUserAccount);
    }
    const existsError = new Error('User already exists');
    throw existsError;
  } catch (err) {
    return db.sequelize.Promise.reject(err);
  }
};

export default {
  createUser,
};
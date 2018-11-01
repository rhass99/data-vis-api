import db from '../../../models/index';
import { findByEmail } from '../../modules/db';
import encrypt from '../../modules/encrypt';

// Create a new user on signup after checking existance in DB
const createUser = async (clientUserAccount) => {
  try {
    // Check UserAccount already exists in DB
    const userCheck = await findByEmail(clientUserAccount.email);
    // If UserAccount is new, add it to DB and return it with the lable "exists = false"
    if (!userCheck) {
      return encrypt.hashPassword(clientUserAccount);
    }
    const existsError = new Error('Already exists');
    throw existsError;
  } catch (err) {
    return db.sequelize.Promise.reject(err);
  }
};

module.exports = {
  createUser,
};
import db from '../../../models/index';
import { findByEmail, addUserAccount, checkUserAccountPass } from '../../modules/db';

// Create a new user on signup after checking existance in DB
const createUser = async (req, res, next) => {
  try {
    // Check UserAccount already exists in DB
    const userCheck = await findByEmail(req.body.email);
    // If UserAccount is new, add it to DB and return it with the lable "exists = false"
    if (!userCheck) {
      res.locals.data = await addUserAccount(req.body);
      res.locals.data.exists = false;
    } else {
      // Return UserAccount if already exists with lable "exists = true"
      res.locals.data = userCheck;
      res.locals.data.exists = true;
    }
  } catch (err) {
    next(err);
  }
  next();
};

// Search DB for UserAccount by ID
// Used as middleware by restRouter Param function
const findByParam = async (req, res, next, id) => {
  try {
    const data = await db.UserAccount.findByPk(id);
    if (data) {
      res.locals.data = data;
    }
  } catch (err) {
    next(err);
  }
  next();
};

// Check if user exists and provided correct password
const authUser = async (req, res, next) => {
  try {
    // Check UserAccount already exists in DB
    const userCheck = await findByEmail(req.body.email);
    // If UserAccount is registered, pass it to check password.
    if (userCheck) {
      const isRegistered = await checkUserAccountPass(req.body.password, userCheck.password_hash);
      if (isRegistered) {
        // Return UserAccount and password correct
        res.locals.data = {
          UserAccount: true,
          UserPassword: true,
        };
      } else {
        // Return UserAccount exists, password wrong
        res.locals.data = {
          UserAccount: true,
          UserPassword: false,
        };
      }
    } else {
      // Return UserAccount is invalid
      res.locals.data = {
        UserAccount: false,
        UserPassword: false,
      };
    }
  } catch (err) {
    next(err);
  }
  next();
};

export {
  createUser,
  findByParam,
  authUser,
};
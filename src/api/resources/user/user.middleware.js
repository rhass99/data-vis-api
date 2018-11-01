import db from '../../../models/index';
import helpers from './user.hooks';

// Create a new user on signup after checking existance in DB
const createUser = async (req, res, next) => {
  try {
    res.locals.data = await db.UserAccount.create(req.body);
    res.locals.data.exists = false;
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
    const userCheck = await helpers.findByEmail(req.body.email);
    // If UserAccount is registered, pass it to check password.
    if (userCheck) {
      const isRegistered = await helpers.checkUserAccountPass(req.body.password, userCheck.password_hash);
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
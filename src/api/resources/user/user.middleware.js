import db from '../../../models/index';
import { findByEmail, addUserAccount } from '../../modules/db';

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

const playme = (req, res, next) => {
  req.body = {};
  req.body.user = 'rami';
  next();
};

export {
  createUser,
  findByParam,
  playme,
};
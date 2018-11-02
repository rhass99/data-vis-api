import db from '../../../models/index';
import encrypt from '../../modules/encrypt';

// Create a new user on signup after checking existance in DB
const createUser = async (req, res, next) => {
  try {
    // Configure passed object to controller
    // Runs createUser Hook before creating the User
    // Hook checks if user exists and hashes password
    const data = await db.UserAccount.create(req.body);
    data.exists = false;
    res.locals.data = {
      id: data.id,
      email: data.email,
      user_existed: data.exists,
    };
  } catch (err) {
    next(err);
  }
  next();
};

// Search DB for UserAccount by ID
// Used as middleware by restRouter Param function
const findById = async (req, res, next, id) => {
  try {
    const data = await db.UserAccount.findByPk(id);
    if (data) {
      // Configure passed object to the controller
      res.locals.data = {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password_hash: data.password_hash,
      };
    }
  } catch (err) {
    next(err);
  }
  next();
};

// Search DB for UserAccount by email.
// Used as middleware by restRouter Param function
const findByEmail = async (req, res, next, email) => {
  try {
    // Checks for UserAccount existence in DB by email
    const data = await db.UserAccount.findOne({ where: { email } });
    if (data) {
      // Configure passed object to the controller
      res.locals.data = {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password_hash: data.password_hash,
      };
    }
  } catch (err) {
    next(err);
  }
  next();
};

// Check if user exists and provided correct password
const loginUser = async (req, res, next) => {
  try {
    // Check UserAccount already exists in DB
    const userCheck = await db.UserAccount.findOne({ where: { email: req.body.email } });
    // If UserAccount is registered, pass it to check password.
    if (userCheck) {
      const isRegistered = await encrypt.checkUserAccountPass(req.body.password_hash, userCheck.password_hash);
      if (isRegistered) {
        // Return UserAccount and password correct
        res.locals.data = {
          userAccount: true,
          userPassword: true,
          userData: {
            id: userCheck.id,
            email: userCheck.email,
            first_name: userCheck.first_name,
            last_name: userCheck.last_name,
          },
        };
      } else {
        // Return UserAccount exists, password wrong, empty user
        res.locals.data = {
          userAccount: true,
          userPassword: false,
          userData: {},
        };
      }
    } else {
      // Return UserAccount is invalid, empty user
      res.locals.data = {
        userAccount: false,
        userPassword: false,
        userData: {},
      };
    }
  } catch (err) {
    next(err);
  }
  next();
};

export default {
  createUser,
  findById,
  findByEmail,
  loginUser,
};
import db from '../../../models/index';
import encrypt from '../../modules/encrypt';
import jw from '../../modules/jwtauth';

// Create a new user on signup after checking existance in DB
const createUser = async (req, res, next) => {
  try {
    // Configure passed object to controller - DONE
    // Runs createUser Hook before creating the User
    // Hook checks if user exists and hashes password
    const data = await db.UserAccount.create(req.body);
    // JWT token generation
    const generatedToken = await jw.jwtSign({
      id: data.id,
      status: 'user',
    });
    data.exists = false;
    res.locals.data = {
      token: generatedToken,
      user_existed: data.exists,
    };
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
        // JWT token generation
        const generatedToken = await jw.jwtSign({
          id: userCheck.id,
          status: 'user',
        });
        // Return UserAccount and password correct
        res.locals.data = {
          userAccount: true,
          userPassword: true,
          token: generatedToken,
        };
      } else {
        // Return UserAccount exists, password wrong, empty user
        res.locals.data = {
          userAccount: true,
          userPassword: false,
          token: {},
        };
      }
    } else {
      // Return UserAccount is invalid, empty user
      res.locals.data = {
        userAccount: false,
        userPassword: false,
        token: {},
      };
    }
  } catch (err) {
    next(err);
  }
  next();
};

const checkToken = async (req, res, next) => {
  try {
    // Get the decoded token from jwtVerify
    if (req.headers.authorization) {
      const decodedToken = await jw.jwtVerify(req.headers.authorization);
      // Check user exists in Database
      // Returns userID and email
      if (decodedToken.payload.id === req.params.id) {
        const data = await db.UserAccount.findByPk(decodedToken.payload.id);
        if (data) {
          // Configure passed object to the controller
          res.locals.data = {
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
          };
        }
      } else {
        const userError = new Error('JWT compromised');
        throw userError;
      }
    } else {
      const noTokenErro = new Error('No Token');
      throw noTokenErro;
    }
  } catch (err) {
    next(err);
  }
  next();
};

export default {
  createUser,
  loginUser,
  checkToken,
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../models/index');

var _index2 = _interopRequireDefault(_index);

var _encrypt = require('../../modules/encrypt');

var _encrypt2 = _interopRequireDefault(_encrypt);

var _jwtauth = require('../../modules/jwtauth');

var _jwtauth2 = _interopRequireDefault(_jwtauth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a new user on signup after checking existance in DB
const createUser = async (req, res, next) => {
  try {
    // Configure passed object to controller - DONE
    // Runs createUser Hook before creating the User
    // Hook checks if user exists and hashes password
    const data = await _index2.default.UserAccount.create(req.body);
    // JWT token generation
    const generatedToken = await _jwtauth2.default.jwtSign({
      id: data.id,
      status: 'user'
    });
    data.exists = false;
    res.locals.data = {
      token: generatedToken,
      id: data.id,
      user_existed: data.exists
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
    const userCheck = await _index2.default.UserAccount.findOne({ where: { email: req.body.email } });
    // If UserAccount is registered, pass it to check password.
    if (userCheck) {
      const isRegistered = await _encrypt2.default.checkUserAccountPass(req.body.password_hash, userCheck.password_hash);
      if (isRegistered) {
        // JWT token generation
        const generatedToken = await _jwtauth2.default.jwtSign({
          id: userCheck.id,
          status: 'user'
        });
        // Return UserAccount and password correct
        res.locals.data = {
          userAccount: true,
          userPassword: true,
          token: generatedToken
        };
      } else {
        // Return UserAccount exists, password wrong, empty user
        res.locals.data = {
          userAccount: true,
          userPassword: false,
          token: {}
        };
      }
    } else {
      // Return UserAccount is invalid, empty user
      res.locals.data = {
        userAccount: false,
        userPassword: false,
        token: {}
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
      const decodedToken = await _jwtauth2.default.jwtVerify(req.headers.authorization);
      // Check user exists in Database
      // Returns userID and email
      if (decodedToken.payload.id === req.params.id) {
        const data = await _index2.default.UserAccount.findByPk(decodedToken.payload.id);
        if (data) {
          // Configure passed object to the controller
          res.locals.data = {
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email
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

exports.default = {
  createUser,
  loginUser,
  checkToken
};
//# sourceMappingURL=user.middleware.js.map
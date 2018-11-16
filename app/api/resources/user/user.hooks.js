'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../models/index');

var _index2 = _interopRequireDefault(_index);

var _encrypt = require('../../modules/encrypt');

var _encrypt2 = _interopRequireDefault(_encrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a new user on signup after checking existance in DB
const createUser = async clientUserAccount => {
  try {
    // Check UserAccount already exists in DB
    const userCheck = await _index2.default.UserAccount.findOne({ where: { email: clientUserAccount.email } });
    // If UserAccount is new, add it to DB and return it.
    if (!userCheck) {
      return _encrypt2.default.hashPassword(clientUserAccount);
    }
    const existsError = new Error('User already exists');
    throw existsError;
  } catch (err) {
    return _index2.default.sequelize.Promise.reject(err);
  }
};

exports.default = {
  createUser
};
//# sourceMappingURL=user.hooks.js.map
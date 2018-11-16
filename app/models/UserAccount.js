'use strict';

var _user = require('../api/resources/user/user.hooks');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (sequelize, DataTypes) => {
  const UserAccount = sequelize.define('UserAccount', {
    id: {
      type: DataTypes.UUID,
      defaultValue: new DataTypes.UUIDV4(),
      primaryKey: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    password_strength: DataTypes.INTEGER,
    password_salt: DataTypes.STRING
  }, {
    hooks: {
      async beforeCreate(userAccount) {
        await _user2.default.createUser(userAccount);
      }
    }
  });

  UserAccount.playme = () => {
    console.log('playme123');
  };
  return UserAccount;
};
//# sourceMappingURL=UserAccount.js.map
'use strict';

const up = (queryInterface, Sequelize) => queryInterface.createTable('UserAccounts', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password_strength: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  password_salt: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
}, {
  indexes: [{
    unique: true,
    fields: ['id', 'email']
  }]
});

const down = (queryInterface, Sequelize) => queryInterface.dropTable('UserAccounts');
/*
    Add reverting commands here.
    Return a promise to correctly handle asynchronicity.

    Example:
*/
module.exports = {
  up, down
};
//# sourceMappingURL=20181028215233-create-UserLogin-model.js.map
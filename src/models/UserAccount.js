module.exports = (sequelize, DataTypes) => {
  const UserAccount = sequelize.define('UserAccount', {
    id: {
      type: DataTypes.UUID,
      defaultValue: new DataTypes.UUIDV4(),
      primaryKey: true,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    password_strength: DataTypes.INTEGER,
    password_salt: DataTypes.STRING,
  }, {});
  return UserAccount;
};
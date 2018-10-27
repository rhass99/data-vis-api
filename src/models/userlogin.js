export default (sequelize, DataTypes) => {
  const UserLogin = sequelize.define('UserLogin', {
    id: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    salt: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    passwordStrength: DataTypes.INTEGER,
  }, {});
  UserLogin.associate = (models) => {
    // associations can be defined here
    UserLogin.hasOne(models.UserApiResult);
  };
  return UserLogin;
};
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    id_facebook: DataTypes.BIGINT,
  });

  return User;
};

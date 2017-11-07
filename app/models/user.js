module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    facebook: DataTypes.INTEGER,
  });

  // User.associate = (models) => {
  //   User.hasMany(models.Item, {
  //     foreignKey: 'id_user',
  //     as: 'id_user',
  //   });
  // };

  return User;
};

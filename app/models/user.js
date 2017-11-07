module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    facebook: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.hasMany(models.TradeItem, {
      foreignKey: 'id_user',
      as: 'owner',
    });
  };

  return User;
};

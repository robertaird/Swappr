module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    facebook: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.hasMany(models.TradeItem, {
      foreignKey: 'userId',
      as: 'tradeItems',
    });
  };

  return User;
};

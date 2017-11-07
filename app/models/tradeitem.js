
module.exports = (sequelize, DataTypes) => {
  const TradeItem = sequelize.define('TradeItem', {
    description: DataTypes.STRING,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    img_url: DataTypes.STRING,
  });

  TradeItem.associate = (models) => {
    TradeItem.hasOne(models.User, {
      foreignKey: 'id_tradeItem',
      as: 'tradeItems',
    });
  };

  return TradeItem;
};

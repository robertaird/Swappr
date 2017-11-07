
module.exports = (sequelize, DataTypes) => {
  const TradeItem = sequelize.define('TradeItem', {
    description: DataTypes.STRING,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    img_url: DataTypes.STRING,
  });

  TradeItem.associate = (models) => {
    // associations can be defined here
  };

  return TradeItem;
};

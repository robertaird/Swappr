'use strict';
module.exports = (sequelize, DataTypes) => {
  var TradeItem = sequelize.define('TradeItem', {
    description: DataTypes.STRING,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    img_url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return TradeItem;
};
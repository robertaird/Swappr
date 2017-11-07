
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    description: DataTypes.STRING,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    img_url: DataTypes.STRING,
  });

  Item.associate = (models) => {
    Item.belongsTo(models.User, {
      foreignKey: 'id_user',
    });
    Item.belongsTo(models.Category, {
      foreignKey: 'id_category',
    });
  };

  return Item;
};

module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    pending: DataTypes.BOOLEAN,
    accepted: DataTypes.BOOLEAN,
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, {
      foreignKey: 'id_user',
    });
    Transaction.belongsTo(models.Item, {
      foreignKey: 'id_item_desired',
    });
    Transaction.belongsTo(models.Item, {
      foreignKey: 'id_item_offered',
    });
  };
  return Transaction;
};

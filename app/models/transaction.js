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
      foreignKey: 'id_item_offered',
      as: 'offered',
    });
    Transaction.belongsTo(models.Item, {
      foreignKey: 'id_item_desired',
      as: 'desired',
    });
  };
  return Transaction;
};

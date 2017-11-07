module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    pending: DataTypes.BOOLEAN,
    accepted: DataTypes.BOOLEAN,
  });

  Transaction.associate = (models) => {
      // associations can be defined here
  };
  return Transaction;
};

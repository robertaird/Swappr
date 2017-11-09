module.exports = {
  up: queryInterface /* , Sequelize) */ =>
    queryInterface.removeColumn('Items', 'type'),
  down: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Items', 'type', Sequelize.STRING),
};

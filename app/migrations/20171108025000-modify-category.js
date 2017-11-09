module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Categories', 'url_img', Sequelize.STRING),
  down: queryInterface /* , Sequelize) */ =>
    queryInterface.removeColumn('Categories', 'url_img'),
};

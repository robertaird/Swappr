module.exports = {
  /*
DO $$
    BEGIN
        BEGIN
            ALTER TABLE "Categories" ADD COLUMN url_img VARCHAR;
        EXCEPTION
            WHEN duplicate_column THEN RAISE NOTICE 'column url_img already exists in Categories.';
        END;
    END;
$$;
  */
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Categories', [
      {
        name: 'Appliances',
        url_img: './assets/cats/appliances.svg',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'Automotive',
        url_img: './assets/cats/auto.svg',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'Babies and Kids',
        url_img: './assets/cats/babies.svg',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'Books and Magazines',
        url_img: './assets/cats/books.svg',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'Clothing',
        url_img: './assets/cats/clothes.svg',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'Computers and Software',
        url_img: './assets/cats/computers.svg',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'Electronics',
        url_img: './assets/cats/electronics.svg',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'Health and Beauty',
        url_img: './assets/cats/health.svg',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'Home and Garden',
        url_img: './assets/cats/home.svg',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'Jewelry',
        url_img: './assets/cats/jewelry.svg',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'Movies',
        url_img: './assets/cats/movies.svg',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'Music',
        url_img: './assets/cats/music.svg',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'Musical Instruments and Accessories',
        url_img: './assets/cats/instruments.svg',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'Office Supplies',
        url_img: './assets/cats/office.svg',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'Other',
        url_img: './assets/cats/other.svg',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'Pet Supplies',
        url_img: './assets/cats/pets.svg',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'Sports Equipment and Outdoor Gear',
        url_img: './assets/cats/sports.svg',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'Toys',
        url_img: './assets/cats/toys.svg',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'Video Games',
        url_img: './assets/cats/videogames.svg',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
    ], {}),
  down: queryInterface /* , Sequelize) */ =>
    queryInterface.bulkDelete('Category', null, {}),
};

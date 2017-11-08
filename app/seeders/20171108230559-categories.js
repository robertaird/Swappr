module.exports = {
  up: queryInterface /* , Sequelize) */ =>
    queryInterface.bulkInsert('Category', [
      {
        name: 'Appliances',
        url_img: './assets/cats/appliances.svg',
      },
      {
        name: 'Automotive',
        url_img: './assets/cats/auto.svg',
      },
      {
        name: 'Babies and Kids',
        url_img: './assets/cats/babies.svg',
      },
      {
        name: 'Books and Magazines',
        url_img: './assets/cats/books.svg',
      },
      {
        name: 'Clothing',
        url_img: './assets/cats/clothes.svg',
      },
      {
        name: 'Computers and Software',
        url_img: './assets/cats/computers.svg',
      },
      {
        name: 'Electronics',
        url_img: './assets/cats/electronics.svg',
      },
      {
        name: 'Health and Beauty',
        url_img: './assets/cats/health.svg',
      },
      {
        name: 'Home and Garden',
        url_img: './assets/cats/home.svg',
      },
      {
        name: 'Jewelry',
        url_img: './assets/cats/jewelry.svg',
      },
      {
        name: 'Music',
        url_img: './assets/cats/music.svg',
      },
      {
        name: 'Musical Instruments and Accessories',
        url_img: './assets/cats/instruments.svg',
      },
      {
        name: 'Office Supplies',
        url_img: './assets/cats/office.svg',
      },
      {
        name: 'Other',
        url_img: './assets/cats/other.svg',
      },
      {
        name: 'Pet Supplies',
        url_img: './assets/cats/pets.svg',
      },
      {
        name: 'Sports Equipment and Outdoor Gear',
        url_img: './assets/cats/sports.svg',
      },
      {
        name: 'Toys',
        url_img: './assets/cats/toys.svg',
      },
      {
        name: 'Video Games',
        url_img: './assets/cats/videogames.svg',
      },
    ], {}),
  down: queryInterface /* , Sequelize) */ =>
    queryInterface.bulkDelete('Category', null, {}),
};

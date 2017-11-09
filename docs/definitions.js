/* eslint no-unused-vars: 0 */

// Please continue to update this file as we go along.

// * Auth Object * //

const user = {
  // We're going to keep snake case here, as this is how it will be plugged into the database...
  id_facebook: null,
  email: null,
  authToken: null,
};

// * DB Post * //
// * Basically, anything that is passed around and deals with the database.

const newUser = {
  id_facebook: null,
  email: null,
};

const newItem = {
  id_user: null,
  description: null,
  name: null,
  id_category: null,
  url_img: null,
};

// * Item Categories * //

const categories = {
  1: 'Appliances',
  2: 'Automotive',
  3: 'Babies and Kids',
  4: 'Books and Magazines',
  5: 'Clothing',
  6: 'Computers and Software',
  7: 'Electronics',
  8: 'Health and Beauty',
  9: 'Home and Garden',
  10: 'Jewelry',
  105: 'Movies',
  11: 'Music',
  13: 'Musical Instruments and Accessories',
  14: 'Office Supplies',
  15: 'Other',
  16: 'Pet Supplies',
  17: 'Sports Equipment and Outdoor Gear',
  18: 'Toys',
  19: 'Video Games',
};

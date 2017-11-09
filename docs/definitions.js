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

// * POST to /users
const newUser = {
  id_facebook: null,
  email: null,
};

// * POST to /items
const newItem = {
  id_user: null,
  description: null,
  name: null,
  id_category: null,
  url_img: null,
};

// * POST to /transactions
// * Set up a new Transaction like so:
const newTransactionWanted = {
  id_user: 5,
  id_item_offered: 3,
  id_item_desired: 2,
  pending: true,
};

// * If a user 'swipes left', we can create an entry in the transaction database where pending and
// * accepted are both FALSE. When we query the database to look for potential new items, we can
// * avoid showing a user items they've already declined.
const newTransactionLeftSwipe = {
  id_user: 5,
  id_item_offered: 2,
  id_item_desired: 2,
  pending: false,
  accepted: false,
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

const express = require('express');
const db = require('../../app/db');

const app = express();

app.use(express.json());

app.post('/items', (req, res) => {
  const newItem = req.body;
  if (newItem.id_category === undefined) {
    newItem.id_category = 15;
  }
  console.log(newItem);
  db.Item.create(newItem)
    .then(createdItem =>
      res.send(createdItem))
    .catch((err) => {
      console.log(err);
      res.send(500, 'something went wrong!')
    });
  // res.send();
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  db.User.create(newUser)
    .then(user => res.send(user))
    .catch(err => console.log(err));
});

module.exports = app;

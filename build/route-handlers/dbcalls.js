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
      res.send(500, 'something went wrong!');
    });
  // res.send();
});

app.post('/users', (req, res) => {
  // ! Verification will probably need to happen in here!
  const newUser = req.body;
  db.User.create(newUser)
    .then(createdUser =>
      res.send(createdUser))
    .catch((err) => {
      console.log(err);
      res.send(500, 'something went wrong!');
    });
});

app.post('/transactions', (req, res) => {
  const newTransaction = req.body;
  db.Transaction.create(newTransaction)
    .then(createdTransaction =>
      res.send(createdTransaction))
    .catch((err) => {
      console.log(err);
      res.send(500, 'something went wrong!');
    });
});

module.exports = app;

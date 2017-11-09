const express = require('express');
const db = require('../../app/db');

const app = express();

app.use(express.json());

app.post('/items', (req, res) => {
  const newItem = req.body;
  if (newItem.id_category === undefined) {
    newItem.id_category = 15;
  }
  db.Item.create(newItem)
    .then(createdItem =>
      res.send(createdItem))
    .catch((err) => {
      console.log(err);
      res.send(500, 'something went wrong!');
    });
  // res.send();
});

module.exports = app;

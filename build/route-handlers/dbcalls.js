const express = require('express');
const db = require('../../app/db');

const app = express();

app.use(express.json());

app.post('/items', (req, res) => {
  const newItem = req.body;
  if (newItem.id_category === undefined) {
    newItem.id_category = 17;
  }
  console.log(newItem);
  res.send();
});

module.exports = app;

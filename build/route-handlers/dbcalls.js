const express = require('express');
const db = require('../../app/db');

const app = express();

app.use(express.json());

app.post('/items', (req, res) => {
  console.log(req.body);
  // db.Item.create()
  res.send();
});

module.exports = app;

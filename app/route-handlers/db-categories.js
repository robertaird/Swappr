const express = require('express');
// const Sequelize = require('sequelize');
const db = require('../db');

const app = express();
// const Op = Sequelize.Op;

app.use(express.json());

app.get('/categories', (req, res) => {
  db.Category
    .findAll({})
    .then((categories) => {
      res.send(categories);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = app;

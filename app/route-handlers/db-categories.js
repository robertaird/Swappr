const express = require('express');
// const Sequelize = require('sequelize');
<<<<<<< cfa3de7fa01fcf998de71928d547dd4809c951a1
const db = require('../../app/db');
=======
const db = require('../db');
>>>>>>> (refactor) Updating Vue, Webpack

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

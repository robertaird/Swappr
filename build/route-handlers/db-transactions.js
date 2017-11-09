const express = require('express');
const Sequelize = require('sequelize');
const db = require('../../app/db');

const Op = Sequelize.Op;

const app = express();

app.use(express.json());

const createTransaction = (res, newTransaction) =>
  db.Transaction.create(newTransaction)
    .then(createdTransaction =>
      res.send(createdTransaction))
    .catch((err) => {
      console.log(err);
      res.send(500, 'something went wrong!');
    });

app.get('/transactions', (req, res) => {
  const { id_user: userId } = req.headers;
  db.Item.find(
    {
      where: {
        id_user: {
          [Op.notIn]: [userId],
        },
      },
    },
  ).then((item) => {
    console.log(item);
    res.send(item);
  })
  .catch((err) => {
    console.log(err);
    res.send(500);
  });
});

app.post('/transactions', (req, res) => {
  const newTransaction = req.body;
  const { id_item_offered, id_item_desired } = newTransaction;
  db.Transaction.update(
    {
      pending: false,
      accepted: true,
    },
    {
      where: {
        id_item_desired: id_item_offered,
        id_item_offered: id_item_desired,
      },
      returning: true,
    },
  ).then(([rows, updatedTransaction]) => {
    if (rows > 0) {
      res.send(updatedTransaction);
    } else {
      createTransaction(res, newTransaction);
    }
  }).catch(err =>
    console.log(err));
});

module.exports = app;

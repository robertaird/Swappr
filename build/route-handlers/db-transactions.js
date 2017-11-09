const express = require('express');
const db = require('../../app/db');

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
  const { id_user } = req.headers;

  res.send(id_user);
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

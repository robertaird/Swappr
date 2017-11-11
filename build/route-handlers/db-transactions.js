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


const test = userId =>
// db.Transaction.findAll({
//   where: {
//     accepted: true,
//     $or: [
//           { 'Transaction.id_item_offered': 'b.id' },
//     ],
//   },
//   include: [{
//     model: 'Item',
//     as: 'b',
//   }],
// }, { raw: true });

db.Transaction.findAll({
  attributes: ['id_user', 'id_item_offered', 'id_item_desired'],
  include: [{
    model: db.Item,
    attributes: [['name', 'description']],
  },
  ],
  where: {
    // [Op.or]: [{ id_item_desired: 'Item'.id }, { id_item_offered: 'Item'.id }],
    // id: id
    // id_user: userId,
    accepted: true,
  },
});

test('2').then(console.log);

const getSeenItems = userId =>
  db.Transaction.findAll({ where: { id_user: userId }, raw: true })
    .then(items =>
      items.map(({ id_item_desired: itemId }) => itemId))
    .catch(err =>
      console.log(err));

app.get('/transactions', (req, res) => {
  const { id_user: userId } = req.headers;
  getSeenItems(userId).then((itemIds) => {
    db.Item.find({
      where: {
        id: {
          [Op.notIn]: itemIds,
        },
        id_user: {
          [Op.notIn]: [userId],
        },
      },
    })
    .then((item) => {
      console.log(item);
      res.send(item);
    })
    .catch((err) => {
      console.log(err);
      res.send(500);
    });
  });
});

// app.get('/transactions/offers', (req, res) => {
//   const { id_user: userId } = req.headers;
  // db.Transaction.findAll({ where: { id_user: userId, accepted: true } })
  //   .then((offers) => {
  //     res.send(offers);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     res.send(500);
  //   });

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
    }).then(([rows, updatedTransaction]) => {
      if (rows > 0) {
        res.send(updatedTransaction);
      } else {
        createTransaction(res, newTransaction);
      }
    }).catch(err =>
    console.log(err));
});

module.exports = app;

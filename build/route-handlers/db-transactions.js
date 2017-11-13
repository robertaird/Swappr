const express = require('express');
const Sequelize = require('sequelize');
const Promise = require('bluebird');
const db = require('../../app/db');

const Op = Sequelize.Op;

const app = express();

app.use(express.json());

const createTransaction = (res, newTransaction) =>
  db.Transaction.create(newTransaction)
    .then(createdTransaction =>
      createdTransaction)
    .catch((err) => {
      console.error(err);
    });

// Find items where either the id_user is users id OR the item_desired is in their item list
// and accepted is true.

const getSeenItems = (userId, itemArray) =>
  db.Transaction.findAll({
    where: {
      [Op.or]: [{
        id_user: userId },
      {
        id_item_desired: {
          [Op.in]: itemArray,
        },
        accepted: true,
      }],
    },
    raw: true })
    .then(items =>
      items.map(({
        id_user: transactionUser,
        id_item_desired: desiredItem,
        id_item_offered: offeredItem,
      }) => {
        if (`${transactionUser}` === userId) {
          return desiredItem;
        }
        return offeredItem;
      }),
    )
    .catch(err =>
      console.error(err));

app.get('/transactions', (req, res) => {
  const { id_user: userId, items } = req.headers;
  const itemArray = items.split(',');
  getSeenItems(userId, itemArray).then((itemIds) => {
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
      console.error(err);
      res.send(500);
    });
  });
});

app.post('/transactions', (req, res) => {
  const { data: itemArray } = req.body;
  const promises = itemArray.map((item) => {
    const { id_item_offered, id_item_desired } = item;
    return db.Transaction.update(
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
          return updatedTransaction;
        }
        return createTransaction(res, item);
      }).catch(err =>
        console.error(err));
  });
  Promise.all(promises)
    .then(results => res.send(results))
    .catch((err) => {
      console.error(err);
      res.send(500, 'we screwed up');
    });
});

module.exports = app;

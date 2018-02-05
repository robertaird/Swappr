const express = require('express');
const Sequelize = require('sequelize');
const db = require('../db');

const app = express();

const Op = Sequelize.Op;

app.use(express.json());

app.get('/users/single', (req, res) => {
  const { id } = req.headers;
  db.User.findOne({ where: { id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

app.get('/users', (req, res) => {
  const { id, items } = req.headers;
  const itemArray = items.split(',');
  db.Transaction.findAll({
    where: {
      [Op.or]:
      [
        { id_user: id },
        { id_item_desired: {
          [Op.in]: itemArray,
        } },
      ],
      accepted: true,
    },
    include: [{
      model: db.Item,
      as: 'desired',
    },
    {
      model: db.Item,
      as: 'offered',
    }],
  })
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.error(err);
    res.send(err);
  });
});

app.post('/users', (req, res) => {
  // ! Verification will probably need to happen in here!
  const { name, email, id_facebook } = req.body;

  return db.User.findCreateFind({
    where: {
      email,
      id_facebook,
    },
  })
  .spread((userResult, created) => {
    if (created) {
      userResult.update({ name })
        .then((updatedUser) => {
          res.send(updatedUser);
        });
    } else if (userResult === null) {
      res.send(406, 'could not find or create');
    } else {
      res.send(userResult);
    }
  })
  .catch((err) => {
    console.error(err);
    res.send(500, err);
  });
});

module.exports = app;

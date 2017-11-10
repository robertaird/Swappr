const express = require('express');
const sequelize = require('sequelize');
const db = require('../../app/db');

const app = express();

app.use(express.json());

app.get('/users', (req, res) => {
  // ! Verification will probably need to happen in here!
  const { id_facebook } = req.headers;
  db.User.findOne({ where: { id_facebook } })
    .then((foundUser) => {
      if (foundUser) {
        res.send(foundUser);
      } else {
        res.send('Please sign up!');
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(500, 'something went wrong!');
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
    console.log(err);
    res.send(500, err);
  });
});

module.exports = app;

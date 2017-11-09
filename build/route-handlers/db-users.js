const express = require('express');
const db = require('../../app/db');

const app = express();

app.use(express.json());

app.get('/users', (req, res) => {
  // ! Verification will probably need to happen in here!
  const { id_user: id } = req.headers;
  db.User.findOne({ where: { id } })
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
  const newUser = req.body;
  db.User.create(newUser)
    .then(createdUser =>
      res.send(createdUser))
    .catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.send('User already exists!');
      } else {
        console.log(err);
        res.send(500, 'something went wrong!');
      }
    });
});

module.exports = app;

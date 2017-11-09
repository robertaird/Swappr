const express = require('express');
const db = require('../../app/db');

const app = express();

app.use(express.json());

app.post('/users', (req, res) => {
  // ! Verification will probably need to happen in here!
  const newUser = req.body;
  db.User.create(newUser)
    .then(createdUser =>
      res.send(createdUser))
    .catch((err) => {
      console.log(err);
      res.send(500, 'something went wrong!');
    });
});

module.exports = app;

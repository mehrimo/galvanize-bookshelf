'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const knex = require('../knex');
const bodyParser = require('body-parser');
const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const { camelizeKeys, decamelizeKeys } = require('humps');
// const dotenv = require('dotenv');
const router = express.Router();


router.post('/users', (req, res, next) => {
  var hash = bcrypt.hashSync(req.body.password, 8);

  knex('users')
  .insert({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    hashed_password: hash
  }, '*')
  .then((user) => {
    //create new user without hashed password field
    var newUser = camelizeKeys(user);
    res.send({
      id: newUser[0].id,
      firstName: newUser[0].firstName,
      lastName: newUser[0].lastName,
      email: newUser[0].email
    }).status(200);
  })
  .catch ((err) => {
    next(err);
  });
});
//then newuser = users
// camelizeKeys
// only send the name,email,password
module.exports = router;

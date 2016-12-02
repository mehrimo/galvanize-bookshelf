'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');
const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');



router.get('/books', (_req,res, next) => {
  knex('books')
  .orderBy('title')
  .then((rows) => {
    const books = camelizeKeys(rows);
    res.send(books);
  })
  .catch((err) => {
    next(err);
  });
});

module.exports = router;

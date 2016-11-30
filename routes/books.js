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

router.get('/books/:id', (req, res, next) => {
    knex('books')
    .where('id', req.params.id)
    .first()
    .then((rows) => {
      const books = camelizeKeys(rows);
      if (!books) {
        return next();
      }

      res.send(books);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/books', (req, res, next) => {
  knex('books')
  .insert({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.coverUrl
  }, '*')
  .then((rows) => {
    const books = camelizeKeys(rows);
    res.send(books[0]);
  })
    .catch((err) => {
      next(err);
    });
  });

  router.patch('/books/:id', (req, res, next) => {
    knex('books')
      .where('id', req.params.id)
      .first()
      .then((books) => {
        if (!books) {
          return next();
        }

        return knex('books')
          .update({
          title: req.body.title,
          author: req.body.author,
          genre: req.body.genre,
          description: req.body.description,
          cover_url: req.body.coverUrl
        }, '*')
          .where('id', req.params.id);
      })
      .then((rows) => {
        const books = camelizeKeys(rows);
        res.send(books[0]);
      })
      .catch((err) => {
        next(err);
      });
  });

  router.delete('/books/:id', (req, res, next) => {
  let books;

  knex('books')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (!row) {
        return next();
      }

      books = row;

      return knex('books')
        .del()
        .where('id', req.params.id);
    })
    .then(() => {
      delete books.id;
      res.send(camelizeKeys(books));
    })
    .catch((err) => {
      next(err);
    });
});


module.exports = router;

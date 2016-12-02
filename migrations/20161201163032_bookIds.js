'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites' ,
  function(table) {
    table.increments();
    table.integer('book_id').notNullable().references('id').inTable('books').onDelete('Cascade');
    table.integer('user_id').notNullable().references('id').inTable('users').onDelete('Cascade');
    table.timestamps(true, true);
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites')
};

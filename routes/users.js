/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const userHelper = require('../lib/db_helper');

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/register", (req, res) => {
    userHelper.addUsers(db);
  });
  return router;
};

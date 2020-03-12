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
  router.post("/register", (req, res) => {
    let userData = req.body;
    req.session.userID = //enter the userId that the database has
    userData = {
      first_name: userData.first_name,
      email: userData.email,
      password: userData.password,
    };
    userHelper.addUser(db, userData).then((dbRes) => {
      req.session.userID = dbRes.id
      console.log(req.session.userID);
      res.json(dbRes)
    });
  });

  router.post("/login", (req, res) => {
    let userData = req.body;
    console.log(userData);
    userHelper.getUsersNameByEmail(db, userData).then(dbRes => res.json(dbRes));
  })
  return router;
};


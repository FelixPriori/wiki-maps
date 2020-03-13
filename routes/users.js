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
    userData = {
      first_name: userData.first_name,
      email: userData.email,
      password: userData.password,
    };
    userHelper.addUser(db, userData).then((dbRes) => {
      req.session.userID = dbRes[0].id
      res.json(dbRes)
    });
  });

  router.post("/login", (req, res) => {
    let userData = req.body;
    userHelper.getUsersNameByEmail(db, userData).then((dbRes) => {
      req.session.userID = dbRes[0].id
      res.json(dbRes[0])
    });
  });

  router.get("/checkUser", (req, res) => {
    let userObj = {
      id: req.session.userID
    }
    userHelper.getUserNameById(db, userObj).then(dbRes => res.json(dbRes));
  });

  router.get('/getFaves', (req, res) => {
    let userObj ={
      id: req.session.userID
    }
    userHelper.getFavouritesByUser(db, userObj).then(dbRes => res.json(dbRes));
  })

  router.post("/logout", (req, res) => {
    req.session = null;
    res.send();
  });

  router.post("/favourite", (req, res) => {
    let dataObj = req.body;
    userHelper.addUserFavouriteMap(db, dataObj).then((dbRes) => {
        console.log(req.session.userID);
        res.json(dbRes);
      })
    });

  router.post("/deleteFavouriteMap", (req, res) => {
    let dataObj = req.body;
    userHelper.deleteUserFavouriteMap(db, dataObj).then(dbRes => res.json(dbRes));
  })
  return router;
};


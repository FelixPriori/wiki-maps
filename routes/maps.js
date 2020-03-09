const express = require('express');
const router = express.Router();
const mapsHelper = require('../lib/db_helper');

module.exports = (db) => {
    router.get('/maps' , (req, res) => {
        mapsHelper.getMaps(db);
    });
    return router;
}

module.exports = (db) => {
    router.post('/maps', (req, res) => {
       let mapInfo = {

       }
     mapsHelper.addMap(db, mapInfo);
    });
 return router;
};
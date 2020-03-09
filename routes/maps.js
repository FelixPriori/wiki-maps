const express = require('express');
const router = express.Router();
const mapsHelper = require('../lib/db_helper');

module.exports = (db) => {
    router.get('/getmap' , (req, res) => {
        mapsHelper.getMaps(db);
    });
    return router;
}

module.exports = (db) => {
    router.post('/makemap', (req, res) => {
       const mapName = req.body;
        let mapInfo = {
         name: mapName['map-name']
       }
       console.log(mapInfo)
     mapsHelper.addMap(db, mapInfo).then(mapObject => res.json(mapObject))
                                    //.catch(err => console.log(err));
    });
 return router;
};
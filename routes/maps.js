const express = require('express');
const router = express.Router();
const mapsHelper = require('../lib/db_helper');

module.exports = (db) => {

    router.get('/' , (req, res) => {
        mapsHelper.getMaps(db).then(dbRes => res.json(dbRes));
    });

    router.post('/', (req, res) => {
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
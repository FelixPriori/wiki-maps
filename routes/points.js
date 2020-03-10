const express = require('express');
const router = express.Router();
const pointsHelper = require('../lib/db_helper');

module.exports = (db) => {
    router.post('/markpoint', (req, res) => {
    let pointsObject = req.body; 
    console.log(req.body); 
    let pointsInfo = {
            name: pointsObject.name,
            description: pointsObject.description,
            image: pointsObject.image,
            latitude: Number(pointsObject.latitude),
            longitude: Number(pointsObject.longitude),
            map_id: Number(pointsObject.map_id)
        }
        pointsHelper.addPoints(db, pointsInfo).then(dbRes => res.json(dbRes));
    });

    router.get('/getpoints', (req, res) => {
        let mapId = req.body;
        pointsHelper.getPointsByMap(db,mapId.map_id).then(dbRes => res.json(dbRes));
    })
return router;
}

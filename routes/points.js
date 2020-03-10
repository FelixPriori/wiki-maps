const express = require('express');
const router = express.Router();
const pointsHelper = require('../lib/db_helper');

module.exports = (db) => {
    router.post('/markpoint', (req, res) => {
    let pointsObject = req.body;  
    let pointsInfo = {
            name: pointsObject.name,
            description: pointsObject.description,
            image: pointsObject.image,
            latitude: Number(pointsObject.latitude),
            longitude: Number(pointsObject.longitude),
            map_id: ''
        }
        pointsHelper.addPoints(db, pointsInfo).then(dbRes => res.json(dbRes));
    });
return router;
}

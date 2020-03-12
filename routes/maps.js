const express = require("express");
const router = express.Router();
const mapsHelper = require("../lib/db_helper");

module.exports = db => {
  router.get("/", (req, res) => {
    mapsHelper.getMaps(db).then(dbRes => res.json(dbRes));
  });

  router.get("/:mapID", (req, res) => {
    const mapID = req.params.mapID;
    // const {mapID} = req.body;
    console.log("mapid", mapID);
    //   let mapInfo = {
    //  id: mapID['map-ID']
    // }

    mapsHelper.getPointsByMapId(db, mapID).then(dbRes => res.json(dbRes));
    // .then(dbRes => res.json(dbRes));
  });

  router.post("/", (req, res) => {
    const mapName = req.body[0];
    let mapInfo = {
      name: mapName["map-name"]
    };
    // console.log(mapInfo);
    mapsHelper.addMap(db, mapInfo).then(mapObject => res.json(mapObject));
    //.catch(err => console.log(err));
  });

  router.post("/points/delete", (req, res) => {
    const idPoint = req.body.pointId;
    console.log(idPoint);
    mapsHelper.deletePoint(db, idPoint).then(() =>  res.send('ok'));
  });

  router.post("/points/edit", (req, res) => {
    const idPoint = req.body.pointId;
    // console.log(idPoint);
    mapsHelper.editPoint(db, idPoint).then()//.....
  });





  return router;
};

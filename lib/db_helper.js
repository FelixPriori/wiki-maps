//User helper functions
const addUser = function(db, userInfo){
    let userValues = [userInfo.first_name, userInfo.email, userInfo.password];
    let queryString = `INSERT INTO users (first_name, email, password)
                       VALUES ($1, $2, $3) RETURNING *;`;
    return db.query(queryString, userValues)
               .then(res => res.rows)
               .catch(err => console.log(err));
};

const getUsersNameByEmail = function(db, userInfo){
    let userValues = [userInfo.email];
    let queryString =`SELECT first_name FROM users WHERE email = $1;`;
    return db.query(queryString, userValues)
             .then(res => res.rows[0])
             .catch(err => console.log(err));
 }

 const getUsersIdByEmail = function(db, userInfo){
     let userValues = [userInfo.email];
     let queryString = `SELECT id FROM users 
                        WHERE email= $1;`;

    return db.query(queryString, userValues)
             .then(res => res.rows[0])
             .catch(err => console.log(err));
 }
//Map Helper functions
const getMaps = function(db) {
  let queryString = `SELECT * FROM maps`;
  return db
    .query(queryString)
    .then(res => res.rows)
    .catch(err => console.log(err));
};

const addMap = function(db, mapInfo) {
  let mapValues = [mapInfo.name];
  let queryString = `INSERT INTO maps (name)
                       VALUES ($1) RETURNING *;`;
  return db
    .query(queryString, mapValues)
    .then(res => res.rows[0])
    .catch(err => console.log(err));
};
//Points helper functions
const addPoints = function(db, pointInfo) {
  let pointValues = [
    pointInfo.name,
    pointInfo.description,
    pointInfo.image,
    pointInfo.latitude,
    pointInfo.longitude,
    pointInfo.map_id
  ];
  let queryString = `INSERT INTO points (name, description, image, latitude, longitude, map_id)
                       VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
  return db
    .query(queryString, pointValues)
    .then(res => res.rows[0])
    .catch(err => console.log(err));
};

const getPointsByMap = function(db, id) {
  let mapId = [id];
  let queryString = `SELECT * FROM points
                        WHERE map_id = $1;`;
    return db.query(queryString, mapId)
             .then(res => res.rows[rows.length])
             .catch(err => console.log(err));
}
const getPointsByMapId = function(db, mapID) {
  // console.log(mapID,"mapFunction")
  let mapValues = [mapID];
  let queryString = `SELECT * FROM points
                        WHERE map_id = $1`;
  return (
    db
      .query(queryString, mapValues)
      // .then(res => console.log(res.rows[0]),"res")
      .then(res => {
        console.log(res.rows, "res");
        return res.rows;
      })
      .catch(err => console.log(err))
  );
};

const deletePoint = function(db, pointId) {
  let pointValues = [pointId];
  let queryString = `DELETE FROM points
    WHERE id = $1`;
  return (
    db
      .query(queryString, pointValues)
      // .then(res => console.log(res.rows[0]),"res")
      .then(res => {
        return res.rows;
      })
      .catch(err => console.log(err))
  );
};

const editPoint = function(db, pointId) {};

module.exports = {
getUsersNameByEmail,
addUser,
getUsersIdByEmail,
getMaps,
addMap,
addPoints,
getPointsByMap,
getPointsByMapId,
deletePoint,
editPoint
};

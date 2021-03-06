//User helper functions
const getUserWithName = function(db, email) {
  let values = [email];
  let queryString = `SELECT * FROM user
                       WHERE name = $1`;
  return db
    .query(queryString, values)
    .then(res => res.rows)
    .catch(console.error("No user with that email"));
};

const addUser = function(db, userInfo) {
  let userValues = [userInfo.first_name, userInfo.email, userInfo.password];
  let queryString = `INSERT INTO users (first_name, email, password)
                       VALUES ($1, $2, $3) RETURNING *;`;
  return db
    .query(queryString, userValues)
    .then(res => res.rows)
    .catch(err => console.log(err));
};

const getUserNameById = function(db, userInfo) {
  let userValues = [userInfo.id];
  let queryString = `SELECT first_name FROM users WHERE id = $1;`;
  return db
    .query(queryString, userValues)
    .then(res => res.rows[0])
    .catch(err => console.log(err));
};

const getUsersNameByEmail = function(db, userInfo) {
  let userValues = [userInfo.email];
  let queryString = `SELECT id, first_name FROM users WHERE email = $1;`;
  return db
    .query(queryString, userValues)
    .then(res => res.rows)
    .catch(err => console.log(err));
};

const getUsersIdByEmail = function(db, userInfo) {
  let userValues = [userInfo.email];
  let queryString = `SELECT id FROM users
                        WHERE email= $1;`;

    return db.query(queryString, userValues)
             .then(res => res.rows[0])
             .catch(err => console.log(err));
 }
const addUserFavouriteMap = function(db, favouriteInfo){
  let userValues = [favouriteInfo.map_id, favouriteInfo.contributor_id];
  let queryString = `INSERT INTO favourites (map_id, contributor_id)
                    VALUES ($1, $2) RETURNING *`;
  return db.query(queryString, userValues).then(res => res.rows)
                                          .catch(err => console.log(err));
}
const postUserContributions = function(db, userObj){
  const values = [userObj.map_id, userObj.contributor_id];
  let queryString = `INSERT INTO contributions (map_id, contributor_id)
                    VALUES ($1, $2)
                    RETURNING *`;
  return db.query(queryString, values).then(res => res.rows)
                                      .catch(err => console.log(err));
}

const getFavouritesByUser = function(db, user_id) {
  const values = [user_id.id];
  let queryString = `SELECT map_id FROM favourites
                      JOIN users ON users.id = contributor_id
                      WHERE contributor_id = $1`;
  return db
    .query(queryString, values)
    .then(res => res.rows)
    .catch(err => console.log(err));
};

 const getUserFavouriteMaps = function(db, user_id){
    const values = [user_id.id];
    let queryString = `SELECT * FROM maps
                       JOIN favourites ON maps.id = map_id
                       JOIN users ON users.id = contributor_id
                       WHERE contributor_id = $1;`;
    return db.query(queryString, values).then(res => res.rows)
                                        .catch(err => console.log(err));
 }

const getUserContributedMaps = function(db, user_id){
  const values = [user_id.id];
  let queryString = `SELECT * FROM maps
                    JOIN contributions ON maps.id = map_id
                    JOIN users ON users.id = contributor_id
                    WHERE contributor_id = $1;`;
  return db.query(queryString, values).then(res => res.rows)
                                      .catch(err => console.log(err));
 }

const deleteUserFavouriteMap = function(db, removeObj) {
  let userValues = [removeObj.map_id];
  let queryString = `DELETE FROM favourites WHERE map_id = $1;`;

  return db
    .query(queryString, userValues)
    .then(res => res.rows)
    .catch(err => console.log(err));
};

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
  return db
    .query(queryString, mapId)
    .then(res => res.rows[rows.length])
    .catch(err => console.log(err));
};
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
        // console.log(res.rows, "res");
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

const editPoint = function(db, dataPoint) {
  let pointValues = [
    dataPoint.pointId,
    dataPoint.pointName,
    dataPoint.pointImgURL,
    dataPoint.pointDescription
  ];
  console.log(pointValues);
  let queryString = `UPDATE points
                      SET  name = $2,
                      description = $4,
                      image = $3
                      WHERE id= $1;`;
  return db
    .query(queryString, pointValues)
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
};

module.exports = {
getUsersNameByEmail,
deleteUserFavouriteMap,
addUser,
getUsersIdByEmail,
getFavouritesByUser,
getUserNameById,
addUserFavouriteMap,
getUserFavouriteMaps,
postUserContributions,
getUserContributedMaps,
getMaps,
addMap,
addPoints,
getPointsByMap,
getPointsByMapId,
deletePoint,
editPoint
};

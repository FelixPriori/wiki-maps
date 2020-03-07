
const {Pool} = require('pg');
const params = require('dbParams');

const pool = new Pool({
    host: params.host,
    port: params.port,
    user: params.user,
    password: params.password,
    database: params.database
});
//User helper functions
const getUserWithEmail = function(email){
    let values = [email];
    let queryString = `SELECT * FROM user
                       WHERE email = $1`;
    return pool.query(queryString, values)
               .then(res => res.rows[0].first_name)
               .catch(console.error('No user with that email'))
}

const addUser = function(userInfo){
    let userValues = [userInfo.first_name, userInfo.last_name, userInfo.password, userInfo.email, userInfo.avatar, userInfo.location];
    let queryString = `INSERT INTO users (first_name, last_name, password email, avatar, location)
                       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
    return pool.query(queryString, userValues)
               .then(res => res.rows[0])
               .catch(console.error('Some fields are null'))
}
//Map Helper functions
const getMaps = function(){
    let queryString = `SELECT * FROM maps`;
return pool.query(queryString)
        .then(res => res.rows)
        .catch(console.error('No maps available'));
}

const addMap = function(mapInfo){
    let mapValues = [mapInfo.name, mapInfo.latitude, mapInfo.longitude, mapInfo.zoom];
    let queryString = `INSERT INTO maps (name, latitude, longitude, zoom)
                       VALUES ($1, $2, $3, $4) RETURNING *;`;
    return pool.query(queryString, mapValues)
               .then(res => res.rows)    
}


module.exports = {getMaps, getUserWithEmail, addUser, addMap};

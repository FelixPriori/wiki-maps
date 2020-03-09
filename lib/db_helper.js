//User helper functions
const getUserWithEmail = function(db, email){
    let values = [email];
    let queryString = `SELECT * FROM user
                       WHERE email = $1`;
    return db.query(queryString, values)
               .then(res => res.rows[0].first_name)
               .catch(console.error('No user with that email'))
}

const addUser = function(db, userInfo){
    let userValues = [userInfo.first_name, userInfo.last_name, userInfo.password, userInfo.email, userInfo.avatar, userInfo.location];
    let queryString = `INSERT INTO users (first_name, last_name, password email, avatar, location)
                       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
    return db.query(queryString, userValues)
               .then(res => res.rows[0])
               .catch(console.error('Some fields are null'));
};
//Map Helper functions
const getMaps = function(db){
    let queryString = `SELECT * FROM maps`;
return db.query(queryString)
        .then(res => res.rows)
        .catch(err => console.log(err));
}

const addMap = function(db, mapInfo){
    let mapValues = [mapInfo.name];
    let queryString = `INSERT INTO maps (name)
                       VALUES ($1) RETURNING *;`;
    return db.query(queryString, mapValues)
               .then(res => res.rows[0])
               .catch(err => console.log(err));    
}

const getUsers = function(db){
   return db.query(`SELECT * FROM users`).then().catch()
}

module.exports = {getMaps, getUserWithEmail, addUser, addMap, getUsers};

const {Pool} = require('pg');
const params = require('dbParams');

const pool = new Pool({
    host: params.host,
    port: params.port,
    user: params.user,
    password: params.password,
    database: params.database
});

const getMap = function(){
    let queryString = `SELECT * FROM maps`;
return pool.query(queryString)
        .then(res => res.rows)
        .catch(console.error('No maps available'));
}


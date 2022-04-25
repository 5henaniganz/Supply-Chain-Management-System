const mysql = require('mysql2');


let connection = mysql.createPool({
        host: 'remotemysql.com',
        user: 'pzPvEMcylO',
        password : 'VBAVWMf3hq',
        database: 'pzPvEMcylO'
});


export default connection;
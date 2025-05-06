const mysql = require('mysql2/promise');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // THIS IS MySQL password
    database: 'click_fit_db' // THIS IS MySQL DATABASE NAME
});


module.exports = pool;
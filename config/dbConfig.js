require("dotenv").config();
const mysql = require('mysql');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: `192.168.22.4`,
    user: `webadmin`,
    password: `It@123456`,
    database: `meliora`,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});


module.exports = pool
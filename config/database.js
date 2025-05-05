const { createPool } = require("mysql");

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 10,
    dateStrings: true
});

const hrpool = createPool({
    port: process.env.DB_PORT,
    host: process.env.HR_HOST,
    user: process.env.HR_DB_USER,
    password: process.env.HR_DB_PASS,
    database: process.env.HR_SQL,
    connectionLimit: 10,
    dateStrings: true
});

const psspool = createPool({
    port: process.env.DB_PORT,
    host: process.env.PSS_HOST,
    user: process.env.PSS_DB_USER,
    password: process.env.PSS_DB_PASS,
    database: process.env.PSS_SQL,
    connectionLimit: 10,
    dateStrings: true
});

module.exports = {
    pool,
    hrpool,
    psspool
};
//module.exports = hrpool;
const { pool } = require("../../config/database");


const executeQuery = (query, values = [], callback) => {
    pool.query(query, values, (err, results) => {
        if (err) {
            console.error("DB Error:", err);   // optional log
            return callback(err);
        }
        return callback(null, results);
    });
};

module.exports = { executeQuery };
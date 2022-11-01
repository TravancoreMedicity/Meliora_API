const { pool } = require('../../config/database')
module.exports = {
    timeslampInsert: (data, callback) => {
        pool.query(
            ``,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    timeslampUpdate: (data, callback) => {
        pool.query(
            ``,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    timeslampSelect: (callback) => {
        pool.query(
            `SELECT diet_slno,diet_name,diet_status FROM diet_master`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    timeslampGetById: (callback) => {
        pool.query(
            ``,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    }
}
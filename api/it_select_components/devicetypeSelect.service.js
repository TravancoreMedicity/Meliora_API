const { pool } = require('../../config/database')
module.exports = {

    getDeviceType: (callback) => {
        pool.query(
            `SELECT 
            device_type_slno,
            device_type_name
            FROM
            meliora.it_communication_device_type
            WHERE device_type_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getDeviceTypePassword: (callback) => {
        pool.query(
            `SELECT 
            device_type_slno,
            device_type_name
            FROM
            meliora.it_password_device_type
            WHERE device_type_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
}
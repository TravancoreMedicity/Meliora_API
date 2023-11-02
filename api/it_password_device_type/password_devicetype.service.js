const { pool } = require('../../config/database')
module.exports = {
    DeviceTypeInsert: (data, callback) => {
        pool.query(
            `INSERT INTO it_credential_type
          ( 
            credential_name,
            credential_status,
            create_user
                   )
          VALUES(?,?,?)`,
            [
                data.credential_name,
                data.device_type_status,
                data.create_user
            ],

            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    DeviceTypeView: (callback) => {
        pool.query(
            `SELECT 
            credential_slno,
            credential_name, 
            credential_status,
            if(device_type_status=1,'Yes','No')status
            FROM
            it_credential_type`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    DeviceTypeUpdate: (data, callback) => {
        pool.query(
            `UPDATE it_credential_type SET 
            credential_name=?,
            device_type_status=?,
            edit_user =?       
            WHERE 
            credential_slno=?`,
            [
                data.credential_name,
                data.device_type_status,
                data.edit_user,
                data.credential_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
}
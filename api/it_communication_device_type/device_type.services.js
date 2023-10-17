const { pool } = require('../../config/database')
module.exports = {
    DeviceTypeInsert: (data, callback) => {
        pool.query(
            `INSERT INTO it_communication_device_type
          ( 
            device_type_name,
            device_type_status,
            create_user
         
          )
          VALUES(?,?,?)`,
            [
                data.device_type_name,
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
            device_type_slno,
            device_type_name, 
            device_type_status,
            if(device_type_status=1,'Yes','No')status
            FROM
            it_communication_device_type`, [],
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

            `UPDATE it_communication_device_type SET 
            device_type_name=?,
            device_type_status=?,
            edit_user =?       
            WHERE 
            device_type_slno=?`,

            [


                data.device_type_name,
                data.device_type_status,
                data.edit_user,
                data.device_type_slno,

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
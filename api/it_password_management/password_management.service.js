const { pool } = require('../../config/database')
module.exports = {
    PasswordInsert: (data, callback) => {
        pool.query(
            `INSERT INTO it_password_management_main
          ( 
            device_type_slno,
            device_name,
            location_department,
            device_details,
            create_user
         
          )
          VALUES(?,?,?,?,?)`,
            [
                data.device_type_slno,
                data.device_name,
                data.location_department,
                data.device_details,
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
    PasswordView: (callback) => {
        pool.query(
            `SELECT 
            it_password_management_main.device_type_slno,
             device_type_name,
             device_name, 
             location_department,
             device_details ,
             psw_management_slno        
             FROM
             it_password_management_main
             left join it_password_device_type on it_password_device_type.device_type_slno=it_password_management_main.device_type_slno`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    PasswordUpdate: (data, callback) => {
        pool.query(

            `UPDATE it_password_management_main SET            
            device_type_slno=?,
            device_name=?,
            location_department=?,
            device_details=?,
            edit_user=?       
            WHERE 
            psw_management_slno=?`,

            [
                data.device_type_slno,
                data.device_name,
                data.location_department,
                data.device_details,
                data.edit_user,
                data.psw_management_slno
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
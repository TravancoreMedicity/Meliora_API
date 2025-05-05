const { pool } = require('../../config/database');

module.exports = {

    NotificationInsert: (data, callback) => {
        pool.query(
            `INSERT INTO notification_menu
          ( 
            notification_heading,
            notification_remarks,
            notification_status,
            create_user
         
          )
          VALUES(?,?,?,?)`,
            [
                data.notification_heading,
                data.notification_remarks,
                data.notification_status,
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
    NotificationView: (callback) => {
        pool.query(
            `SELECT 
             notification_slno, 
             notification_heading,
             notification_remarks,
             notification_status,             
             if(notification_status=1,'Yes','No')status
             FROM
             notification_menu`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    NotificationUpdate: (data, callback) => {
        pool.query(
            `UPDATE notification_menu SET 
            notification_heading=?,
            notification_remarks=?,
            notification_status=?,
            edit_user =?       
            WHERE 
            notification_slno=?`,
            [
                data.notification_heading,
                data.notification_remarks,
                data.notification_status,
                data.edit_user,
                data.notification_slno,
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
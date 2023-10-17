const { pool } = require('../../config/database')
module.exports = {
    WifiInsert: (data, callback) => {

        pool.query(
            `INSERT INTO it_wifi_management
          ( 
            in_patient_no,
            patient,
            bystander,
            extra
         
          )
          VALUES(?,?,?,?)`,
            [
                data.in_patient_no,
                data.patient,
                data.bystander,
                data.extra

            ],

            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    WifiUpdate: (data, callback) => {

        pool.query(

            `UPDATE it_wifi_management SET
                       
            patient=?,
            bystander=?,
            extra=?                        
            WHERE 
            in_patient_no=?`,
            [
                data.patient,
                data.bystander,
                data.extra,
                data.in_patient_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )

    },

    wifiViewById: (id, callback) => {
        pool.query(
            `SELECT
            in_patient_no,
            patient,
            bystander,
            extra            
            FROM it_wifi_management WHERE in_patient_no=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

}
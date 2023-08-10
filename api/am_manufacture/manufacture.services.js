const { pool } = require('../../config/database')
module.exports = {
    ManufactureInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_manufacture
          ( 
            manufacture_name,
            manufacture_status
          )
          VALUES(?,?)`,
            [
                data.manufacture_name,
                data.manufacture_status,
            ],

            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    ManufactureView: (callback) => {
        pool.query(
            `SELECT 
            manufacture_slno,
            manufacture_name, 
            manufacture_status,
            if(manufacture_status=1,'Yes','No')status
            FROM
            am_manufacture`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    ManufactureUpdate: (data, callback) => {

        pool.query(

            `UPDATE am_manufacture SET 
            manufacture_name=?,
            manufacture_status=?
            WHERE 
            manufacture_slno=?`,

            [


                data.manufacture_name,
                data.manufacture_status,
                data.manufacture_slno
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
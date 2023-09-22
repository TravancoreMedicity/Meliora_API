const { pool } = require('../../config/database')
module.exports = {
    UomInsert: (data, callback) => {
        pool.query(
            `INSERT INTO am_uom
          ( 
            uom_name,
            uom_status,
            create_user
          )
          VALUES(?,?,?)`,
            [
                data.uom_name,
                data.uom_status,
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
    Uomview: (callback) => {
        pool.query(
            `SELECT 
            uom_slno,
            uom_name, 
            uom_status,
            if(uom_status=1,'Yes','No')status
            FROM
            am_uom`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    UomUpdate: (data, callback) => {

        pool.query(

            `UPDATE am_uom SET 
            uom_name=?,
            uom_status=?,
            edit_user=?
            WHERE 
            uom_slno=?`,

            [


                data.uom_name,
                data.uom_status,
                data.edit_user,
                data.uom_slno,

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
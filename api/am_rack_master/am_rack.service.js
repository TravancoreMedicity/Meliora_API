const { pool } = require('../../config/database')
module.exports = {
    AssetRackInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_rack_mast
          ( 
            am_rack_name,
            am_rack_status,
            create_user
          )
          VALUES(?,?,?)`,
            [
                data.am_rack_name,
                data.am_rack_status,
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
    AssetRackView: (callback) => {
        pool.query(
            `SELECT 
            am_rack_slno,
            am_rack_name, 
            am_rack_status,
            if(am_rack_status=1,'Yes','No')status
            FROM
            am_rack_mast`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    AssetRackUpdate: (data, callback) => {

        pool.query(

            `UPDATE am_rack_mast SET 
            am_rack_name=?,
            am_rack_status=?,
            edit_user=?
            WHERE 
            am_rack_slno=?`,

            [


                data.am_rack_name,
                data.manufacture_status,
                data.edit_user,
                data.am_rack_slno,

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
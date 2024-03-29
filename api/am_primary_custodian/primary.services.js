const { pool } = require('../../config/database')
module.exports = {
    PrimaryInsert: (data, callback) => {
        pool.query(
            `INSERT INTO am_primary_custodian
          ( 
            primary_name,
            primary_status,
            create_user
          )
          VALUES(?,?,?)`,
            [
                data.primary_name,
                data.primary_status,
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
    PrimaryView: (callback) => {
        pool.query(
            `SELECT 
            primary_slno,
            primary_name, 
            primary_status,
            if(primary_status=1,'Yes','No')status
            FROM
            am_primary_custodian`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    PrimaryUpdate: (data, callback) => {

        pool.query(

            `UPDATE am_primary_custodian SET 
            primary_name=?,
            primary_status=?,
            edit_user=?
            WHERE 
            primary_slno=?`,

            [


                data.primary_name,
                data.primary_status,
                data.edit_user,
                data.primary_slno,

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
const { pool } = require('../../config/database')
module.exports = {
    SecondaryInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_secondary_custodian
          ( 
            secondary_name,
            secondary_status,
            create_user
          )
          VALUES(?,?,?)`,
            [
                data.secondary_name,
                data.secondary_status,
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
    SecondaryView: (callback) => {
        pool.query(
            `SELECT 
            secondary_slno,
            secondary_name, 
            secondary_status,
            if(secondary_status=1,'Yes','No')status
            FROM
            am_secondary_custodian`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    SecondaryUpdate: (data, callback) => {

        pool.query(

            `UPDATE am_secondary_custodian SET 
            secondary_name=?,
            secondary_status=?,
            edit_user=?
            WHERE 
            secondary_slno=?`,

            [


                data.secondary_name,
                data.secondary_status,
                data.edit_user,
                data.secondary_slno,

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
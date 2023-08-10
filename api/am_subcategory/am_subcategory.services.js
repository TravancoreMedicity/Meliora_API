const { pool } = require('../../config/database')
module.exports = {
    SubCategoryInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_subcategory
          ( 
            subcategory_name,
            subcategory_status
          )
          VALUES(?,?)`,
            [
                data.subcategory_name,
                data.subcategory_status,
            ],

            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    SubCategoryView: (callback) => {
        pool.query(
            `SELECT 
            subcategory_slno,
            subcategory_name, 
            subcategory_status,
            if(subcategory_status=1,'Yes','No')status
            FROM
            am_subcategory`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    SubCategoryUpdate: (data, callback) => {

        pool.query(

            `UPDATE am_subcategory SET 
            subcategory_name=?,
            subcategory_status=?
            WHERE 
            subcategory_slno=?`,

            [


                data.subcategory_name,
                data.subcategory_status,
                data.subcategory_slno
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
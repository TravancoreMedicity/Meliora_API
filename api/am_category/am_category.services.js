const { pool } = require('../../config/database')
module.exports = {
    CategoryInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_category
          ( 
            category_name,
            category_status,
            am_category_pm_days,
            create_user
          )
          VALUES(?,?,?,?)`,
            [
                data.category_name,
                data.category_status,
                data.am_category_pm_days,
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
    CategoryView: (callback) => {
        pool.query(
            `SELECT 
            category_slno,
            category_name, 
            category_status,
            am_category_pm_days,
            mime_type,
            file_name,
            if(category_status=1,'Yes','No')status
            FROM
            am_category`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    CategoryUpdate: (data, callback) => {

        pool.query(

            `UPDATE am_category SET 
            category_name=?,
            category_status=?,
            am_category_pm_days=?,
            edit_user=?
            WHERE 
            category_slno=?`,

            [


                data.category_name,
                data.category_status,
                data.am_category_pm_days,
                data.edit_user,
                data.category_slno,

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
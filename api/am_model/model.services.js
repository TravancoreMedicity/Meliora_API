const { pool } = require('../../config/database')
module.exports = {
    ModelInsert: (data, callback) => {
        pool.query(
            `INSERT INTO am_model
          ( 
            model_name,
            model_status
          )
          VALUES(?,?)`,
            [
                data.model_name,
                data.model_status,
            ],

            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    ModelView: (callback) => {
        pool.query(
            `SELECT 
            model_slno,
            model_name, 
            model_status,
            if(model_status=1,'Yes','No')status
            FROM
            am_model`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    ModelUpdate: (data, callback) => {

        pool.query(

            `UPDATE am_model SET 
            model_name=?,
            model_status=?
            WHERE 
            model_slno=?`,

            [


                data.model_name,
                data.model_status,
                data.model_slno
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
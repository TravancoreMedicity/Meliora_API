const { pool } = require('../../config/database')
module.exports = {
    SubmodelInsert: (data, callback) => {
        pool.query(
            `INSERT INTO am_submodel
          ( 
            submodel_name,
            model_slno,
            submodel_status,
            create_user
          )
          VALUES(?,?,?,?)`,
            [
                data.submodel_name,
                data.model_slno,
                data.submodel_status,
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
    Submodelview: (callback) => {
        pool.query(
            `SELECT 
            submodel_slno,
            submodel_name, 
            am_model.model_name,
            submodel_status,
            am_model.model_slno,
            if(submodel_status=1,'Yes','No')status
            FROM
            am_submodel
            left join am_model on am_model.model_slno=am_submodel.model_slno`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    SubmodelUpdate: (data, callback) => {

        pool.query(

            `UPDATE am_submodel SET 
            submodel_name=?,
            model_slno=?,
            submodel_status=?,
            edit_user=?
            WHERE 
            submodel_slno=?`,

            [


                data.submodel_name,
                data.model_slno,
                data.submodel_status,
                data.edit_user,
                data.submodel_slno,

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
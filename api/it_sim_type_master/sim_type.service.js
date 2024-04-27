const { pool } = require('../../config/database')
module.exports = {
    SimTypeInsert: (data, callback) => {
        pool.query(
            `INSERT INTO it_sim_type_master
          ( 
            it_sim_type_name,
            it_sim_type_status,
            create_user
         
          )
          VALUES(?,?,?)`,
            [
                data.it_sim_type_name,
                data.it_sim_type_status,
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
    SimTypeView: (callback) => {
        pool.query(
            `SELECT 
            it_sim_type_slno,
            it_sim_type_name, 
            it_sim_type_status,
            if(it_sim_type_status=1,'Yes','No')status
            FROM
            it_sim_type_master`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    SimtypeUpdate: (data, callback) => {

        pool.query(

            `UPDATE it_sim_type_master SET 
            it_sim_type_name=?,
            it_sim_type_status=?,
            edit_user =?       
            WHERE 
            it_sim_type_slno=?`,

            [


                data.it_sim_type_name,
                data.it_sim_type_status,
                data.edit_user,
                data.it_sim_type_slno,

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
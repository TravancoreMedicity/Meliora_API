const { pool } = require('../../config/database')
module.exports = {
    simOperatorInsert: (data, callback) => {
        pool.query(
            `INSERT INTO it_sim_operators
          ( 
            sim_operator_name,
            sim_operator_status,
            create_user
         
          )
          VALUES(?,?,?)`,
            [
                data.sim_operator_name,
                data.sim_operator_status,
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
    simOperatorView: (callback) => {
        pool.query(
            `SELECT 
            sim_operator_id,
            sim_operator_name, 
            sim_operator_status,
            if(sim_operator_status=1,'Yes','No')status
            FROM
            it_sim_operators`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    simOperatorUpdate: (data, callback) => {

        pool.query(
            `UPDATE it_sim_operators SET 
            sim_operator_name=?,
            sim_operator_status=?,
            edit_user =?       
            WHERE 
            sim_operator_id=?`,
            [
                data.sim_operator_name,
                data.sim_operator_status,
                data.edit_user,
                data.sim_operator_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getsimOperator: (callback) => {
        pool.query(
            `SELECT 
            sim_operator_id,
            sim_operator_name, 
            sim_operator_status            
            FROM
            it_sim_operators
            where sim_operator_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
}
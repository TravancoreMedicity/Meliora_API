const { pool } = require('../../config/database')
module.exports = {
    requestRegistInsert: (data, callback) => {
        console.log(data);
        pool.query(
            `INSERT INTO rm_request_master (
                actual_requirement,
                needed,
                request_dept_slno,
                request_deptsec_slno,
                location,
                create_user,
                remarks
               )
                VALUES(?,?,?,?,?,?,?)`,
            [
                data.actual_requirement,
                data.needed,
                data.request_dept_slno,
                data.request_deptsec_slno,
                data.location,
                data.create_user,
                data.remarks
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    requestRegistInsertDetl: (data, callback) => {
        console.log("Service");
        console.log(data);
        pool.query(
            `INSERT INTO rm_request_mast_detail (
                req_slno,
                item_slno,
                item_desc,
                item_unit,
                item_qnty,
                item_specification,
                aprox_cost,
                item_status,
                create_user
               )
               values ?`,
            [
                data
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

}
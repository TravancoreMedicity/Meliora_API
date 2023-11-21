const { pool } = require('../../config/database')
module.exports = {
    CampusInsert: (data, callback) => {
        pool.query(
            `INSERT INTO rm_campus_mast
          (
            rm_campus_name,
             rm_campus_alias,
              rm_campus_no,
               rm_campus_status,
               create_user
          )
          VALUES(?,?,?,?,?)`,
            [
                data.rm_campus_name,
                data.rm_campus_alias,
                data.rm_campus_no,
                data.rm_campus_status,
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
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT rm_campus_name          
            FROM rm_campus_mast
            WHERE rm_campus_name=?`,
            [
                data.rm_campus_name

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    CampusView: (callback) => {
        pool.query(
            `SELECT 
            rm_campus_slno,
            rm_campus_name,
            rm_campus_alias,
            rm_campus_no,
            rm_campus_status,
            if( rm_campus_status=1,'Yes','No')status
            FROM
            rm_campus_mast`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    CampusUpdate: (data, callback) => {

        pool.query(

            `UPDATE rm_campus_mast SET 
            rm_campus_name=?,
            rm_campus_alias=?,
            rm_campus_no=?,
            rm_campus_status=?,
            edit_user=?
             WHERE rm_campus_slno=?`,
            [
                data.rm_campus_name,
                data.rm_campus_alias,
                data.rm_campus_no,
                data.rm_campus_status,
                data.edit_user,
                data.rm_campus_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT rm_campus_name,               
            rm_campus_slno
            FROM rm_campus_mast
            WHERE rm_campus_name = ?  AND rm_campus_slno != ?`,
            [
                data.rm_campus_name,
                data.rm_campus_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
}
const { pool } = require('../../config/database')
module.exports = {
    FloorInsert: (data, callback) => {
        pool.query(
            `INSERT INTO rm_floor_master
          (
            rm_floor_name, 
            rm_floor_alias, 
            rm_floor_no, 
            rm_floor_status
          )
          VALUES(?,?,?,?)`,
            [
                data.rm_floor_name,
                data.rm_floor_alias,
                data.rm_floor_no,
                data.rm_floor_status

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
            `SELECT rm_floor_name,
            rm_floor_status
            FROM rm_floor_master
            WHERE rm_floor_name=? `,
            [
                data.rm_floor_name
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    FloorView: (callback) => {
        pool.query(
            `SELECT 
            rm_floor_slno,
            rm_floor_name, 
            rm_floor_alias, 
            rm_floor_no, 
            rm_floor_status,
            if( rm_floor_status=1,'Yes','No')status
            FROM
            rm_floor_master`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT rm_floor_name,               
            rm_floor_slno
            FROM rm_floor_master
            WHERE rm_floor_name = ?  AND rm_floor_slno != ?`,
            [
                data.rm_floor_name,
                data.rm_floor_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    FloorUpdate: (data, callback) => {

        pool.query(

            `UPDATE rm_floor_master SET 
            rm_floor_name=?,
            rm_floor_alias=?,
            rm_floor_no=?,
            rm_floor_status=? 
            WHERE 
            rm_floor_slno=?`,
            [
                data.rm_floor_name,
                data.rm_floor_alias,
                data.rm_floor_no,
                data.rm_floor_status,
                data.rm_floor_slno,
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
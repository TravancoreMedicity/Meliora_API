const { pool } = require('../../config/database')
module.exports = {
    BuildingInsert: (data, callback) => {
        pool.query(
            `INSERT INTO rm_building_mast
          (
           rm_building_name,
           rm_building_alias,
           rm_building_no,
           rm_building_status
          )
          VALUES(?,?,?,?)`,
            [
                data.rm_building_name,
                data.rm_building_alias,
                data.rm_building_no,
                data.rm_building_status

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
            `SELECT rm_building_name,
            rm_building_status
            FROM rm_building_mast
            WHERE rm_building_name=? `,
            [
                data.rm_building_name
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    BuildingView: (callback) => {
        pool.query(
            `SELECT 
            rm_building_slno,
            rm_building_name,
            rm_building_alias,
            rm_building_no,
            rm_building_status,
            if( rm_building_status=1,'Yes','No')status
            FROM
            rm_building_mast`, [],
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
            `SELECT rm_building_name,               
            rm_building_slno
            FROM rm_building_mast
            WHERE rm_building_name = ?  AND rm_building_slno != ?`,
            [
                data.rm_building_name,
                data.rm_building_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    BuildingUpdate: (data, callback) => {

        pool.query(

            `UPDATE rm_building_mast SET 
            rm_building_name=?,
            rm_building_alias=?,
            rm_building_no=?,
            rm_building_status=? 
            WHERE 
            rm_building_slno=?`,
            [
                data.rm_building_name,
                data.rm_building_alias,
                data.rm_building_no,
                data.rm_building_status,
                data.rm_building_slno,
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
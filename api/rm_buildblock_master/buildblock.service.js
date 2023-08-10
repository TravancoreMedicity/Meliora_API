const { pool } = require('../../config/database')

module.exports = {
    BuildBlockInsert: (data, callback) => {
        pool.query(
            `INSERT INTO rm_buildblock_mast
            ( 
              rm_buildblock_name, 
              rm_buildblock_alias, 
              rm_buildblock_no, 
              rm_buildblock_status
            )
            VALUES(?,?,?,?)`,
            [
                data.rm_buildblock_name,
                data.rm_buildblock_alias,
                data.rm_buildblock_no,
                data.rm_buildblock_status
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
            `SELECT rm_buildblock_name,
            rm_buildblock_status
            FROM rm_buildblock_mast
            WHERE rm_buildblock_name=?`,
            [
                data.rm_buildblock_name
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    BuildBlockView: (callback) => {
        pool.query(
            `SELECT 
            rm_buildblock_slno,
            rm_buildblock_name, 
            rm_buildblock_alias, 
            rm_buildblock_no, 
            rm_buildblock_status,
            if( rm_buildblock_status=1,'Yes','No')status
            FROM
            rm_buildblock_mast`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    BuildBlockUpdate: (data, callback) => {

        pool.query(

            `UPDATE 
            rm_buildblock_mast 
            SET rm_buildblock_name=?,
            rm_buildblock_alias=?,
            rm_buildblock_no=?,
            rm_buildblock_status=? 
            WHERE
            rm_buildblock_slno=?`,
            [
                data.rm_buildblock_name,
                data.rm_buildblock_alias,
                data.rm_buildblock_no,
                data.rm_buildblock_status,
                data.rm_buildblock_slno,
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
            `SELECT rm_buildblock_name,               
            rm_buildblock_slno
            FROM rm_buildblock_mast
            WHERE rm_buildblock_name = ?  AND rm_buildblock_slno != ?`,
            [
                data.rm_buildblock_name,
                data.rm_buildblock_slno
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


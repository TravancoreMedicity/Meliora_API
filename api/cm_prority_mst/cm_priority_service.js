const { pool } = require('../../config/database')
module.exports = {
    PriorityInsertData: (data, callback) => {
        pool.query(
            `INSERT INTO cm_priority_mast
            (
                cm_priority_desc,
                cm_priority_status,
                create_user
               ) 
                VALUES(?,?,?)`,
            [
                data.cm_priority_desc,
                data.cm_priority_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
    },
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT cm_priority_desc,
            cm_priority_status
            FROM cm_priority_mast
            WHERE cm_priority_desc=? `,
            [
                data.cm_priority_desc
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT cm_priority_desc,               
            cm_priority_slno
            FROM cm_priority_mast
            WHERE cm_priority_desc = ?  AND cm_priority_slno != ?`,
            [
                data.cm_priority_desc,
                data.cm_priority_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    PriorityUpdateData: (data, callback) => {
        pool.query(
            `UPDATE cm_priority_mast 
            SET cm_priority_desc=?,
            cm_priority_status=?,
            edit_user=?        
          WHERE cm_priority_slno=? `,
            [
                data.cm_priority_desc,
                data.cm_priority_status,
                data.edit_user,
                data.cm_priority_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    PrioritySelectData: (callback) => {
        pool.query(
            ` SELECT cm_priority_slno, cm_priority_desc, 
            cm_priority_status,
             if(cm_priority_status = 1 ,'Yes','No')status
            FROM cm_priority_mast`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    PrioritySelectCmp: (callback) => {
        pool.query(
            ` SELECT cm_priority_slno, cm_priority_desc                        
            FROM cm_priority_mast`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    }

}

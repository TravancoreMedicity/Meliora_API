const { pool } = require('../../config/database')
module.exports = {
    PriorityInsertData: (data, callback) => {
        pool.query(
            `INSERT INTO cm_priority_mast
            (
                cm_priority_desc,
                cm_priority_status,
                escalation_min,
                escalation_max,
                create_user
               ) 
                VALUES(?,?,?,?,?)`,
            [
                data.cm_priority_desc,
                data.cm_priority_status,
                data.escalation_min,
                data.escalation_max,
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
            escalation_min=?,
                escalation_max=?,
            edit_user=?        
          WHERE cm_priority_slno=? `,
            [
                data.cm_priority_desc,
                data.cm_priority_status,
                data.escalation_min,
                data.escalation_max,
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
            cm_priority_status,escalation_min,escalation_max,
            IFNULL(escalation_min,"Not Given")as escalation_min_dis,
            IFNULL(escalation_max,"Not Given")as escalation_max_dis,
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
            ` SELECT cm_priority_slno, cm_priority_desc    ,
            escalation_min,escalation_max                    
            FROM cm_priority_mast
            where
            cm_priority_status=1
            `,
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

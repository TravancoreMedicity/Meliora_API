const { pool } = require('../../config/database')
module.exports = {


    complaintHoldInsert: (data, callback) => {

        pool.query(
            `INSERT INTO cm_hold_reason_mast
            (            
                cm_hold_reason,
                hold_reason_status,
                hold_color,            
                create_user           
            )
            VALUES (?,?,?,?)`,
            [
                data.cm_hold_reason,
                data.hold_reason_status,
                data.hold_color,
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
    holdReasonget: (callBack) => {
        pool.query(
            `SELECT 
                    cm_hold_id,cm_hold_reason,hold_reason_status,hold_color
             FROM
                     cm_hold_reason_mast
             WHERE
                     hold_reason_status=1 `,
            [],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },
    complaintHoldUpdate: (data, callback) => {
        pool.query(
            `UPDATE cm_hold_reason_mast SET                 
            cm_hold_reason=?,          
            edit_user=?,
            hold_reason_status=?,
            hold_color=?
 			WHERE 
             cm_hold_id=?`,
            [
                data.cm_hold_reason,
                data.edit_user,
                data.hold_reason_status,
                data.hold_color,
                data.cm_hold_id
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
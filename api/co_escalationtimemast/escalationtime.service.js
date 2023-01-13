const { pool } = require('../../config/database')
module.exports = {
    EscalationTimeInsert: (data, callback) => {
        pool.query(
            `INSERT INTO co_time_escalation
            (
                esc_activity,
                esc_responsibility,
                esc_time_limit,
                esc_lvl1,
                esc_lvl2,
                esc_lvl3,
                esc_lvl4,
                esc_top_lvl,
                esc_status,
                create_user
               )
                VALUES(?,?,?,?,?,?,?,?,?,?)`,
            [
                data.esc_activity,
                data.esc_responsibility,
                data.esc_time_limit,
                data.esc_lvl1,
                data.esc_lvl2,
                data.esc_lvl3,
                data.esc_lvl4,
                data.esc_top_lvl,
                data.esc_status,
                data.create_user,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getEscalation: (callBack) => {
        pool.query(
            `SELECT esc_slno,esc_activity,esc_responsibility,time(esc_time_limit) as esc_time_limit1,esc_time_limit,time(esc_lvl1) as lvl1,time(esc_lvl2) as lvl2,time(esc_lvl3) as lvl3,
            time(esc_lvl4) as lvl4,time(esc_top_lvl) as toplvl,
                        esc_lvl1,esc_lvl2,esc_lvl3,esc_lvl4,esc_top_lvl,
                        if(esc_status=1,'Yes','No')status
                         FROM co_time_escalation`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    EscalationUpdate: (data, callback) => {
        pool.query(
            `UPDATE  co_time_escalation 
                SET esc_activity = ?,
                esc_responsibility = ?,
                esc_time_limit=?,
                esc_lvl1=?,
                esc_lvl2=?,
                esc_lvl3=?,
                esc_lvl4=?,
                esc_top_lvl=?,
                esc_status=?,
                edit_user=?
                WHERE esc_slno = ?`,
            [
                data.esc_activity,
                data.esc_responsibility,
                data.esc_time_limit,
                data.esc_lvl1,
                data.esc_lvl2,
                data.esc_lvl3,
                data.esc_lvl4,
                data.esc_top_lvl,
                data.esc_status,
                data.edit_user,
                data.esc_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT esc_activity
            FROM co_time_escalation
            WHERE esc_activity=? `,
            [
                data.esc_activity
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
            `SELECT esc_activity             
            FROM co_time_escalation 
            WHERE esc_activity = ?  AND esc_slno != ?`,
            [
                data.esc_activity,
                data.esc_slno
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
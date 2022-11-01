const { pool } = require('../../config/database')

module.exports = {
    hicPolicyInsert: (data, callback) => {
        pool.query(
            `INSERT INTO meliora_old.cm_hic_policy
            (
                hic_policy_name,
                hic_policy_status,
                start_time,
                end_time
               )
                VALUES(?,?,?,?)`,
            [
                data.hic_policy_name,
                data.hic_policy_status,
                data.start_time,
                data.end_time
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
            `SELECT hic_policy_name,
            hic_policy_status
            FROM cm_hic_policy
            WHERE hic_policy_name=? `,
            [
                data.hic_policy_name
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
            `SELECT hic_policy_name,               
            hic_policy_status
            FROM cm_hic_policy 
            WHERE hic_policy_name = ?  AND hic_policy_slno != ?`,
            [
                data.hic_policy_name,
                data.hic_policy_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    hicPolicyUpdate: (data, callback) => {
        pool.query(
            `UPDATE cm_hic_policy 
                SET hic_policy_name = ?,
                hic_policy_status = ?
                WHERE hic_policy_slno = ?`,
            [
                data.hic_policy_name,
                data.hic_policy_status,
                data.hic_policy_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getHicpolicy: (callBack) => {
        pool.query(
            `SELECT hic_policy_slno,
            hic_policy_name,
                if(hic_policy_status = 1 ,'Yes','No') status
            FROM cm_hic_policy`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getHicpolicyById: (data, callBack) => {
        pool.query(
            `SELECT hic_policy_slno,
            hic_policy_name,
            hic_policy_status
            FROM cm_hic_policy
            WHERE hic_policy_slno IN(?)`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getHicpolicyStatus: (callBack) => {
        pool.query(
            `SELECT hic_policy_slno,hic_policy_name FROM cm_hic_policy WHERE hic_policy_status=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    hicPolicyDelete: (data, callBack) => {
        pool.query(
            `DELETE FROM cm_hic_policy WHERE hic_policy_slno = ?`,
            [
                data.hic_policy_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
}
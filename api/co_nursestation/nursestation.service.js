const { pool } = require('../../config/database')
module.exports = {
    InsertNurseStation: (data, callback) => {
        pool.query(
            `insert into co_nursestation
            (
            co_nurse_desc,
            co_ora_nurse,
            co_status,
            ns_building,
            ns_floor,
            ns_ora_outlet,
            em_id
            ) values (?,?,?,?,?,?,?)`,
            [

                data.co_nurse_desc,
                data.co_ora_nurse,
                data.co_status,
                data.ns_building,
                data.ns_floor,
                data.ns_ora_outlet,
                data.em_id

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
            `SELECT co_nurse_desc,
            co_status
            FROM co_nursestation
            WHERE co_nurse_desc=? `,
            [
                data.co_nurse_desc
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getNurseStation: (callback) => {
        pool.query(
            `select co_nurse_slno,
            co_nurse_desc,
            nsc_desc,
            co_ora_nurse,
            co_status,
            ns_floor,ns_ora_outlet,ns_building,
            if(co_status = 1 ,'Yes','No')status ,
            em_id 
            from co_nursestation
            left join ora_nurstation on co_nursestation.co_ora_nurse =ora_nurstation.ns_code`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT co_nurse_desc,               
            co_nurse_slno
            FROM co_nursestation
            WHERE co_nurse_desc = ?  AND co_nurse_slno != ?`,
            [
                data.co_nurse_desc,
                data.co_nurse_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    UpdateNurseStation: (data, callBack) => {

        pool.query(
            `UPDATE co_nursestation 
            SET co_nurse_desc = ?,
            co_ora_nurse = ?,
            co_status=?,
            em_id = ?,
            ns_building=?,
            ns_floor=?,
            ns_ora_outlet=?
            WHERE co_nurse_slno = ?`,
            [
                data.co_nurse_desc,
                data.co_ora_nurse,
                data.co_status,
                data.em_id,
                data.ns_building,
                data.ns_floor,
                data.ns_ora_outlet,
                data.co_nurse_slno,

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getNurstation: (callBack) => {
        pool.query(
            `select co_ora_nurse,
            co_nurse_desc 
        from co_nursestation`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
}

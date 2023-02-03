const { pool } = require('../../config/database');

module.exports = {

    updateNdrfConvert: (data, callback) => {
        pool.query(
            `UPDATE rm_request_master 
            SET rm_ndrf=1            
            WHERE req_slno=?`,
            [
                data.rm_ndrf,
                data.req_slno
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
            `SELECT req_slno
              FROM rm_ndrf_mast
            WHERE req_slno = ?`,
            [
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    InsertNdrf: (data, callBack) => {
        pool.query(
            `INSERT INTO rm_ndrf_mast (
                req_slno,
                actual_requirement,
                needed,
                request_dept_slno,
                request_deptsec_slno,
                location,                
                create_user
            )
            VALUES (?,?,?,?,?,?,?)`,
            [
                data.req_slno,
                data.actual_requirement,
                data.needed,
                data.request_dept_slno,
                data.request_deptsec_slno,
                data.location,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getNdrfList: (callback) => {
        pool.query(
            `select rm_request_master.req_slno,ndrf_date,rm_request_master.actual_requirement,
            rm_request_master.needed,rm_request_master.location,
            rm_request_master.request_dept_slno,rm_request_master.request_deptsec_slno ,
            co_department_mast.dept_name as req_dept,total_approx_cost,
            co_deptsec_mast.sec_name as req_deptsec,rm_request_master.remarks,
            date(rm_request_master.create_date) as req_date,date(rm_request_master.expected_date)  as expected_date
               from rm_ndrf_mast                       
               left join co_department_mast on co_department_mast.dept_id= rm_ndrf_mast.request_dept_slno 
               left join co_deptsec_mast on co_deptsec_mast.sec_id= rm_ndrf_mast.request_deptsec_slno       
               left join rm_request_master on rm_request_master.req_slno=rm_ndrf_mast.req_slno
               `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
}
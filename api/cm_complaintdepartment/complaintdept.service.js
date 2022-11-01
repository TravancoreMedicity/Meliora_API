const { pool } = require('../../config/database')
module.exports = {
    complaintDeptInsert: (data, callback) => {
        pool.query(
            `INSERT INTO cm_complaint_dept
            (
                complaint_dept_name,
                department_slno,
                complaint_dept_status
               )
                VALUES(?,?,?)`,
            [
                data.complaint_dept_name,
                data.department_slno,
                data.complaint_dept_status,

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
            `SELECT complaint_dept_name,
            complaint_dept_status
            FROM cm_complaint_dept
            WHERE complaint_dept_name=? `,
            [
                data.complaint_dept_name
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
            `SELECT complaint_dept_name,               
            complaint_dept_slno
            FROM cm_complaint_dept 
            WHERE complaint_dept_name = ?  AND complaint_dept_slno != ?`,
            [
                data.complaint_dept_name,
                data.complaint_dept_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    complaintDeptUpdate: (data, callback) => {
        pool.query(
            `UPDATE cm_complaint_dept 
                SET complaint_dept_name = ?,
                department_slno=?,
                complaint_dept_status = ?
                WHERE complaint_dept_slno = ?`,
            [
                data.complaint_dept_name,
                data.department_slno,
                data.complaint_dept_status,
                data.complaint_dept_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getcomplaintDept: (callBack) => {
        pool.query(
            `SELECT complaint_dept_slno,department_slno,dept_name,
            complaint_dept_name,
                if(complaint_dept_status = 1 ,'Yes','No') status
            FROM cm_complaint_dept left join co_department_mast on co_department_mast.dept_id=cm_complaint_dept.department_slno`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getcomplaintDeptById: (data, callBack) => {
        pool.query(
            `SELECT complaint_dept_slno,
            complaint_dept_name,
            complaint_dept_status
            FROM cm_complaint_dept
            WHERE complaint_dept_slno IN(?)`,
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
    deletecomplaintDept: (data, callBack) => {
        pool.query(
            `DELETE FROM cm_complaint_dept WHERE complaint_dept_slno = ?`,
            [
                data.complaint_dept_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getComplaintDeptStatus: (callBack) => {
        pool.query(
            `SELECT complaint_dept_slno,complaint_dept_name FROM cm_complaint_dept WHERE complaint_dept_status=1`,
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }

}
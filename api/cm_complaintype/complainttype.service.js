const { pool } = require('../../config/database')

module.exports = {
    complaintTypeInsert: (data, callback) => {
        pool.query(
            `INSERT INTO cm_complaint_type
            (
                complaint_type_name,
                complaint_dept_slno,
                complaint_type_status
               )
                VALUES(?,?,?)`,
            [

                data.complaint_type_name,
                data.complaint_dept_slno,
                data.complaint_type_status,

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
            `SELECT complaint_type_name,
            complaint_type_status
            FROM cm_complaint_type
            WHERE complaint_type_name=? `,
            [
                data.complaint_type_name
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
            `SELECT complaint_type_name,               
            complaint_type_slno
            FROM cm_complaint_type 
            WHERE complaint_type_name = ?  AND complaint_type_slno != ?`,
            [
                data.complaint_type_name,
                data.complaint_type_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    complaintTypeUpdate: (data, callback) => {
        pool.query(
            `UPDATE cm_complaint_type 
                SET complaint_type_name = ?,
                complaint_type_status = ?,
                complaint_dept_slno=?
                WHERE complaint_type_slno = ?`,
            [
                data.complaint_type_name,
                data.complaint_type_status,
                data.complaint_dept_slno,
                data.complaint_type_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getcomplaintType: (callBack) => {
        pool.query(
            `SELECT complaint_type_slno,complaint_type_name,complaint_dept_name,cm_complaint_type.complaint_dept_slno,
            if(complaint_type_status = 1 ,'Yes','No') status
        FROM cm_complaint_type
        LEFT JOIN cm_complaint_dept on cm_complaint_type.complaint_dept_slno=cm_complaint_dept.complaint_dept_slno;`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getcomplaintTypeById: (data, callBack) => {
        pool.query(
            `SELECT complaint_type_slno,
            complaint_type_name,
            complaint_type_status,
            complaint_dept_slno
            FROM cm_complaint_type
            WHERE complaint_type_slno IN(?)`,
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
    deletecomplaintType: (data, callBack) => {
        pool.query(
            `DELETE FROM cm_complaint_type WHERE complaint_type_slno =?`,
            [
                data.complaint_type_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getcomplaintTypeStatus: (callBack) => {
        pool.query(
            `SELECT complaint_type_slno,complaint_type_name FROM cm_complaint_type WHERE complaint_type_status=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    complaintTypeById: (id, callBack) => {
        pool.query(
            `select complaint_type_slno,complaint_type_name from cm_complaint_type
            where complaint_dept_slno=?`,
            [
                id
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
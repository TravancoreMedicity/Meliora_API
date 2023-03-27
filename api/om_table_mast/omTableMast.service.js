const { pool } = require('../../config/database')

module.exports = {
    omTableInsert: (data, callback) => {
        pool.query(
            `INSERT INTO rm_om_tables
            (
                omtable_name,
                om_dept_slno,
                om_dept_sec_slno,
                omtable_emp_id,
                omtable_status,
                create_user
               )
                VALUES(?,?,?,?,?,?)`,
            [
                data.omtable_name,
                data.om_dept_slno,
                data.om_dept_sec_slno,
                data.omtable_emp_id,
                data.omtable_status,
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
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT omtable_name
            FROM rm_om_tables
            WHERE omtable_name=? `,
            [
                data.omtable_name
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    omtableGet: (callBack) => {
        pool.query(
            `select omtable_name,omtable_no,omtable_status,om_dept_slno,
            om_dept_sec_slno,omtable_emp_id, co_department_mast.dept_name,
            co_deptsec_mast.sec_name,co_employee_master.em_name,
              if(omtable_status = 1 ,'Yes','No') status 
            from rm_om_tables
            left join co_department_mast on co_department_mast.dept_id=rm_om_tables.om_dept_slno
            left join co_deptsec_mast on co_deptsec_mast.sec_id=rm_om_tables.om_dept_sec_slno
            left join co_employee_master on co_employee_master.em_id=rm_om_tables.omtable_emp_id`,
            [],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT omtable_name,               
            omtable_no 
            FROM rm_om_tables 
            WHERE omtable_name = ?  AND omtable_no != ?`,
            [
                data.omtable_name,
                data.omtable_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },


    omTableUpdate: (data, callback) => {
        pool.query(
            `UPDATE rm_om_tables 
                SET omtable_name = ?,
                om_dept_slno=?,
                om_dept_sec_slno=?,
                omtable_emp_id=?,
                omtable_status=?,
                edit_user=?
                WHERE omtable_no = ?`,
            [
                data.omtable_name,
                data.om_dept_slno,
                data.om_dept_sec_slno,
                data.omtable_emp_id,
                data.omtable_status,
                data.edit_user,
                data.omtable_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    omtableGetselect: (callBack) => {
        pool.query(
            `select omtable_name,omtable_no
            from rm_om_tables
            where omtable_status=1`,
            [],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

}
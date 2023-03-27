const { pool } = require('../../config/database')

module.exports = {
    omEmpInsert: (data, callback) => {
        pool.query(
            `INSERT INTO om_emp_mapping
            (    om_table_slno,
                 om_emp_deptno,
                 om_emp_deptsec_no, 
                 om_emp_id, 
                 om_emp_status,
                 create_user          
              
               )
                VALUES(?,?,?,?,?,?)`,
            [
                data.om_table_slno,
                data.om_emp_deptno,
                data.om_emp_deptsec_no,
                data.om_emp_id,
                data.om_emp_status,
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
            `SELECT om_table_slno
            FROM om_emp_mapping
            WHERE om_table_slno=? `,
            [
                data.om_table_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    omEmpGet: (callBack) => {
        pool.query(
            `select om_table_slno,om_emp_deptno,om_emp_deptsec_no,om_emp_id,
            co_department_mast.dept_name,om_emp_slno,
            co_deptsec_mast.sec_name,co_employee_master.em_name,
            rm_om_tables.omtable_name,om_emp_status,
            if(om_emp_status = 1 ,'Yes','No') status 
            from om_emp_mapping
            left join rm_om_tables on rm_om_tables.omtable_no=om_emp_mapping.om_table_slno
            left join co_department_mast on co_department_mast.dept_id=om_emp_mapping.om_emp_deptno
            left join co_deptsec_mast on co_deptsec_mast.sec_id=om_emp_mapping.om_emp_deptsec_no
            left join co_employee_master on co_employee_master.em_id=om_emp_mapping.om_emp_id`,
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
            `SELECT om_table_slno,               
            om_emp_slno 
            FROM om_emp_mapping 
            WHERE om_table_slno = ?  AND om_emp_slno != ?`,
            [
                data.om_table_slno,
                data.om_emp_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },


    omEmpUpdate: (data, callback) => {
        console.log(data);
        pool.query(
            `UPDATE om_emp_mapping 
                SET om_table_slno = ?,
                om_emp_deptno=?,
                om_emp_deptsec_no=?,
                om_emp_id=?,
                om_emp_status=?,
                edit_user=?
                WHERE om_emp_slno = ?`,
            [
                data.om_table_slno,
                data.om_emp_deptno,
                data.om_emp_deptsec_no,
                data.om_emp_id,
                data.om_emp_status,
                data.edit_user,
                data.om_emp_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

}
const { pool } = require('../../config/database');


module.exports = {
    employeeinsert: (data, callBack) => {
        pool.query(
            `INSERT INTO co_employee
        (    
            emp_username,
            emp_password,
            emp_status ,
            em_id,
            emp_no,
            emp_email
       )
        VALUES(?,?,?,?,?,?)`,
            [
                data.emp_username,
                data.emp_password,
                data.emp_status,
                data.em_id,
                data.emp_no,
                data.emp_email
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    employeemoduleGroup: (data, callback) => {
        pool.query(
            `INSERT INTO module_group_user_rights
            (
                emp_slno,
                mod_grp_slno,
                user_group_slno,
                mod_grp_user_status,
                dept_slno,
                deptsec_slno,
                create_user
               )
                VALUES(?,?,?,?,?,?,?)`,
            [
                data.emp_slno,
                data.mod_grp_slno,
                data.user_group_slno,
                data.mod_grp_user_status,
                data.dept_slno,
                data.deptsec_slno,
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
            `SELECT emp_username,
            emp_status
            FROM co_employee
            WHERE emp_username = ?`,
            [
                data.emp_username,
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
            `SELECT emp_username,               
            emp_slno
            FROM co_employee 
            WHERE emp_username = ?  AND emp_slno != ?`,
            [
                data.emp_username,
                data.emp_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    employeeupdate: (data, callBack) => {
        pool.query(
            `UPDATE co_employee
                SET
                    emp_username = ?,
                    emp_password = ?,                    
                    emp_status = ? ,
                    emp_id=?,

                WHERE emp_slno = ?`,
            [
                data.emp_username,
                data.emp_password,
                data.emp_status,
                data.emp_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getEmployeeByUserName: (userName, callBack) => {
        pool.query(
            `SELECT co_employee_master.em_name,emp_username,emp_password,app_token,co_employee_master.em_department,
            co_employee_master.em_id,co_employee.emp_no,co_employee_master.em_dept_section,sec_name
             FROM meliora.co_employee
            LEFT JOIN co_employee_master ON co_employee_master.em_no=co_employee.emp_no
            LEFT JOIN co_deptsec_mast ON co_deptsec_mast.sec_id=co_employee_master.em_dept_section
             WHERE emp_username = ? AND emp_status = '1'`,
            [userName],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    employeedelete: (data, callBack) => {
        pool.query(
            `UPDATE co_employee set emp_status = '0' WHERE emp_slno = ? `,
            [
                data.emp_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getemplpyee: (callBack) => {
        pool.query(`SELECT * FROM co_employee`, [],
            function (err, results) {

                if (err) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    employeeGetById: (id, callBack) => {
        pool.query(
            `SELECT  * FROM co_employee
            WHERE emp_slno = ?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results[0]);
            }
        );
    },

    empInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO co_employee_master (em_id,em_no,em_salutation,em_name,em_gender,em_dob,em_doj,
                em_mobile, em_email, em_branch ,em_department,em_dept_section,em_designation,em_status,
                create_user)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.em_id,
                data.em_no,
                data.em_salutation,
                data.em_name,
                data.em_gender,
                data.em_dob,
                data.em_doj,
                data.em_mobile,
                data.em_email,
                data.em_branch,
                data.em_department,
                data.em_dept_section,
                data.em_designation,
                data.em_status,
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
    updateserialnum: (callBack) => {
        pool.query(
            `update serial_nos set serial_current=serial_current+1 where serial_slno=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    employeeGetAll: (callBack) => {
        pool.query(
            `select co_employee.emp_no,em_name,emp_username,em_designation,em_dept_section,sec_name ,
            em_no,co_employee_master.em_id,em_salutation,em_doj,em_dob,em_gender,em_branch,em_department,
            em_dept_section, em_status ,em_mobile,em_email,module_group_user_rights.mod_grp_slno,
            module_group_user_rights.user_group_slno,module_group_user_rights.mod_grp_user_slno
            from co_employee
             left join co_employee_master on co_employee.em_id=co_employee_master.em_id
             left join co_deptsec_mast on co_employee_master.em_dept_section=co_deptsec_mast.sec_id
             left join module_group_user_rights on module_group_user_rights.emp_slno=co_employee_master.em_id
             group by em_id`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    updateEmployee: (data, callBack) => {

        pool.query(
            `UPDATE co_employee_master
            SET  em_no=?,
            em_salutation=?,
            em_name=?,
            em_gender=?,
            em_dob=?,
            em_doj=?,
            em_mobile=?,
             em_email=?, 
             em_branch=?,
             em_department=?,
             em_dept_section=?,
             em_designation=?,
             em_status=?,
             edit_user=?   
            where em_id=?           
            `, [
            data.em_no,
            data.em_salutation,
            data.em_name,
            data.em_gender,
            data.em_dob,
            data.em_doj,
            data.em_mobile,
            data.em_email,
            data.em_branch,
            data.em_department,
            data.em_dept_section,
            data.em_designation,
            data.em_status,
            data.edit_user,
            data.em_id
        ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateEmployeeCo: (data, callBack) => {

        pool.query(
            `UPDATE co_employee
            SET emp_username=?,
            emp_no=?,
             emp_email=?, 
             emp_password=?,
             emp_status=?             
            where em_id=?
            `, [
            data.emp_username,
            data.emp_no,
            data.em_email,
            data.emp_password,
            data.emp_status,
            data.em_id
        ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results[0]);
            }
        );
    },

    checkEmployeeExist: (data, callBack) => {
        pool.query(
            `SELECT em_no
            FROM co_employee_master 
            WHERE em_no=?`,
            [
                data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    updatemodulegroup: (data, callback) => {
        pool.query(
            `UPDATE module_group_user_rights 
                SET emp_slno = ?,
                deptsec_slno=?,
                dept_slno=?,
                mod_grp_slno=?,
                user_group_slno=?,
                mod_grp_user_status=?
                WHERE mod_grp_user_slno = ?`,
            [
                data.emp_slno,
                data.deptsec_slno,
                data.dept_slno,
                data.mod_grp_slno,
                data.user_group_slno,
                data.mod_grp_user_status,
                data.mod_grp_user_slno
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


const { pool, hrpool } = require('../../config/database')
module.exports = {

    getdepartment: (callback) => {
        hrpool.query(
            `select * from medi_hrm.hrm_department`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    createDept: (data, callBack) => {
        pool.query(
            `INSERT INTO co_department_mast
            (dept_id,
                dept_name,
            dept_alias,
            dept_status,
            create_user,
            edit_user,
            create_date,
            update_date
            )
            VALUES ?`,
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

    getdepartmentMeli: (callback) => {
        pool.query(
            `select * from meliora.co_department_mast`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    getdepartmentSection: (callback) => {
        hrpool.query(
            `select * from medi_hrm.hrm_dept_section`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getdepartmentSecMeli: (callback) => {
        pool.query(
            `select * from meliora.co_deptsec_mast`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    createDeptSec: (data, callBack) => {
        pool.query(
            `INSERT INTO co_deptsec_mast
            (sect_id,
                sec_name,
                dept_id,
                dept_sub_sect,
                sec_status,
                create_user,
                edit_user,
            create_date,
            update_date
            )
            VALUES ?`,
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
    getemployeemasterHrm: (callback) => {
        hrpool.query(
            `select * from medi_hrm.hrm_emp_master`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getemployeemasterMeli: (callback) => {
        pool.query(
            `select * from meliora.co_employee_master`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    creategetemployeemaster: (data, callBack) => {
        pool.query(
            `INSERT INTO co_employee_master
            (em_id,
                em_no,
                em_salutation,
                em_name,
                em_gender,
                em_dob,
                em_doj,
                em_mobile,
                em_email,
                em_branch,
                em_department,
                em_dept_section,
                em_designation,
                em_status,
                create_user,
                edit_user,
                create_date,
                update_date,
                hod,
                incharge            
            )
            VALUES ?`,
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
    getemployeeuserPassHrm: (callback) => {
        hrpool.query(
            `select * from medi_hrm.hrm_employee`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getemployeeuserPassMeli: (callback) => {
        pool.query(
            `select * from meliora.co_employee`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    creategetemployeeuserPass: (data, callBack) => {
        pool.query(
            `INSERT INTO co_employee
            (emp_slno,
                emp_email,
                emp_username,
                emp_password,
                emp_status,
                em_id,
                emp_no,
                emp_created,
                emp_updated,
                create_user,
                edit_user            
            )
            VALUES ?`,
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
}
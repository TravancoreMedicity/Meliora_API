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
            dept_status            
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
            (sec_id,
                sec_name,
                dept_id,
                dept_sub_sect,
                sec_status                
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
                em_status                       
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
            (empdtl_slno,
                emp_email,
                emp_username,
                emp_password,
                emp_status,
                em_id,
                emp_no,
                emp_created,
                emp_updated          
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
    getauthorization: (callback) => {
        hrpool.query(
            `select * from medi_hrm.hrm_authorization_assign`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getauthorizationMeli: (callback) => {
        pool.query(
            `select * from meliora.co_emp_authorization_assign`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    createAuthorization: (data, callBack) => {
        pool.query(
            `INSERT INTO co_emp_authorization_assign
            (auth_slno,
                dept_section,
                auth_post,
                dept_section_post,
                emp_id
                      
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

    updateEmpMaster: (data) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `update meliora.co_employee_master
                    set em_department=?,
                    em_dept_section=?,
                    em_no=?
                    where em_id=? `,
                    [
                        val.em_department,
                        val.em_dept_section,
                        val.em_no,
                        val.em_id
                    ],
                    (error, results, fields) => {


                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
    },


}
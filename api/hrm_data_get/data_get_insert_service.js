const { pool, hrpool } = require('../../config/database')
module.exports = {

    getdepartment: (callback) => {
        hrpool.query(
            `select * from hrm_department`,
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
            `select * from co_department_mast`,
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
            `select * from hrm_dept_section`,
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
            `select * from co_deptsec_mast`,
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
            `select * from hrm_emp_master`,
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
            `select * from co_employee_master`,
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
            `select * from hrm_employee`,
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
            `select * from co_employee`,
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
            (
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
            `select * from hrm_authorization_assign`,
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
            `select * from co_emp_authorization_assign`,
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
                    `update co_employee_master
                    set em_department=?,
                    em_dept_section=?,
                    em_designation=?,
                    em_status=?,
                    em_no=?
                    where em_id=? `,
                    [
                        val.em_department,
                        val.em_dept_section,
                        val.em_designation,
                        val.em_status,
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

    updateDepartment: (data) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `update co_department_mast
                    set dept_status=?,
                    dept_type=?
                    where dept_id=? `,
                    [
                        val.dept_status,
                        val.dept_type,
                        val.dept_id
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

    updateDepartmentSec: (data) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `update co_deptsec_mast
                    set dept_id=?,
                    sec_status=?
                    where sec_id=? `,
                    [
                        val.dept_id,
                        val.sec_status,
                        val.sec_id
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
    getdesignation: (callback) => {
        hrpool.query(
            `select * from designation`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getdesignationMeli: (callback) => {
        pool.query(
            `select * from co_designation`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    createdesignation: (data, callBack) => {
        pool.query(
            `INSERT INTO co_designation
            (desg_slno,
                desg_name,
                desg_status,
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

    getbranch: (callback) => {
        hrpool.query(
            `select * from hrm_branch`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getbranchMeli: (callback) => {
        pool.query(
            `select * from co_designation`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    createbranch: (data, callBack) => {
        pool.query(
            `INSERT INTO co_branch
            (branch_slno,
                branch_name,
                branch_address,
                branch_status                   
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
    getSalutation: (callback) => {
        hrpool.query(
            `select * from hrm_salutation`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getSalutationMeli: (callback) => {
        pool.query(
            `select * from co_salutation`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    createSalutation: (data, callBack) => {
        pool.query(
            `INSERT INTO co_salutation
            (sa_code,
                sal_name,
                sal_gender,
                sal_status                   
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
    emploginUpdate: (data) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `update co_employee
                    set emp_status=?
                    where emp_no=? `,
                    [
                        val.emp_status,
                        val.emp_no
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
    getStaffDetail: (data, callback) => {
        hrpool.query(
            `
        SELECT 
            em_id,
            em_no,
            em_salutation,
            em_name,
            em_gender,
            em_dob,
            em_age_year,
            em_age_month,
            em_age_day,
            em_doj,
            em_mobile,
            em_phone,
            em_email,
            em_branch,
            em_department,
            em_dept_section,
            em_institution_type,
            em_designation,
            em_doc_type,
            em_category,
            em_prob_end_date,
            em_conf_end_date,
            em_retirement_date,
            em_contract_end_date,
            em_status,
            hrm_emp_master.create_user,
            addressPermnt1,
            addressPermnt2, 
            hrm_pin1,
            em_region,
            addressPresent1,
            addressPresent2,
            hrm_pin2, 
            hrm_region2, 
            blood_slno,
            hrm_religion,
            contract_status, dept_name  , sect_name  
            FROM hrm_emp_master
            inner join hrm_department on dept_id=em_department
            inner join hrm_dept_section on sect_id=em_dept_section
            WHERE em_no = ?
            `,
            [
                data.em_no
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
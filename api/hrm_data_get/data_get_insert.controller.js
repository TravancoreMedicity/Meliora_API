const logger = require('../../logger/logger')
const { getdepartment, createDept, getdepartmentMeli, getdepartmentSection, getdepartmentSecMeli,
    createDeptSec, getemployeemasterHrm, getemployeemasterMeli, creategetemployeemaster, creategetemployeeuserPass,
    getemployeeuserPassHrm, getemployeeuserPassMeli, getauthorization, getauthorizationMeli, createAuthorization
} = require("../hrm_data_get/data_get_insert_service")
module.exports = {

    getdepartment: (req, res) => {
        getdepartment((err, results) => {
            const deprtment = [...results]
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            getdepartmentMeli((err, results) => {
                const melidepartment = [...results]
                if (err) {
                    logger.logwindow(err)
                    return res.status(200).json({
                        success: 2,
                        message: err
                    });
                }
                let newmeli = deprtment.filter(value => {
                    return !melidepartment.find(values => {
                        return values.dept_id === value.dept_id
                    })
                })
                var a1 = newmeli.map((value, index) => {
                    return [value.dept_id, value.dept_name, value.dept_alias, value.dept_status, value.create_user,
                    value.edit_user, value.create_date, value.update_date
                    ]
                })
                createDept(a1, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Department Inserted Successfully"
                    });
                });
            })
        });
    },

    getdepartmentSection: (req, res) => {
        getdepartmentSection((err, results) => {
            const deprtmentSec = [...results]
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            getdepartmentSecMeli((err, results) => {
                const melidepartmentSec = [...results]
                if (err) {
                    logger.logwindow(err)
                    return res.status(200).json({
                        success: 2,
                        message: err
                    });
                }

                let newmeli = deprtmentSec.filter(value => {
                    return !melidepartmentSec.find(values => {
                        return values.sec_id === value.sect_id
                    })
                })
                var a1 = newmeli.map((value, index) => {
                    return [value.sect_id, value.sect_name, value.dept_id, value.dept_sub_sect, value.sect_status,
                    value.create_user,
                    value.edit_user, value.create_date, value.update_date
                    ]
                })
                createDeptSec(a1, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Department Section Inserted Successfully"
                    });
                });
            })
        });
    },
    getemployeemaster: (req, res) => {
        getemployeemasterHrm((err, results) => {
            const employeeHr = [...results]
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            getemployeemasterMeli((err, results) => {
                const meliemployee = [...results]
                if (err) {
                    logger.logwindow(err)
                    return res.status(200).json({
                        success: 2,
                        message: err
                    });
                }
                let newmeli = employeeHr.filter(value => {
                    return !meliemployee.find(values => {
                        return values.em_id === value.em_id
                    })
                })
                var a1 = newmeli.map((value, index) => {
                    return [value.em_id, value.em_no, value.em_salutation, value.em_name,
                    value.em_gender, value.em_dob, value.em_doj, value.em_mobile,
                    value.em_email, value.em_branch, value.em_department, value.em_dept_section,
                    value.em_designation, value.em_status, value.create_user, value.edit_user,
                    value.create_date, value.update_date, value.hod, value.incharge
                    ]
                })
                creategetemployeemaster(a1, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Employee Master Inserted Successfully"
                    });
                });
            })
        });
    },
    getemployeeuserPass: (req, res) => {
        getemployeeuserPassHrm((err, results) => {
            const emploeeHruserPass = [...results]
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            getemployeeuserPassMeli((err, results) => {
                const meliemployeeUserPass = [...results]
                if (err) {
                    logger.logwindow(err)
                    return res.status(200).json({
                        success: 2,
                        message: err
                    });
                }
                let newmeli = emploeeHruserPass.filter(value => {
                    return !meliemployeeUserPass.find(values => {
                        return values.emp_no === value.emp_no
                    })
                })
                var a1 = newmeli.map((value, index) => {
                    return [value.emp_slno, value.emp_email, value.emp_username, value.emp_password,
                    value.emp_status, value.emp_id, value.emp_no, value.emp_created, value.emp_updated,
                    value.emp_create_user, value.emp_edit,
                    ]
                })
                creategetemployeeuserPass(a1, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Employee Inserted Successfully"
                    });
                });
            })
        });
    },

    getauthorization: (req, res) => {
        getauthorization((err, results) => {
            const authorization = [...results]
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            getauthorizationMeli((err, results) => {
                const meliauthorization = [...results]
                if (err) {
                    logger.logwindow(err)
                    return res.status(200).json({
                        success: 2,
                        message: err
                    });
                }
                let newmeli = authorization.filter(value => {
                    return !meliauthorization.find(values => {
                        return values.auth_slno === value.auth_slno
                    })
                })
                var a1 = newmeli.map((value, index) => {
                    return [value.auth_slno, value.dept_section, value.auth_post, value.dept_section_post,
                    value.create_user, value.create_user, value.create_date
                    ]
                })
                createAuthorization(a1, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Authorization Inserted Successfully"
                    });
                });
            })
        });
    },
}
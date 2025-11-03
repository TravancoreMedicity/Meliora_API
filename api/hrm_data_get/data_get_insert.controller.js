const logger = require('../../logger/logger')
const { getdepartment, createDept, getdepartmentMeli, getdepartmentSection, getdepartmentSecMeli,
    createDeptSec, getemployeemasterHrm, getemployeemasterMeli, creategetemployeemaster, creategetemployeeuserPass,
    getemployeeuserPassHrm, getemployeeuserPassMeli, getauthorization, getauthorizationMeli, createAuthorization,
    updateEmpMaster, updateDepartment, updateDepartmentSec, getdesignation, getdesignationMeli,
    createdesignation, getbranch, getbranchMeli, createbranch, getSalutation, getSalutationMeli,
    createSalutation, emploginUpdate,
    getStaffDetail
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
                    return [value.dept_id, value.dept_name, value.dept_alias, value.dept_status
                    ]
                })

                if (a1.length !== 0) {
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
                } else {
                    return res.status(200).json({
                        success: 2,
                        message: "Noting to insert, already uptodate"
                    });
                }

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
                    return [value.sect_id, value.sect_name, value.dept_id, value.dept_sub_sect,
                    value.sect_status
                    ]
                })
                if (a1.length !== 0) {
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
                } else {
                    return res.status(200).json({
                        success: 2,
                        message: "Noting to insert, already uptodate"
                    });
                }

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
                    value.em_designation, value.em_status
                    ]
                })
                if (a1.length !== 0) {
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
                } else {
                    return res.status(200).json({
                        success: 2,
                        message: "Noting to insert, already uptodate"
                    });
                }


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
                    value.emp_status, value.emp_id, value.emp_no, value.emp_created, value.emp_update
                    ]
                })
                if (a1.length !== 0) {
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
                } else {
                    return res.status(200).json({
                        success: 2,
                        message: "Noting to insert, already uptodate"
                    });
                }


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
                    value.emp_id
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

    empMasterUpdate: (req, res) => {
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
                        return values.em_id === value.em_id &&
                            values.em_department === value.em_department &&
                            values.em_dept_section === value.em_dept_section &&
                            values.em_no === value.em_no &&
                            values.em_designation === value.em_designation &&
                            values.em_status === value.em_status
                    })
                })

                const result = updateEmpMaster(newmeli)
                    .then((r) => {

                        return res.status(200).json({
                            success: 1,
                            message: "Update Successfully"
                        });
                    }).catch((e) => {
                        return res.status(200).json({
                            success: 0,
                            message: e.sqlMessage
                        });
                    })
            })
        });
    },

    departmentUpdate: (req, res) => {
        getdepartment((err, results) => {
            const employeeHr = [...results]
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            getdepartmentMeli((err, results) => {
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
                        return values.dept_id === value.dept_id &&
                            values.dept_type === value.dept_type &&
                            values.dept_status === value.dept_status
                    })
                })
                var a1 = newmeli.map((value, index) => {
                    return [value.dept_status, value.dept_type, value.dept_id]
                })
                const result = updateDepartment(a1)
                    .then((r) => {

                        return res.status(200).json({
                            success: 1,
                            message: "Update Successfully"
                        });
                    }).catch((e) => {
                        return res.status(200).json({
                            success: 0,
                            message: e.sqlMessage
                        });
                    })
            })
        });
    },

    departmentSecUpdate: (req, res) => {
        getdepartmentSection((err, results) => {
            const employeeHr = [...results]
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            getdepartmentSecMeli((err, results) => {
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
                        return values.sect_id === value.sec_id &&
                            values.dept_id === value.dept_id &&
                            values.sect_status === value.sec_status
                    })
                })

                const result = updateDepartmentSec(newmeli)
                    .then((r) => {

                        return res.status(200).json({
                            success: 1,
                            message: "Update Successfully"
                        });
                    }).catch((e) => {
                        return res.status(200).json({
                            success: 0,
                            message: e.sqlMessage
                        });
                    })
            })
        });
    },


    getdesignation: (req, res) => {
        getdesignation((err, results) => {
            const designation = [...results]
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            getdesignationMeli((err, results) => {
                const melidesignation = [...results]
                if (err) {
                    logger.logwindow(err)
                    return res.status(200).json({
                        success: 2,
                        message: err
                    });
                }
                let newmeli = designation.filter(value => {
                    return !melidesignation.find(values => {
                        return values.desg_slno === value.desg_slno
                    })
                })
                var a1 = newmeli.map((value, index) => {
                    return [value.desg_slno, value.desg_name, value.desg_status, value.create_user,
                    value.edit_user
                    ]
                })
                if (a1.length !== 0) {
                    createdesignation(a1, (err, results) => {
                        if (err) {
                            logger.logwindow(err)
                            return res.status(200).json({
                                success: 0,
                                message: err
                            });
                        }
                        return res.status(200).json({
                            success: 1,
                            message: "Designation Inserted Successfully"
                        });
                    });
                } else {
                    return res.status(200).json({
                        success: 2,
                        message: "Noting to insert, already uptodate"
                    });
                }


            })
        });
    },
    getbranch: (req, res) => {
        getbranch((err, results) => {
            const branch = [...results]
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            getbranchMeli((err, results) => {
                const melibranch = [...results]
                if (err) {
                    logger.logwindow(err)
                    return res.status(200).json({
                        success: 2,
                        message: err
                    });
                }
                let newmeli = branch.filter(value => {
                    return !melibranch.find(values => {
                        return values.branch_slno === value.branch_slno
                    })
                })
                var a1 = newmeli.map((value, index) => {
                    return [value.branch_slno, value.branch_name, value.branch_address, value.branch_status
                    ]
                })
                createbranch(a1, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Branch Inserted Successfully"
                    });
                });
            })
        });
    },

    getSalutation: (req, res) => {
        getSalutation((err, results) => {
            const salutation = [...results]
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            getSalutationMeli((err, results) => {
                const meliSalutation = [...results]
                if (err) {
                    logger.logwindow(err)
                    return res.status(200).json({
                        success: 2,
                        message: err
                    });
                }
                let newmeli = salutation.filter(value => {
                    return !meliSalutation.find(values => {
                        return values.sa_code === value.sa_code
                    })
                })
                var a1 = newmeli.map((value, index) => {
                    return [value.sa_code, value.sal_name, value.sal_gender, value.sal_status
                    ]
                })
                createSalutation(a1, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Salutation Inserted Successfully"
                    });
                });
            })
        });
    },

    emploginUpdate: (req, res) => {
        getemployeeuserPassHrm((err, results) => {
            const employeeHr = [...results]
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            getemployeeuserPassMeli((err, results) => {
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
                        return values.emp_status === value.emp_status &&
                            values.emp_no === value.emp_no
                    })
                })

                const result = emploginUpdate(newmeli)
                    .then((r) => {

                        return res.status(200).json({
                            success: 1,
                            message: "Update Successfully"
                        });
                    }).catch((e) => {
                        return res.status(200).json({
                            success: 0,
                            message: e.sqlMessage
                        });
                    })
            })
        });
    },


    getStaffDetail: (req, res) => {
        const data = req.body;
        getStaffDetail(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No staff record Found",
                    data: [],
                })
            }

            return res.status(200).json({
                success: 2,
                message: "Fetched Sucessfully",
                data: results,
            })
        });
    },

}
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { employeeinsert, employeeupdate, getemplpyee, employeeGetById, checkUpdateVal, checkInsertVal, employeedelete,
    getEmployeeByUserName, empInsert, updateserialnum, employeeGetAll, updateEmployee, updateEmployeeCo,
    checkEmployeeExist, employeemoduleGroup, updatemodulegroup, updateserialnumempDetl
} = require('../employee/employee.service');
const { validateuserCreation, validateEmployee } = require('../../validation/validation_schema')
const logger = require('../../logger/logger');
const { addHours, format } = require("date-fns");

module.exports = {
    employeeinsert: (req, res) => {
        const body = req.body;

        //Validate requested body data
        const body_data = validateEmployee.validate(body);

        const salt = genSaltSync(10);
        let new_password = body.emp_password;
        body.emp_password = hashSync(new_password, salt);
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                // Insert the values
                employeeinsert(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err.message)
                        return res.status(400).json({
                            success: 0,
                            message: err.message
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: results
                    });
                })
            } else {
                return res.status(200).json({
                    success: 7,
                    message: "Username Already Exist"
                })
            }
        })
    },
    employeeupdate: (req, res) => {

        const body = req.body;
        //Validate requested body data
        const body_data = validateEmployee.validate(body);
        if (body_data.error) {
            res.status(400).send(body_data.error.details[0].message);
            return;
        }
        const salt = genSaltSync(10);
        let new_password = body.emp_password;
        body.emp_password = hashSync(new_password, salt);
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                employeeupdate(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(500).json({
                            success: 0,
                            message: err
                        });
                    }
                    if (!results) {
                        logger.infologwindow("Failed to Update")
                        return res.json({
                            success: 0,
                            message: "Failed to Update"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Updated Successfully"
                    });
                });
            } else {
                return res.status(200).json({
                    success: 7,
                    message: "Username Already Exist"
                })
            }
        })
    },
    getemplpyee: (req, res) => {
        getemplpyee((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    employeeGetById: (req, res) => {
        const id = req.params.id;
        employeeGetById(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Record Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    employeedelete: (req, res) => {
        const body = req.body;
        employeedelete(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: res.err
                });
            }
            if (!results) {
                logger.infologwindow("Record Not Found")
                return res.status(400).json({
                    success: 1,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Record Deleted Successfully"
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getEmployeeByUserName(body.emp_username, (err, results) => {
            const logout_time = 1
            if (err) {
            }
            if (!results) {
                logger.infologwindow("Invalid user Name  or password")
                return res.json({
                    success: 0,
                    data: "Invalid user Name  or password"
                });
            }
            const get_password = body.emp_password.toString();
            const result = compareSync(get_password, results.emp_password);
            if (result) {
                results.emp_password = undefined;
                const jsontoken = sign({ result: results }, "@dhj$&$(*)dndkm76$%#jdn(^$6GH%^#73*#*", {
                    expiresIn: "5h"
                });

                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken,
                    user: results.emp_username,
                    emp_no: results.emp_no,
                    emp_id: results.em_id,
                    emp_name: results.em_name,
                    emp_sec: results.sec_name,
                    emp_secid: results.em_dept_section,
                    app_token: results.app_token,
                    emp_dept: results.em_department,
                    logintime: results.login,
                    logOutTime: format(addHours(new Date(results.login), logout_time), 'yyyy-MM-dd HH:mm:ss')

                });
            } else {
                return res.json({
                    success: 0,
                    message: "error"
                });
            }
        });
    },



    empInsert: (req, res) => {
        const body = req.body;
        const body_result = validateuserCreation.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        // body.doctype_desc = body_result.value.doctype_desc;

        checkEmployeeExist(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                // Insert the values
                empInsert(body, (err, results) => {
                    if (err) {
                        // logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    const salt = genSaltSync(10);
                    let new_password = body.emp_password;
                    body.emp_password = hashSync(new_password, salt);

                    employeeinsert(body, (err, results) => {
                        if (err) {
                            logger.logwindow(err.message)
                            return res.status(400).json({
                                success: 0,
                                message: err.message
                            });
                        }
                        employeemoduleGroup(body, (err, results) => {
                            if (err) {
                                logger.logwindow(err.message)
                                return res.status(400).json({
                                    success: 0,
                                    message: err.message
                                });
                            }


                            updateserialnum((err, results) => {
                                if (err) {
                                    //logger.errorLogger(err)
                                    return res.status(400).json({
                                        success: 0,
                                        message: res.err
                                    });
                                }

                                if (!results) {
                                    return res.status(400).json({
                                        success: 1,
                                        message: "Record Not Found"
                                    });
                                }
                                updateserialnumempDetl((err, results) => {
                                    if (err) {
                                        //logger.errorLogger(err)
                                        return res.status(400).json({
                                            success: 0,
                                            message: res.err
                                        });
                                    }

                                    if (!results) {
                                        return res.status(400).json({
                                            success: 1,
                                            message: "Record Not Found"
                                        });
                                    }

                                    return res.status(200).json({
                                        success: 1,
                                        message: "Data Created Successfully"
                                    });
                                });

                            });

                        })



                    })
                });
            } else {
                return res.status(200).json({
                    success: 7,
                    message: "Employee Number Already Exist"
                })
            }
        })
    },
    employeeGetAll: (req, res) => {
        employeeGetAll((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
                return res.status(400).json({
                    success: 3,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateEmployee: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        let new_password = body.emp_password;
        body.emp_password = hashSync(new_password, salt);
        updateEmployee(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: res.err
                });
            }
            if (!results) {
                logger.infologwindow("Record Not Found")
                return res.status(200).json({
                    success: 6,
                    message: "Record Not Found"
                });
            }

            updateEmployeeCo(body, (err, results) => {
                if (err) {
                    logger.logwindow(err)
                    return res.status(400).json({
                        success: 7,
                        message: res.err
                    });
                }
                updatemodulegroup(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(400).json({
                            success: 7,
                            message: res.err
                        });
                    }

                    return res.status(200).json({
                        success: 2,
                        message: "Updated Successfully"
                    });
                })
            })


        });
    },




}
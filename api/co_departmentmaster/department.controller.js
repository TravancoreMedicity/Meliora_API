const { createDept, updateDept, checkInsertVal, checkUpdateVal,
    checkDeptalias, checkUpdateAlias, deleteDept, getDept, getDeptById, getDeptStatus } = require('../co_departmentmaster/department.service');
const { validateDepartment } = require('../../validation/validation_schema')
const logger = require('../../logger/logger')

module.exports = {
    createDept: (req, res) => {
        const body = req.body;
        //validate department Instert function
        const body_result = validateDepartment.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.dept_name = body_result.value.dept_name;
        body.dept_alias = body_result.value.dept_alias;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                checkDeptalias(body, (err, results) => {
                    const value = JSON.parse(JSON.stringify(results))
                    if (Object.keys(value).length === 0) {
                        // Insert the values
                        createDept(body, (err, results) => {
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
                        logger.infologwindow("Department Alias Already Exist")
                        return res.status(200).json({
                            success: 6,
                            message: "Department Alias Already Exist"
                        })
                    }
                })
            } else {
                logger.infologwindow("Department Name Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Department Name Already Exist"
                })
            }
        })
    },
    updateDept: (req, res) => {
        const body = req.body;
        const body_result = validateDepartment.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }
        body.dept_name = body_result.value.dept_name;
        body.dept_alias = body_result.value.dept_alias;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                const value = JSON.parse(JSON.stringify(results))
                if (Object.keys(value).length === 0) {
                    updateDept(body, (err, results) => {
                        if (err) {
                            logger.logwindow(err)
                            return res.status(200).json({
                                success: 0,
                                message: err
                            });
                        }
                        if (!results) {
                            logger.infologwindow("Department Not Found")
                            return res.status(200).json({
                                success: 1,
                                message: "Department Not Found"
                            });
                        }
                        return res.status(200).json({
                            success: 2,
                            message: "Departement Updated Successfully"
                        });
                    });
                } else {
                    logger.infologwindow("Department Alias Already Exist")
                    return res.status(200).json({
                        success: 6,
                        message: "Department Alias Already Exist"
                    })
                }
            }
            else {
                logger.infologwindow("Department Name Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Department Name Already Exist"
                })
            }
        })
    },
    deleteDept: (req, res) => {
        const body = req.body;
        deleteDept(body, (err, results) => {
            if (err) {
                logger.logwindow(res.err)
                return res.status(400).json({
                    success: 0,
                    message: res.err
                });
            }
            if (!results) {
                logger.infologwindow("Department Not Found")
                return res.status(400).json({
                    success: 1,
                    message: "Department Not Found"
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Department Deleted Successfully"
            });
        });
    },
    getDept: (req, res) => {
        getDept((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
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
    getDeptById: (req, res) => {
        const body = req.body
        getDeptById(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Records Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Records Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getDeptStatus: (req, res) => {
        getDeptStatus((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
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
}
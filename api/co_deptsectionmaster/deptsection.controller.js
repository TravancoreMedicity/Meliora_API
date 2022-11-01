const { createDept, updateDept, checkInsertVal, checkUpdateVal, deleteDept, getDept, getDeptById,
    getDeptsectionStatus, getSelectedSectionByDept, getOutlet } = require('../co_deptsectionmaster/deptsection.service');
const { validateDeptSec } = require('../../validation/validation_schema')
const logger = require('../../logger/logger')

module.exports = {
    createDept: (req, res) => {
        const body = req.body;
        //validate department Instert function
        const body_result = validateDeptSec.validate(body);
        if (body_result.error) {
            // logger.logwindow(body_result.error.details[0].message)
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.sec_name = body_result.value.sec_name;
        checkInsertVal(body, (err, results) => {
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
                        message: "Department Section Inserted Successfully"
                    });
                });
            } else {
                logger.infologwindow("Department Section  Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Department Section  Already Exist"
                })
            }
        })
    },
    updateDept: (req, res) => {
        const body = req.body;
        const body_result = validateDeptSec.validate(body);
        body.sec_name = body_result.value.sec_name;
        if (body_result.error) {
            logger.logwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }
        checkUpdateVal(body, (err, results) => {
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
                        logger.infologwindow("Record Not Found")
                        return res.status(200).json({
                            success: 1,
                            message: "Record Not Found"
                        });
                    }

                    return res.status(200).json({
                        success: 2,
                        message: "Departmentsection Updated Successfully"
                    });

                });
            } else {
                logger.infologwindow("Departmentsection  Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Departmentsection Already Exist"
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
                logger.infologwindow("Record Not Found")
                return res.status(400).json({
                    success: 1,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Departmentsection Deleted Successfully"
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
            if (results.length == 0) {
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
    getDeptsectionStatus: (req, res) => {
        getDeptsectionStatus((err, results) => {
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
    getSelectedDeptSection: (req, res) => {
        const id = req.params.id;
        getSelectedSectionByDept(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Department Section under this Department"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    getOutlet: (req, res) => {
        getOutlet((err, results) => {
            console.log(results);
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
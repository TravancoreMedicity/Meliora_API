const { complaintDeptInsert, complaintDeptUpdate, checkInsertVal, checkUpdateVal, getcomplaintDept,
    getcomplaintDeptById, deletecomplaintDept, getComplaintDeptStatus } = require('../cm_complaintdepartment/complaintdept.service');
const { validateComplaintDept } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');

module.exports = {
    complaintDeptInsert: (req, res) => {
        const body = req.body;
        //validate complaintdept Insert function
        const body_result = validateComplaintDept.validate(body);
        if (body_result.error) {
            // logger.logwindow(body_result.error.details[0].message);
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        //let body.complaint_dept_name=body_result
        body.complaint_dept_name = body_result.value.complaint_dept_name;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                complaintDeptInsert(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Complaint Department Inserted Successfully"
                    });
                });
            } else {
                logger.infologwindow("Complaint Department Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Complaint Department Already Exist"
                })
            }
        })
    },
    getcomplaintDeptById: (req, res) => {
        const body = req.body;
        getcomplaintDeptById(body, (err, results) => {
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
    complaintDeptUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateComplaintDept.validate(body);
        if (body_result.error) {
            logger.logwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }
        body.complaint_dept_name = body_result.value.complaint_dept_name;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                complaintDeptUpdate(body, (err, results) => {
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
                        message: "Complaint Department Updated Successfully"
                    });
                });
            } else {
                logger.infologwindow("Complaint Department Name Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Complaint Department Name Already Exist"
                })
            }
        })
    },
    getcomplaintDept: (req, res) => {
        getcomplaintDept((err, results) => {
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
    getComplaintDeptStatus: (req, res) => {
        getComplaintDeptStatus((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Results Found "
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },








    deletecomplaintDept: (req, res) => {
        const body = req.body;
        deletecomplaintDept(body, (err, results) => {
            if (err) {
                logger.logwindow(res.err)
                return res.status(400).json({
                    success: 0,
                    message: res.err
                });
            }
            if (!results) {
                logger.infologwindow("Complaintdepartment Not Found")
                return res.status(400).json({
                    success: 1,
                    message: "Complaintdepartment Not Found"
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Complaintdepartment Deleted Successfully"
            });
        });
    }
}


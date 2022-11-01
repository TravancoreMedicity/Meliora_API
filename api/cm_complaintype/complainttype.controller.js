const { complaintTypeInsert, checkInsertVal, checkUpdateVal, complaintTypeUpdate, getcomplaintType,
    getcomplaintTypeById, deletecomplaintType, getcomplaintTypeStatus, complaintTypeById } = require('../cm_complaintype/complainttype.service');
const { validateComplaintType } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    complaintTypeInsert: (req, res) => {
        const body = req.body;
        //validate complainttype Insert function
        const body_result = validateComplaintType.validate(body);
        if (body_result.error) {
            // logger.logwindow(body_result.error.details[0].message)
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        //let   body.complaint_type_name=body_result
        body.complaint_type_name = body_result.value.complaint_type_name;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                complaintTypeInsert(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Complaint Type Inserted Successfully"
                    });
                });
            } else {
                logger.infologwindow("Complaint Type Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Complaint Type Already Exist"
                })
            }
        })
    },
    getcomplaintTypeById: (req, res) => {
        const body = req.body
        getcomplaintTypeById(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
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
    complaintTypeUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateComplaintType.validate(body);
        if (body_result.error) {
            // logger.logwindow(body_result.error.details[0].message)
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }
        body.complaint_type_name = body_result.value.complaint_type_name;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                complaintTypeUpdate(body, (err, results) => {
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
                        message: "Complaint Type Updated Successfully"
                    });
                });
            } else {
                logger.infologwindow("Complaint Type Name Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Complaint Type Name Already Exist"
                })
            }
        })
    },
    getcomplaintType: (req, res) => {
        getcomplaintType((err, results) => {
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
    deletecomplaintType: (req, res) => {
        const body = req.body;
        deletecomplaintType(body, (err, results) => {
            if (err) {
                logger.logwindow(res.err)
                return res.status(400).json({
                    success: 0,
                    message: res.err
                });
            }
            if (!results) {
                logger.infologwindow("Complainttype Not Found")
                return res.status(400).json({
                    success: 1,
                    message: "Complainttype Not Found"
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Complainttype Deleted Successfully"
            });
        });
    },
    getcomplaintTypeStatus: (req, res) => {
        getcomplaintTypeStatus((err, results) => {
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
    complaintTypeById: (req, res) => {
        const id = req.params.id;
        complaintTypeById(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
}


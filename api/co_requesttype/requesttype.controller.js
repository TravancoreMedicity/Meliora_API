const { requestTypeInsert, checkInsertVal, checkUpdateVal, getRequestType, getRequestTypeById, requestTypeUpdate,
    deleteRequestType, getRequestTypeStatus } = require('../co_requesttype/requesttype.service');
const { validateRequestType } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    requestTypeInsert: (req, res) => {
        const body = req.body;
        //validate requesttype insertion function
        const body_result = validateRequestType.validate(body);
        if (body_result.error) {
            // logger.logwindow(body_result.error.details[0].message)
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        //let body.req_type_name=body_result
        body.req_type_name = body_result.value.req_type_name;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                requestTypeInsert(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Request Type Inserted Successfully"
                    });
                });
            } else {
                logger.infologwindow("Request Type Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Request Type Already Exist"
                })
            }
        })
    },

    getRequestType: (req, res) => {
        getRequestType((err, results) => {
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


    getRequestTypeById: (req, res) => {
        const body = req.body
        getRequestTypeById(body, (err, results) => {
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
    requestTypeUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateRequestType.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }
        body.req_type_name = body_result.value.req_type_name;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                requestTypeUpdate(body, (err, results) => {
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
                        message: "Request Type Updated Successfully"
                    });
                });
            } else {
                logger.infologwindow("Request Type  Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Request Type  Already Exist"
                })
            }
        })
    },


    getRequestTypeStatus: (req, res) => {
        getRequestTypeStatus((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length == 0) {
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













    deleteRequestType: (req, res) => {
        const body = req.body;
        deleteRequestType(body, (err, results) => {
            if (err) {
                logger.logwindow(res.err)
                return res.status(400).json({
                    success: 0,
                    message: res.err
                });
            }
            if (!results) {
                logger.infologwindow("Request Type Not Found")
                return res.status(400).json({
                    success: 1,
                    message: "Request Type  Not Found"
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Request Type Successfully Deleted"
            });
        });
    }
}
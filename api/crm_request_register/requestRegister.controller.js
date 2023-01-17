const { requestRegistInsert, requestRegistInsertDetl, getReqByDeptBase, getItemListByReqno,
    requestRegistUpdate, requestRegistDetlUpdate, getAuthorization } = require('../crm_request_register/requestRegister.service');
const { validateRequestRegister, validateRequestRegisterDetl, validateUserGroup } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');

module.exports = {
    requestRegistInsert: (req, res) => {
        const body = req.body;
        //validate diet master insertion function
        const body_result = validateRequestRegister.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        requestRegistInsert(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Request Registred Successfully",
                insetid: results.insertId
            });
        });
    },

    requestRegistInsertDetl: (req, res) => {
        const body = req.body;
        //validate  insertion function
        // const body_result = validateRequestRegisterDetl.validate(body);
        // if (body_result.error) {
        //     logger.warnlogwindow(body_result.error.details[0].message)
        //     return res.status(200).json({
        //         success: 2,
        //         message: body_result.error.details[0].message
        //     });
        // }
        var a1 = body.map((value, index) => {
            return [value.req_slno, value.item_slno, value.item_desc, value.item_brand, value.item_unit,
            value.item_qnty, value.item_specification, value.aprox_cost, value.item_status,
            value.create_user

            ]
        })
        requestRegistInsertDetl(a1, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Request Registred Successfully",
            });
        });
    },
    getReqByDeptBase: (req, res) => {
        const id = req.params.id
        getReqByDeptBase(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
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
    getItemListByReqno: (req, res) => {
        const id = req.params.id
        getItemListByReqno(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
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
    requestRegistUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateRequestRegister.validate(body);
        if (body_result.error) {
            logger.logwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }
        requestRegistUpdate(body, (err, results) => {
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
                message: "Request Register Updated Successfully"
            });
        });
    },
    requestRegistDetlUpdate: (req, res) => {
        const body = req.body;
        // const body_result = validateComplaintRegist.validate(body);
        // if (body_result.error) {
        //     logger.logwindow(body_result.error.details[0].message)
        //     return res.status(200).json({
        //         success: 3,
        //         message: body_result.error.details[0].message
        //     });
        // }
        requestRegistDetlUpdate(body, (err, results) => {
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
    },

    getAuthorization: (req, res) => {
        const id = req.params.id
        getAuthorization(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
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


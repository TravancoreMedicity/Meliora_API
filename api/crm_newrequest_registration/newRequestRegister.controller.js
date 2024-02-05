const { requestRegistInsert, requestRegistInsertDetl, requestApprovalInsert, InHodExist, getAllReqBasedDept
} = require('../crm_newrequest_registration/newRequestRegister.service');
const { validateCRMRequestRegister } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');

module.exports = {
    requestRegistInsert: (req, res) => {
        const body = req.body;

        //validate diet master insertion function
        const body_result = validateCRMRequestRegister.validate(body);
        if (body_result.error) {
            //  logger.warnlogwindow(body_result.error.details[0].message)
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
                insertid: results.insertId
            });
        });
    },

    requestRegistInsertDetl: (req, res) => {
        const body = req.body;
        var a1 = body.map((value, index) => {
            return [value.req_slno, value.item_slno, value.item_desc, value.item_brand, value.item_unit,
            value.item_qnty, value.item_specification, value.item_unit_price, value.aprox_cost,
            value.item_status, value.create_user
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

    requestApprovalInsert: (req, res) => {
        const body = req.body;
        requestApprovalInsert(body, (err, results) => {
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

    InHodExist: (req, res) => {
        const id = req.params.id;
        InHodExist(id, (err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }
            if (results.length == 0) {
                // logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No data"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },

    getAllReqBasedDept: (req, res) => {
        const id = req.params.id
        getAllReqBasedDept(id, (err, results) => {
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


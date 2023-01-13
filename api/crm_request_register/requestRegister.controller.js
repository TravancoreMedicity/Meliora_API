const { requestRegistInsert, requestRegistInsertDetl } = require('../crm_request_register/requestRegister.service');
const { validateRequestRegister, validateRequestRegisterDetl } = require('../../validation/validation_schema');
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
        // console.log(body);
        //validate diet master insertion function
        // const body_result = validateRequestRegisterDetl.validate(body);
        // if (body_result.error) {
        //     logger.warnlogwindow(body_result.error.details[0].message)
        //     return res.status(200).json({
        //         success: 2,
        //         message: body_result.error.details[0].message
        //     });
        // }
        var a1 = body.map((value, index) => {
            return [value.req_slno, value.item_slno, value.item_desc, value.item_unit,
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

}


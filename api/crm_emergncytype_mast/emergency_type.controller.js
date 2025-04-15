const { validateEmergncyType } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');
const { EmergncyTypeInsert, EmergncyTypeView, EmergncyTypeUpdate, CrmEmerListSelect
} = require('../crm_emergncytype_mast/emergncy_type.service')
module.exports = {
    EmergncyTypeInsert: (req, res) => {
        const body = req.body;
        //validate model Instert function
        const body_result = validateEmergncyType.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.emer_type_name = body_result.value.emer_type_name;
        EmergncyTypeInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Emergency Type inserted successfully"
            })
        })
    },
    EmergncyTypeView: (req, res) => {
        EmergncyTypeView((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })

        })
    },
    EmergncyTypeUpdate: (req, res) => {
        const body = req.body;
        //validate model update function
        const body_result = validateEmergncyType.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 7,
                message: body_result.error.details[0].message
            });
        }
        body.emer_type_name = body_result.value.emer_type_name;
        EmergncyTypeUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Emergency Type Updated successfully"
            })
        })
    },

    CrmEmerListSelect: (req, res) => {

        CrmEmerListSelect((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })

        })
    },
}
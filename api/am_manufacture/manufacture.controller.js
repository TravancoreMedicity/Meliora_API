const { validateManufactureCreate } = require('../../validation/validation_schema');
const { ManufactureInsert, ManufactureView, ManufactureUpdate } = require('../am_manufacture/manufacture.services')
module.exports = {
    ManufactureInsert: (req, res) => {
        const body = req.body;
        //validate manufacture Instert function
        const body_result = validateManufactureCreate.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.manufacture_name = body_result.value.manufacture_name;
        ManufactureInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Manufacture inserted successfully"
            })
        })
    },
    ManufactureView: (req, res) => {

        ManufactureView((err, results) => {
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
    ManufactureUpdate: (req, res) => {
        const body = req.body;
        //validate manufacture Instert function
        const body_result = validateManufactureCreate.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.manufacture_name = body_result.value.manufacture_name;
        ManufactureUpdate(body, (err, results) => {
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
                message: "Manufacture data Updated successfully"
            })
        })
    },
}

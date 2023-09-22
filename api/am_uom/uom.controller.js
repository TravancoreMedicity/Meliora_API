const { validateUOMCreate } = require('../../validation/validation_schema');
const { UomInsert, Uomview, UomUpdate } = require('../am_uom/uom.services')
module.exports = {
    UomInsert: (req, res) => {
        const body = req.body;
        //validate uom Instert function
        const body_result = validateUOMCreate.validate(body);
        if (body_result.error) {

            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.uom_name = body_result.value.uom_name;
        UomInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Unit of Measurement inserted successfully"
            })
        })
    },
    Uomview: (req, res) => {

        Uomview((err, results) => {
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
    UomUpdate: (req, res) => {
        const body = req.body;
        //validate uom Instert function
        const body_result = validateUOMCreate.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.uom_name = body_result.value.uom_name;
        UomUpdate(body, (err, results) => {
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
                message: "Unit of Measurement successfully"
            })
        })
    },
}
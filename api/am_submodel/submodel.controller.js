const { validateSubModelCreate } = require('../../validation/validation_schema');
const { SubmodelInsert, Submodelview, SubmodelUpdate } = require('../am_submodel/submodel.services')
module.exports = {
    SubmodelInsert: (req, res) => {
        const body = req.body;
        //validate model Instert function
        const body_result = validateSubModelCreate.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.submodel_name = body_result.value.submodel_name;
        SubmodelInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                insertid: result.insertId,
                message: "Submodel inserted successfully"
            })
        })
    },
    Submodelview: (req, res) => {

        Submodelview((err, results) => {
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
    SubmodelUpdate: (req, res) => {
        const body = req.body;
        //validate model Instert function
        const body_result = validateSubModelCreate.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.submodel_name = body_result.value.submodel_name;
        SubmodelUpdate(body, (err, results) => {
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
                message: "Submodel data Updated successfully"
            })
        })
    },
}
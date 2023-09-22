const { validateModelCreate } = require('../../validation/validation_schema');
const { ModelInsert, ModelView, ModelUpdate } = require('../am_model/model.services')
module.exports = {
    ModelInsert: (req, res) => {
        const body = req.body;
        //validate model Instert function
        const body_result = validateModelCreate.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.model_name = body_result.value.model_name;
        ModelInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                insertid: result.insertId,
                message: "Model inserted successfully"
            })
        })
    },
    ModelView: (req, res) => {

        ModelView((err, results) => {
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
    ModelUpdate: (req, res) => {
        const body = req.body;
        //validate model update function
        const body_result = validateModelCreate.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.model_name = body_result.value.model_name;
        ModelUpdate(body, (err, results) => {
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
                message: "Model Updated successfully"
            })
        })
    },
}
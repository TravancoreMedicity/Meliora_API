
const logger = require('../../logger/logger');
const { validateQiEquipment } = require('../../validation/validation_schema');
const { EquipmentInsert, EquipmentViews, EquipmentUpdate } = require('./equipment.service')
module.exports = {
    EquipmentInsert: (req, res) => {
        const body = req.body;
        const body_result = validateQiEquipment.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.equip_name = body_result.value.equip_name;
        EquipmentInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                insertid: result.insertId,
                message: "Details Saved"
            })
        })
    },

    EquipmentViews: (req, res) => {
        EquipmentViews((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    EquipmentUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateQiEquipment.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 7,
                message: body_result.error.details[0].message
            });
        }
        body.equip_name = body_result.value.equip_name;
        EquipmentUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Updated Successfully"
            })
        })
    },

}
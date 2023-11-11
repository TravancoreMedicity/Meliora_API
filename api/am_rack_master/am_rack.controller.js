const { validateAssetRackMaster } = require('../../validation/validation_schema');
const { AssetRackInsert, AssetRackView, AssetRackUpdate } = require('../am_rack_master/am_rack.service')
module.exports = {
    AssetRackInsert: (req, res) => {
        const body = req.body;
        //validate manufacture Instert function
        const body_result = validateAssetRackMaster.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.am_rack_name = body_result.value.am_rack_name;
        AssetRackInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Rack inserted successfully"
            })
        })
    },
    AssetRackView: (req, res) => {

        AssetRackView((err, results) => {
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
    AssetRackUpdate: (req, res) => {
        const body = req.body;
        //validate manufacture Instert function
        const body_result = validateAssetRackMaster.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.am_rack_name = body_result.value.am_rack_name;
        AssetRackUpdate(body, (err, results) => {
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
                message: "rack data Updated successfully"
            })
        })
    },
}

const { validateAssetType } = require('../../validation/validation_schema');
const { AssetTypeInsert, AssetTypeView, AssetTypeUpdate } = require('../am_asset_type/am_assetType.services')
module.exports = {
    AssetTypeInsert: (req, res) => {
        const body = req.body;
        //validate department Instert function
        const body_result = validateAssetType.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.asset_type_name = body_result.value.asset_type_name;
        AssetTypeInsert(body, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Asset Type inserted successfully"
            })
        })
    },

    AssetTypeView: (req, res) => {

        AssetTypeView((err, results) => {
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
    AssetTypeUpdate: (req, res) => {
        const body = req.body;
        AssetTypeUpdate(body, (err, results) => {
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
                message: "Asset Type data Updated successfully"
            })
        })
    },
}
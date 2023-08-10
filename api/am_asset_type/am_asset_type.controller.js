const { AssetTypeInsert, AssetTypeView, AssetTypeUpdate } = require('../am_asset_type/am_assetType.services')
module.exports = {
    AssetTypeInsert: (req, res) => {
        const body = req.body;
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
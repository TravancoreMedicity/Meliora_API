const logger = require('../../logger/logger')
const { getAssetBasedOnLocation, transferDepartment } = require('../am_asset_dept_transfer/asset_depttransfer.service');

module.exports = {

    getAssetBasedOnLocation: (req, res) => {
        const body = req.body
        getAssetBasedOnLocation(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },

    transferDepartment: (req, res) => {
        const body = req.body
        transferDepartment(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Department Transfer Successfully"
            });
        })
    },
}

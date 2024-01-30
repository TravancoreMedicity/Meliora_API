const logger = require('../../logger/logger')
const { getdataForInternalTrans } = require('../am_asset_internaltrans/asset_internaltrans.service');

module.exports = {

    getdataForInternalTrans: (req, res) => {
        const body = req.body
        getdataForInternalTrans(body, (err, results) => {
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


}

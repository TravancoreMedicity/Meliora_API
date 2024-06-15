const { getCRFNoBased, getdataUserAcknldged

} = require('../crm_reports/crm_report.service');
const logger = require('../../logger/logger');


module.exports = {

    getCRFNoBased: (req, res) => {
        const id = req.params.id
        getCRFNoBased(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getdataUserAcknldged: (req, res) => {
        const body = req.body
        getdataUserAcknldged(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
}
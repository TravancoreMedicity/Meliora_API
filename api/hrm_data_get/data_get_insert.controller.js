const logger = require('../../logger/logger')
const { getdepartment } = require("../hrm_data_get/data_get_insert_service")
module.exports = {


    getdepartment: (req, res) => {
        getdepartment((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
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





}
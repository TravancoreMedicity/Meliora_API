const logger = require('../../logger/logger')

const { totaladmissioncount, getDamacount, getcountbhrc } = require('../WeworkDashboard/Wework.service')

module.exports = {
    totaladmissioncount: (req, res) => {
        totaladmissioncount((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Result Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getDamacount: (req, res) => {
        const id = req.params.id;
        getDamacount(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Result"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getcountbhrc: (req, res) => {
        const id = req.params.id;
        getcountbhrc(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Result"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
}


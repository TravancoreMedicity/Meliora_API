const logger = require('../../logger/logger')

const { totaladmissioncount, getDamacount, getcountbhrc, getdocVisitCount, getDischargecountAfterNoon } = require('../WeworkDashboard/Wework.service')

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
        getDamacount((err, results) => {
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
    getcountbhrc: (req, res) => {
        getcountbhrc((err, results) => {
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
    getdocVisitCount: (req, res) => {
        getdocVisitCount((err, results) => {
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
    getDischargecountAfterNoon: (req, res) => {
        getDischargecountAfterNoon((err, results) => {
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
    }
}


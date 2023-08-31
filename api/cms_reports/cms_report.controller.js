const { RequstToAssignList, RequstToRectifyList, RequstToVerifyList, AssignToRectify,
    AssignToVerify, RectifyToVerify, ReqComCategorty, ReqAreaWise, ReqComPerAssigne,
    ReqTatPerComAssignee, getCompCategory
} = require('../cms_reports/cms_report.service');
const logger = require('../../logger/logger');


module.exports = {

    RequstToAssignList: (req, res) => {
        const body = req.body
        RequstToAssignList(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Record Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    RequstToRectifyList: (req, res) => {
        const body = req.body
        RequstToRectifyList(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Record Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    RequstToVerifyList: (req, res) => {
        const body = req.body
        RequstToVerifyList(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Record Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    AssignToRectify: (req, res) => {
        const body = req.body
        AssignToRectify(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Record Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    AssignToVerify: (req, res) => {
        const body = req.body
        AssignToVerify(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Record Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    RectifyToVerify: (req, res) => {
        const body = req.body
        RectifyToVerify(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Record Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    ReqComCategorty: (req, res) => {
        const body = req.body
        ReqComCategorty(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Record Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    ReqAreaWise: (req, res) => {
        const body = req.body
        ReqAreaWise(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Record Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    ReqComPerAssigne: (req, res) => {
        const body = req.body
        ReqComPerAssigne(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Record Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    ReqTatPerComAssignee: (req, res) => {
        const body = req.body
        ReqTatPerComAssignee(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Record Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getCompCategory: (req, res) => {

        getCompCategory((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                logger.infoLogger("No Records Found")
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
}
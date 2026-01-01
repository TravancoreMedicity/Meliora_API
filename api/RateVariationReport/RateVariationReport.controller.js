const logger = require('../../logger/logger');
const { validateQiDepartment } = require('../../validation/validation_schema');
validateQiDepartment
const { checkInsertVal, selectRateVariation, insertComment, getCommentsbyID, updateRateVariationReport, RateVarWithMarginDiff, checkInsertValofMarginDiff, ratevariationResolvedList, insertRateVariationBulkService } = require('./RateVariationReport.service')
module.exports = {

    insertRateVariationBulk: (req, res) => {
        const insertData = req.body; // 👈 array directly

        if (!Array.isArray(insertData) || insertData.length === 0) {
            return res.status(400).json({
                success: 0,
                message: "Invalid data"
            });
        }

        // 🔹 Check duplicates ONE BY ONE
        checkInsertVal(insertData, (err, exists) => {
            if (err) {
                logger.logwindow(err);
                return res.status(500).json({ success: 0, message: err });
            }

            if (exists.length > 0) {
                return res.status(200).json({
                    success: 7,
                    message: "This Data Already Exist"
                });
            }

            insertRateVariationBulkService(insertData, (err, results) => {
                if (err) {
                    logger.logwindow(err);
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: "Data Inserted Successfully"
                });
            });
        });
    },
    selectRateVariation: (req, res) => {
        selectRateVariation((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

    insertComment: (req, res) => {
        const body = req.body;
        insertComment(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            updateRateVariationReport(body, (err2) => {
                if (err2) {
                    return res.status(200).json({
                        success: 0,
                        message: err2
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: "Comment inserted Sucessfully"
                });
            });

            // return res.status(200).json({
            //     success: 1,
            //     message: "Comment inserted Sucessfully"
            // });
        });
    },
    getCommentsbyID: (req, res) => {
        const id = req.params.id;
        getCommentsbyID(id, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(400).json({
                    success: 0,
                    message: "No Records Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    //rate variation with margin differance
    RateVarWithMarginDiff: (req, res) => {
        const body = req.body;
        //validate room type insertion function
        checkInsertValofMarginDiff(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                RateVarWithMarginDiff(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Inserted Successfully"
                    });
                });
            } else {
                logger.infologwindow("This Data Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "This Data Already Exist"
                })
            }
        })
    },
    ratevariationResolvedList: (req, res) => {
        ratevariationResolvedList((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

}



const logger = require('../../logger/logger');
const { validateQiDepartment } = require('../../validation/validation_schema');
validateQiDepartment
const { insertRateVariation, checkInsertVal, selectRateVariation, insertComment, getCommentsbyID, updateRateVariationReport, insertRateVariationBulk, RateVarWithMarginDiff, checkInsertValofMarginDiff, ratevariationResolvedList } = require('./RateVariationReport.service')
module.exports = {

    insertRateVariationBulk: (req, res) => {
        const body = req.body;
        const insertData = body.items?.map((value) => {
            return {
                grn_no: value.grn_no,
                grn_date: value.grn_date,
                item_name: value.item_name,
                grn_rate: value.grn_rate,
                grn_selling_rate: value.grn_selling_rate,
                grn_dis: value.grn_dis,
                rate: value.rate,
                disc: value.disc,
                po_margin: value.po_margin,
                rate_variation: value.rate_variation,
                quo_margin: value.quo_margin,
                purchase_margin: value.purchase_margin,
                margin_diff: value.margin_diff,
                grn_variation_qty: value.grn_variation_qty,
                grn_variation_free: value.grn_variation_free,
                date_diff: value.date_diff,
                disc_variation: value.disc_variation,
                create_user: value.create_user
            }
        });


        //validate room type insertion function
        checkInsertVal(insertData, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                insertRateVariationBulk(insertData, (err, results) => {
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
    insertRateVariation: (req, res) => {
        const body = req.body;
        //validate room type insertion function
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                insertRateVariation(body, (err, results) => {
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



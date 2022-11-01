const { InsertNurseStation, checkInsertVal, getNurseStation, UpdateNurseStation, checkUpdateVal, getNurstation } = require("../co_nursestation/nursestation.service")
const logger = require('../../logger/logger')
const { validateNurseStation } = require('../../validation/validation_schema')
module.exports = {
    InsertNurseStation: (req, res) => {
        const body = req.body;
        //validate nurseing station insertion function
        const body_result = validateNurseStation.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.co_nurse_desc = body_result.value.co_nurse_desc;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results));
            if (Object.keys(value).length === 0) {
                InsertNurseStation(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Nurse Station Inserted Successfully"
                    });
                });
            } else {
                logger.infologwindow("Nurse StationAlready Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Nurse Station Already Exist"
                })
            }
        })
    },

    getNurseStation: (req, res) => {
        getNurseStation((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No results found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    UpdateNurseStation: (req, res) => {
        const body = req.body;
        //validate nurseing station updation function
        const body_result = validateNurseStation.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.co_nurse_desc = body_result.value.co_nurse_desc;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                UpdateNurseStation(body, (err, results) => {
                    if (err) {
                        return res.status(400).json({
                            success: 0,
                            message: err
                        });
                    }
                    if (!results) {
                        logger.infologwindow("Record Not Found")
                        return res.status(400).json({
                            success: 1,
                            message: "Record Not Found"
                        })
                    }
                    return res.status(200).json({
                        success: 2,
                        message: "Nurse Station Updated Successfully"
                    })
                })
            } else {
                logger.infologwindow("Nurse Station Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Nurse Station Already Exist"
                })
            }
        })
    },
    getNurstation: (req, res) => {
        getNurstation((err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }
            if (!results) {
                // logger.infologwindow("No Results Found")
                return res.status(400).json({
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
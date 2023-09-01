const { PriorityInsertData, PriorityUpdateData, PrioritySelectData, PrioritySelectCmp, checkInsertVal, checkUpdateVal } = require("../cm_prority_mst/cm_priority_service")
const logger = require('../../logger/logger')
const { ValidatePrority } = require('../../validation/validation_schema')
module.exports = {
    PriorityInsertData: (req, res) => {
        const body = req.body;
        //validate diet master insertion function
        const body_result = ValidatePrority.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.diet_name = body_result.value.diet_name;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results));
            if (Object.keys(value).length === 0) {
                PriorityInsertData(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Inserted Successfully"
                    });
                });
            } else {
                logger.infologwindow("Complaint Priority Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Complaint Priority Already Exist"
                })
            }
        })
    },
    PriorityUpdateData: (req, res) => {
        const body = req.body;
        //validate diet master insertion function
        const body_result = ValidatePrority.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.diet_name = body_result.value.diet_name;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                PriorityUpdateData(body, (err, results) => {
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
                        message: "Complaint Priority Updated Successfully"
                    })
                })
            } else {
                logger.infologwindow("Complaint Priority  Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Complaint Priority Already Exist"
                })
            }
        })
    },
    PrioritySelectData: (req, res) => {
        PrioritySelectData((err, results) => {
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

    PrioritySelectCmp: (req, res) => {
        PrioritySelectCmp((err, results) => {
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
}
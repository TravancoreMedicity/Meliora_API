const { EscalationTimeInsert, getEscalation, EscalationUpdate, checkInsertVal, checkUpdateVal } = require('../co_escalationtimemast/escalationtime.service');
const logger = require('../../logger/logger')
const { validateEscalationtime } = require('../../validation/validation_schema');
module.exports = {
    EscalationTimeInsert: (req, res) => {
        const body = req.body;
        //validate escalation insertion function
        const body_result = validateEscalationtime.validate(body);
        if (body_result.error) {
            // logger.logwindow(body_result.error.details[0].message)
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.esc_activity = body_result.value.esc_activity;
        body.esc_responsibility = body_result.value.esc_responsibility;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                EscalationTimeInsert(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Escalation Time Inserted Successfully"
                    });
                });
            } else {
                logger.infologwindow("Escalation Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Escalation  Already Exist"
                })
            }
        })
    },
    getEscalation: (req, res) => {
        getEscalation((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
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
    EscalationUpdate: (req, res) => {
        const body = req.body;
        //validate escalation insertion function
        const body_result = validateEscalationtime.validate(body);
        if (body_result.error) {
            // logger.logwindow(body_result.error.details[0].message)
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                EscalationUpdate(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    if (!results) {
                        logger.infologwindow("Record Not Found")
                        return res.status(200).json({
                            success: 1,
                            message: "Record Not Found"
                        });
                    }
                    return res.status(200).json({
                        success: 2,
                        message: "Escalation Updated Successfully"
                    });
                })
            } else {
                logger.infologwindow("Escalation Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Escalation Name Already Exist"
                })
            }
        })
    }
}

const { validateBackupVerification, validateSelectedDaysBackupVerification, validateMonthBackupVerification, validateYearBackupVerification, validateWeekBackupVerification } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');
const {
    getVerificationDetails,
    getBackupEmployee,
    verificationUpdate,
    monthlyVerificationUpdate,
    yearlyVerificationUpdate,
    WeeklyVerificationUpdate,
    DaysVerificationUpdate
} = require('./backupVerification.service')

module.exports = {
    getVerificationDetails: (req, res) => {
        getVerificationDetails((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    getBackupEmployee: (req, res) => {
        getBackupEmployee((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    verificationUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateBackupVerification.validate(body)
        if (body_result.error) {
            // logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 4,
                message: body_result.error.details[0].message
            });
        }
        body.daily_slno = body_result.value.daily_slno;
        verificationUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Updated successfully"
            })
        })
    },
    monthlyVerificationUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateMonthBackupVerification.validate(body)
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 4,
                message: body_result.error.details[0].message
            });
        }
        body.monthly_slno = body_result.value.monthly_slno;
        monthlyVerificationUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Updated successfully"
            })
        })
    },

    yearlyVerificationUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateYearBackupVerification.validate(body)
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 4,
                message: body_result.error.details[0].message
            });
        }
        body.yearly_slno = body_result.value.yearly_slno;
        yearlyVerificationUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Updated successfully"
            })
        })
    },

    WeeklyVerificationUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateWeekBackupVerification.validate(body)
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 4,
                message: body_result.error.details[0].message
            });
        }
        body.weekly_slno = body_result.value.weekly_slno;
        WeeklyVerificationUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Updated successfully"
            })
        })
    },

    DaysVerificationUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateSelectedDaysBackupVerification.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 4,
                message: body_result.error.details[0].message
            });
        }
        body.days_slno = body_result.value.days_slno;
        DaysVerificationUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Updated successfully"
            })
        })
    },


}
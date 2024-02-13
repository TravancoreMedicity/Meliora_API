const logger = require('../../logger/logger')
const { validateBackupDetails } = require('../../validation/validation_schema');
const { backupDetailsInsert,
    getBackupDetails,
    backupTypeUpdate,
    scheduleTimeInsert,
    ScheduleTimeInactive,
    SelectedDaysInsert,
    SelectedDaysUpdate,
    backupDailyInsert,
    DailyDetailsDelete,
    MonthlyDetailsDelete,
    WeekDetailsDelete,
    YearDetailsDelete
} = require('./backupDetails.service')
module.exports = {
    backupDetailsInsert: (req, res) => {
        const body = req.body;
        const body_result = validateBackupDetails.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.backup_type = body_result.value.backup_type;
        backupDetailsInsert(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Backup Details Saved",
                insert_id: results.insertId
            });
        });
    },
    getBackupDetails: (req, res) => {
        getBackupDetails((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    backupTypeUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateBackupDetails.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 4,
                message: body_result.error.details[0].message
            });
        }
        body.backup_type = body_result.value.backup_type;
        backupTypeUpdate(body, (err, results) => {
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

    scheduleTimeInsert: (req, res) => {
        const body = req.body;
        var dataList = body?.map((val, index) => {
            return [val.backup_slno, val.backup_name, val.backup_schedule_type, val.backup_schedule_time, val.status, val.create_user]
        })
        scheduleTimeInsert(dataList, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                time_id: results.insertId,
                message: "Backup Details Saved"
            })
        })
    },

    ScheduleTimeInactive: (req, res) => {
        const body = req.body;
        ScheduleTimeInactive(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    // message: "No record found"
                })
            }
            return res.status(200).json({
                success: 2,
                message: " Updated successfully"
            })
        })
    },

    SelectedDaysInsert: (req, res) => {
        const body = req.body;
        SelectedDaysInsert(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err.message
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Updated Sucessfully"
            })
        })
    },

    SelectedDaysUpdate: (req, res) => {
        const body = req.body;
        SelectedDaysUpdate(body, (err, results) => {
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

    backupDailyInsert: (req, res) => {
        const body = req.body;
        var daysinsert = body?.map((val, index) => {
            return [val.time_slno, val.backup_slno, val.backup_daily_date, val.backup_schedule_time, val.verify_status, val.create_user]
        })
        backupDailyInsert(daysinsert, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err.message
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Backup Details Saved"
            })
        })
    },

    DailyDetailsDelete: async (req, res) => {
        const body = req.body;
        DailyDetailsDelete(body, (err, results) => {
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
                message: "Deleted successfully"
            })
        })
    },

    MonthlyDetailsDelete: async (req, res) => {
        const body = req.body;
        MonthlyDetailsDelete(body, (err, results) => {
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
                message: "Deleted successfully"
            })
        })
    },

    WeekDetailsDelete: async (req, res) => {
        const body = req.body;
        WeekDetailsDelete(body, (err, results) => {
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
                message: "Deleted successfully"
            })
        })
    },

    YearDetailsDelete: async (req, res) => {
        const body = req.body;
        YearDetailsDelete(body, (err, results) => {
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
                message: "Deleted successfully"
            })
        })
    },

}

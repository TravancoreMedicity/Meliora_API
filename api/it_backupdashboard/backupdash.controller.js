
const { getDailyBackup,
    getLastDayOfBackup,
    DailyAlreadyExist,
    backupDailyInsert,
    getDailyDetailsForVerification,
    getDailyVerifiedDetails,
    getMonthlyBackup,
    backupMonthlyInsert,
    MonthlyAlreadyExist,
    getMonthlyDetailsForVerification,
    getMonthVerified,
    getYearlyBackup,
    YearAlreadyExist,
    backupYearlyInsert,
    getYearlyDetailsForVerification,
    getYearVerified,
    getWeeklyBackup,
    WeekAlreadyExist,
    backupWeeklyInsert,
    getWeeklyDetails,
    getWeeklyVerifiedDetails,
    getSelectedDaysBackup,
    getSelectedDays,
    DaysAlreadyExist,
    SelectedDaysInsert,
    getSelectedDaysVerified

} = require('./backupdash.service')
module.exports = {
    getSelectedDaysBackup: (req, res) => {
        getSelectedDaysBackup((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    // message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    getSelectedDays: (req, res) => {
        getSelectedDays((err, results) => {
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

    DaysAlreadyExist: (req, res) => {
        DaysAlreadyExist((err, results) => {

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

    SelectedDaysInsert: (req, res) => {
        const body = req.body;
        const data = body?.map((val) => {
            return [val.backup_slno, val.selected_days, val.backup_selected_date,
            val.due_date, val.verify_status, val.create_user]
        })
        SelectedDaysInsert(data, (err, results) => {
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

    getSelectedDaysVerified: (req, res) => {
        getSelectedDaysVerified((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    // message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    getDailyBackup: (req, res) => {
        getDailyBackup((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    // message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    getLastDayOfBackup: (req, res) => {
        getLastDayOfBackup((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    // message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    backupDailyInsert: (req, res) => {
        const body = req.body;
        const data = body?.map((val) => {
            return [val.time_slno, val.backup_slno, val.backup_daily_date,
            val.backup_schedule_time, val.verify_status, val.create_user]
        })
        DailyAlreadyExist(data, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                backupDailyInsert(data, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err.message
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Inserted"
                    })
                })
            }
            else {
                return res.status(200).json({
                    success: 7,
                    message: "Already Exist"
                })
            }
        })
    },

    getDailyDetailsForVerification: (req, res) => {
        getDailyDetailsForVerification((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    // message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    getDailyVerifiedDetails: (req, res) => {
        getDailyVerifiedDetails((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    // message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    getMonthlyBackup: (req, res) => {
        getMonthlyBackup((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    // message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    backupMonthlyInsert: (req, res) => {
        const body = req.body;
        const data = body?.map((val) => {
            return [val.time_slno, val.backup_slno, val.backup_monthly_date,
            val.backup_schedule_time, val.verify_status, val.create_user]
        })
        MonthlyAlreadyExist(data, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))

            if (Object.keys(value).length === 0) {
                backupMonthlyInsert(data, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err.message
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Inserted"
                    })
                })
            }
            else {
                return res.status(200).json({
                    success: 7,
                    message: "Already Exist"
                })
            }
        })
    },

    getMonthlyDetailsForVerification: (req, res) => {
        getMonthlyDetailsForVerification((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    // message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    getMonthVerified: (req, res) => {
        getMonthVerified((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    // message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    getYearlyBackup: (req, res) => {
        getYearlyBackup((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    // message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })

        })
    },

    backupYearlyInsert: (req, res) => {
        const body = req.body;
        const data = body?.map((val) => {
            return [val.time_slno, val.backup_slno, val.backup_yearly_date,
            val.backup_schedule_time, val.verify_status, val.create_user]
        })
        YearAlreadyExist(data, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                backupYearlyInsert(data, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err.message
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Inserted"
                    })
                })
            }
            else {
                return res.status(200).json({
                    success: 7,
                    message: "Already Exist"
                })
            }
        })
    },

    getYearlyDetailsForVerification: (req, res) => {
        getYearlyDetailsForVerification((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    // message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    getYearVerified: (req, res) => {
        getYearVerified((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    // message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    getWeeklyBackup: (req, res) => {
        getWeeklyBackup((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    // message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })

        })
    },

    backupWeeklyInsert: (req, res) => {
        const body = req.body;
        const data = body?.map((val) => {
            return [val.time_slno, val.backup_slno, val.backup_weekly_date,
            val.backup_schedule_time, val.verify_status, val.create_user]
        })
        WeekAlreadyExist(data, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                backupWeeklyInsert(data, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err.message
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Inserted"
                    })
                })
            }
            else {
                return res.status(200).json({
                    success: 7,
                    message: "Already Exist"
                })
            }
        })
    },

    getWeeklyDetails: (req, res) => {
        getWeeklyDetails((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    // message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    getWeeklyVerifiedDetails: (req, res) => {
        getWeeklyVerifiedDetails((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    // message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
}
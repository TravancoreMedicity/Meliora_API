
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
    // getSelectedDaysBackup: (req, res) => {
    //     getSelectedDaysBackup((err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             })
    //         }
    //         if (Object.keys(results).length === 0) {
    //             return res.status(200).json({
    //                 success: 1,
    //                 // message: "No Data Found",
    //                 data: []
    //             })
    //         }
    //         return res.status(200).json({
    //             success: 2,
    //             data: results
    //         })
    //     })
    // },

    getSelectedDaysBackup: (req, res) => {
        const id = req.params.id;
        getSelectedDaysBackup(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        })
    },
    // getSelectedDays: (req, res) => {
    //     getSelectedDays((err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             })
    //         }
    //         if (Object.keys(results).length === 0) {
    //             return res.status(200).json({
    //                 success: 1,
    //                 data: []
    //             })
    //         }
    //         return res.status(200).json({
    //             success: 2,
    //             data: results
    //         })
    //     })
    // },
    getSelectedDays: (req, res) => {
        const id = req.params.id;
        getSelectedDays(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
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
        const body = req.body;
        getSelectedDaysVerified(body, (err, results) => {
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

    // getDailyBackup: (req, res) => {
    //     getDailyBackup((err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             })
    //         }
    //         if (Object.keys(results).length === 0) {
    //             return res.status(200).json({
    //                 success: 1,
    //                 // message: "No Data Found",
    //                 data: []
    //             })
    //         }
    //         return res.status(200).json({
    //             success: 2,
    //             data: results
    //         })
    //     })
    // },
    getDailyBackup: (req, res) => {
        const id = req.params.id;
        getDailyBackup(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
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

    // backupDailyInsert: (req, res) => {
    //     const body = req.body;
    //     const data = body?.map((val) => {
    //         return [val.time_slno, val.backup_slno, val.backup_daily_date,
    //         val.backup_schedule_time, val.verify_status, val.create_user]
    //     })
    //     DailyAlreadyExist(data, (err, results) => {
    //         const value = JSON.parse(JSON.stringify(results))
    //         if (Object.keys(value).length === 0) {
    //             backupDailyInsert(data, (err, results) => {
    //                 if (err) {
    //                     return res.status(200).json({
    //                         success: 0,
    //                         message: err.message
    //                     });
    //                 }
    //                 return res.status(200).json({
    //                     success: 1,
    //                     message: "Inserted"
    //                 })
    //             })
    //         }
    //         else {
    //             return res.status(200).json({
    //                 success: 7,
    //                 message: "Already Exist"
    //             })
    //         }
    //     })
    // },

    backupDailyInsert: (req, res) => {
        const body = req.body;
        const data = body?.map((val) => [
            val.time_slno,
            val.backup_slno,
            val.backup_daily_date,
            val.backup_schedule_time,
            val.verify_status,
            val.create_user
        ]);
        DailyAlreadyExist(data, (err, existingRecords) => {
            if (err) {
                return res.status(500).json({ success: 0, message: err.message });
            }
            const existingSet = new Set(existingRecords.map(row => `${row.time_slno},${row.backup_slno}`));
            const newRecords = data.filter(([time_slno, backup_slno]) =>
                !existingSet.has(`${time_slno},${backup_slno}`)
            );
            if (newRecords.length === 0) {
                return res.status(200).json({ success: 7, message: "Already Exist" });
            }
            backupDailyInsert(newRecords, (err, results) => {
                if (err) {
                    return res.status(500).json({ success: 0, message: err.message });
                }
                return res.status(200).json({
                    success: 1,
                });
            });
        });
    },
    // getDailyDetailsForVerification: (req, res) => {
    //     getDailyDetailsForVerification((err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             })
    //         }
    //         if (Object.keys(results).length === 0) {
    //             return res.status(200).json({
    //                 success: 1,
    //                 // message: "No Data Found",
    //                 data: []
    //             })
    //         }
    //         return res.status(200).json({
    //             success: 2,
    //             data: results
    //         })
    //     })
    // },
    getDailyDetailsForVerification: (req, res) => {
        const id = req.params.id;
        getDailyDetailsForVerification(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        })
    },

    getDailyVerifiedDetails: (req, res) => {
        const body = req.body;
        getDailyVerifiedDetails(body, (err, results) => {
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

    // getMonthlyBackup: (req, res) => {
    //     getMonthlyBackup((err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             })
    //         }
    //         if (Object.keys(results).length === 0) {
    //             return res.status(200).json({
    //                 success: 1,
    //                 // message: "No Data Found",
    //                 data: []
    //             })
    //         }
    //         return res.status(200).json({
    //             success: 2,
    //             data: results
    //         })
    //     })
    // },
    getMonthlyBackup: (req, res) => {
        const id = req.params.id;
        getMonthlyBackup(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        })
    },
    // backupMonthlyInsert: (req, res) => {
    //     const body = req.body;
    //     const data = body?.map((val) => {
    //         return [val.time_slno, val.backup_slno, val.backup_monthly_date,
    //         val.backup_schedule_time, val.verify_status, val.create_user]
    //     })  

    //     MonthlyAlreadyExist(data, (err, results) => {
    //         const value = JSON.parse(JSON.stringify(results))

    //         if (Object.keys(value).length === 0) {
    //             backupMonthlyInsert(data, (err, results) => {
    //                 if (err) {
    //                     return res.status(200).json({
    //                         success: 0,
    //                         message: err.message
    //                     });
    //                 }
    //                 return res.status(200).json({
    //                     success: 1,
    //                     message: "Inserted"
    //                 })
    //             })
    //         }
    //         else {
    //             return res.status(200).json({
    //                 success: 7,
    //                 message: "Already Exist"
    //             })
    //         }
    //     })
    // },
    backupMonthlyInsert: (req, res) => {
        const body = req.body;
        const data = body?.map((val) => [
            val.time_slno,
            val.backup_slno,
            val.backup_monthly_date,
            val.backup_schedule_time,
            val.verify_status,
            val.create_user
        ]);
        MonthlyAlreadyExist(data, (err, existingRecords) => {
            if (err) {
                return res.status(500).json({ success: 0, message: err.message });
            }
            const existingSet = new Set(existingRecords.map(row => `${row.time_slno},${row.backup_slno}`));
            const newRecords = data.filter(([time_slno, backup_slno]) =>
                !existingSet.has(`${time_slno},${backup_slno}`)
            );
            if (newRecords.length === 0) {
                return res.status(200).json({ success: 7, message: "Already Exist" });
            }
            backupMonthlyInsert(newRecords, (err, results) => {
                if (err) {
                    return res.status(500).json({ success: 0, message: err.message });
                }
                return res.status(200).json({
                    success: 1,
                });
            });
        });
    },

    // getMonthlyDetailsForVerification: (req, res) => {
    //     getMonthlyDetailsForVerification((err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             })
    //         }
    //         if (Object.keys(results).length === 0) {
    //             return res.status(200).json({
    //                 success: 1,
    //                 // message: "No Data Found",
    //                 data: []
    //             })
    //         }
    //         return res.status(200).json({
    //             success: 2,
    //             data: results
    //         })
    //     })
    // },
    getMonthlyDetailsForVerification: (req, res) => {
        const id = req.params.id;
        getMonthlyDetailsForVerification(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        })
    },

    getMonthVerified: (req, res) => {
        const body = req.body;
        getMonthVerified(body, (err, results) => {
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

    // getYearlyBackup: (req, res) => {
    //     getYearlyBackup((err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             })
    //         }
    //         if (Object.keys(results).length === 0) {
    //             return res.status(200).json({
    //                 success: 1,
    //                 // message: "No Data Found",
    //                 data: []
    //             })
    //         }
    //         return res.status(200).json({
    //             success: 2,
    //             data: results
    //         })

    //     })
    // },
    getYearlyBackup: (req, res) => {
        const id = req.params.id;
        getYearlyBackup(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        })
    },

    // backupYearlyInsert: (req, res) => {
    //     const body = req.body;
    //     const data = body?.map((val) => {
    //         return [val.time_slno, val.backup_slno, val.backup_yearly_date,
    //         val.backup_schedule_time, val.verify_status, val.create_user]
    //     })
    //     YearAlreadyExist(data, (err, results) => {
    //         const value = JSON.parse(JSON.stringify(results))
    //         if (Object.keys(value).length === 0) {
    //             backupYearlyInsert(data, (err, results) => {
    //                 if (err) {
    //                     return res.status(200).json({
    //                         success: 0,
    //                         message: err.message
    //                     });
    //                 }
    //                 return res.status(200).json({
    //                     success: 1,
    //                     message: "Inserted"
    //                 })
    //             })
    //         }
    //         else {
    //             return res.status(200).json({
    //                 success: 7,
    //                 message: "Already Exist"
    //             })
    //         }
    //     })
    // },
    backupYearlyInsert: (req, res) => {
        const body = req.body;
        const data = body?.map((val) => [
            val.time_slno,
            val.backup_slno,
            val.backup_yearly_date,
            val.backup_schedule_time,
            val.verify_status,
            val.create_user
        ]);
        YearAlreadyExist(data, (err, existingRecords) => {
            if (err) {
                return res.status(500).json({ success: 0, message: err.message });
            }
            const existingSet = new Set(existingRecords.map(row => `${row.time_slno},${row.backup_slno}`));
            const newRecords = data.filter(([time_slno, backup_slno]) =>
                !existingSet.has(`${time_slno},${backup_slno}`)
            );
            if (newRecords.length === 0) {
                return res.status(200).json({ success: 7, message: "Already Exist" });
            }
            backupYearlyInsert(newRecords, (err, results) => {
                if (err) {
                    return res.status(500).json({ success: 0, message: err.message });
                }
                return res.status(200).json({
                    success: 1,
                });
            });
        });
    },

    // getYearlyDetailsForVerification: (req, res) => {
    //     getYearlyDetailsForVerification((err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             })
    //         }
    //         if (Object.keys(results).length === 0) {
    //             return res.status(200).json({
    //                 success: 1,
    //                 // message: "No Data Found",
    //                 data: []
    //             })
    //         }
    //         return res.status(200).json({
    //             success: 2,
    //             data: results
    //         })
    //     })
    // },
    getYearlyDetailsForVerification: (req, res) => {
        const id = req.params.id;
        getYearlyDetailsForVerification(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        })
    },

    getYearVerified: (req, res) => {
        const body = req.body;
        getYearVerified(body, (err, results) => {
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

    // getWeeklyBackup: (req, res) => {
    //     getWeeklyBackup((err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             })
    //         }
    //         if (Object.keys(results).length === 0) {
    //             return res.status(200).json({
    //                 success: 1,
    //                 // message: "No Data Found",
    //                 data: []
    //             })
    //         }
    //         return res.status(200).json({
    //             success: 2,
    //             data: results
    //         })

    //     })
    // },
    getWeeklyBackup: (req, res) => {
        const id = req.params.id;
        getWeeklyBackup(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        })
    },

    // backupWeeklyInsert: (req, res) => {
    //     const body = req.body;
    //     const data = body?.map((val) => {
    //         return [val.time_slno, val.backup_slno, val.backup_weekly_date,
    //         val.backup_schedule_time, val.verify_status, val.create_user]
    //     })
    //     WeekAlreadyExist(data, (err, results) => {
    //         const value = JSON.parse(JSON.stringify(results))
    //         if (Object.keys(value).length === 0) {
    //             backupWeeklyInsert(data, (err, results) => {
    //                 if (err) {
    //                     return res.status(200).json({
    //                         success: 0,
    //                         message: err.message
    //                     });
    //                 }
    //                 return res.status(200).json({
    //                     success: 1,
    //                     message: "Inserted"
    //                 })
    //             })
    //         }
    //         else {
    //             return res.status(200).json({
    //                 success: 7,
    //                 message: "Already Exist"
    //             })
    //         }
    //     })
    // },
    backupWeeklyInsert: (req, res) => {
        const body = req.body;
        const data = body?.map((val) => [
            val.time_slno,
            val.backup_slno,
            val.backup_weekly_date,
            val.backup_schedule_time,
            val.verify_status,
            val.create_user
        ]);
        WeekAlreadyExist(data, (err, existingRecords) => {
            if (err) {
                return res.status(500).json({ success: 0, message: err.message });
            }
            const existingSet = new Set(existingRecords.map(row => `${row.time_slno},${row.backup_slno}`));
            const newRecords = data.filter(([time_slno, backup_slno]) =>
                !existingSet.has(`${time_slno},${backup_slno}`)
            );
            if (newRecords.length === 0) {
                return res.status(200).json({ success: 7, message: "Already Exist" });
            }
            backupWeeklyInsert(newRecords, (err, results) => {
                if (err) {
                    return res.status(500).json({ success: 0, message: err.message });
                }
                return res.status(200).json({
                    success: 1,
                });
            });
        });
    },
    // getWeeklyDetails: (req, res) => {
    //     getWeeklyDetails((err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             })
    //         }
    //         if (Object.keys(results).length === 0) {
    //             return res.status(200).json({
    //                 success: 1,
    //                 // message: "No Data Found",
    //                 data: []
    //             })
    //         }
    //         return res.status(200).json({
    //             success: 2,
    //             data: results
    //         })
    //     })
    // },
    getWeeklyDetails: (req, res) => {
        const id = req.params.id;
        getWeeklyDetails(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        })
    },
    getWeeklyVerifiedDetails: (req, res) => {
        const body = req.body;
        getWeeklyVerifiedDetails(body, (err, results) => {
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
}
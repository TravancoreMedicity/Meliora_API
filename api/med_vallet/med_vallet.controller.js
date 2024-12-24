const { date } = require('joi');
const logger = require('../../logger/logger');
const { createZonemaster,
    getAllZoneMaster,
    updatezonemaster,
    deleteZoneMaster,
    createUserMaster,
    getAlluserMaster,
    updataUserMaster,
    createslotmaster,
    getAllSlotMaster,
    updateslotmaster,
    createuserRight,
    getAllUserRight,
    updateuserRight,
    createcurrentDriver,
    getallPresentDriver,
    UpdateCurrentDriver,
    InsertCurrentDirver,
    getdriverdropDown,
    checkuserExist,
    getAllDriverUserRight,
    FindUserExists,
    UpdateExistingUser,
    CreateNewDriverAttendance,
    CreateEmployeeLogs,
    getAllAttendaceReport,
    getTodayAttendaceReport,
    getAttendaceBetweenDate,
    getselectedEmployee,
    getdriverDropdownReport
} = require("../med_vallet/med_vallet.service");
const { da } = require('date-fns/locale');


module.exports = {
    createZonemaster: (req, res) => {
        const body = req.body;
        createZonemaster(body, (err, results) => {
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
    getAllZoneMaster: (req, res) => {
        getAllZoneMaster((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
                return res.status(400).json({
                    success: 3,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updatezonemaster: (req, res) => {
        const body = req.body;
        updatezonemaster(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: "error in updating data"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Updated Data successfully"
            });
        })
    },
    deleteZoneMaster: (req, res) => {
        const body = req.body;
        deleteZoneMaster(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: "error in updating data"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Updated Data successfully"
            });
        })
    },
    createUserMaster: (req, res) => {
        const body = req.body;
        createUserMaster(body, (err, result) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: 'error in inserting data'
                })
            }
            return res.status(200).json({
                success: 1,
                message: 'Inserted successfully!'
            })
        })
    },
    getAlluserMaster: (req, res) => {
        getAlluserMaster((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
                return res.status(400).json({
                    success: 3,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    updataUserMaster: (req, res) => {
        const body = req.body;
        updataUserMaster(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: 'error in updating data'
                })
            };
            return res.status(200).json({
                success: 1,
                message: 'Updated succesfully!'
            })
        })
    },
    createslotmaster: (req, res) => {
        const body = req.body;
        createslotmaster(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Inserted successfully!"
            });
        })
    }, getAllSlotMaster: (req, res) => {
        getAllSlotMaster((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: err.message
                })
            };
            if (!results) {
                return res.status(400).json({
                    success: 3,
                    message: 'No data found here!'
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    updateslotmaster: (req, res) => {
        const body = req.body;
        updateslotmaster(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: "error in updating data"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Updated Data successfully"
            });
        })
    },
    createuserRight: (req, res) => {
        const body = req.body;
        if (!body || body === null || body === undefined) {
            return res.status(400).json({
                success: 2,
                message: 'Data is reqiured'
            })
        }
        checkuserExist(body, (err, results) => {
            if (err) {
                logger.logwindow(err);
                return res.status(200).json({
                    success: 2,
                    message: 'Error in inserting data'
                })
            }
            if (results && results.length > 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Data Already exists"
                })
            }
            createuserRight(body, (err, results) => {
                if (err) {
                    logger.logwindow(err);
                    return res.status(400).json({
                        success: 2,
                        message: 'Error in inserting data'
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Inserted Data successfully"
                });
            })
        })
    },

    getAllUserRight: (req, res) => {
        getAllUserRight((err, results) => {
            if (err) {
                logger.logwindow(err);
                return res.status(400).json({
                    success: 2,
                    message: 'error in fetching data'
                })
            }
            if (!results) {
                return res.status(300).json({
                    success: 1,
                    message: "No results found"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getAllDriverUserRight: (req, res) => {
        getAllDriverUserRight((err, results) => {
            if (err) {
                logger.logwindow(err);
                return res.status(400).json({
                    success: 2,
                    message: 'error in fetching data'
                })
            }
            if (!results) {
                return res.status(300).json({
                    success: 1,
                    message: "No results found"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    updateuserRight: (req, res) => {
        const data = req.body;
        if (!data || data === null || data === undefined) {
            return res.status(400).json({
                success: 2,
                message: 'Date  is reqiured'
            })
        }
        updateuserRight(data, (err, results) => {
            if (err) {
                logger.logwindow(err);
                return res.status(400).json({
                    success: 2,
                    message: 'Error in inserting data'
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Data Updated successfully"
            });
        })
    },

    createnewCurrentDriver: (req, res) => {
        const data = req.body;

        if (!data || data === null || data === undefined) {
            return res.status(400).json({
                success: 2,
                message: 'Data is reqiured'
            })
        }
        FindUserExists(data, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: "Error in fetching data", err
                })
            }

            const logData = {
                status: data?.in === 1 ? 'I' : 'O',
                empid: data?.empid,
                atendnaceTime: data?.in === 1 ? data?.inTime : data?.outTime
            }

            if (logData) {
                CreateEmployeeLogs(logData, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 2,
                            message: "Error in fetching data", err
                        })
                    }
                })
            }

            if (results && results.length > 0) {
                UpdateExistingUser(data, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 2,
                            message: "Error in inserting data", err
                        })
                    }
                })
            } else {
                CreateNewDriverAttendance(data, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(400).json({
                            success: 2,
                            message: "Error in inserting data", err
                        })
                    }
                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
                message: 'Inserted  Successfully'
            })
        })

    },


    getallPresentDriver: (req, res) => {
        const data = req.body;
        if (!data || data === null || data === undefined) {
            return res.status(400).json({
                success: 2,
                message: 'Date  is reqiured'
            })
        }
        getallPresentDriver(data, (err, results) => {
            if (err) {
                logger.logwindow(err);
                return res.status(400).json({
                    success: 2,
                    message: 'Error in fetching Data'
                })
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: 'No data Found'
                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
                message: 'fetched Successfully'
            })
        })
    },
    getdriverdropDown: (req, res) => {
        const data = req.body;
        if (!data || data === null || data === undefined) {
            return res.status(400).json({
                success: 2,
                message: 'Date  is reqiured'
            })
        }
        getdriverdropDown(data, (err, results) => {
            if (err) {
                logger.logwindow(err);
                return res.status(400).json({
                    success: 2,
                    message: 'Error in fetching Data'
                })
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: 'No data Found'
                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
                message: 'fetched Successfully'
            })
        })
    },
    getAllAttendaceReport: (req, res) => {
        getAllAttendaceReport((err, results) => {
            if (err) {
                logger.logwindow(err);
                return res.status(200).json({
                    message: 'Error in fetching data',
                    success: 2
                })
            }

            if (!results) {
                return res.status(200).json({
                    message: 'No Data found',
                    success: 2
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getTodayAttendaceReport: (req, res) => {
        const data = req.body;
        console.log(data, "daata");

        if (!data || data === null || data === undefined) {
            return res.status(400).json({
                success: 2,
                message: 'Date  is reqiured'
            })
        }
        getTodayAttendaceReport(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: 'Error in fetching Data'
                })
            }
            if (!results) {
                return res.status(200).json({
                    message: 'No Data found',
                    success: 2
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getAttendaceBetweenDate: (req, res) => {
        const data = req.body;
        console.log(data, "daata");

        if (!data || data === null || data === undefined) {
            return res.status(400).json({
                success: 2,
                message: 'Date  is reqiured'
            })
        }
        getAttendaceBetweenDate(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: 'Error in fetching Data'
                })
            }
            if (!results) {
                return res.status(200).json({
                    message: 'No Data found',
                    success: 2
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getselectedEmployee: (req, res) => {
        const data = req.body;
        getselectedEmployee(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: 'Error in fetching Data'
                })
            }
            if (!results) {
                return res.status(200).json({
                    message: 'No Data found',
                    success: 2
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getdriverDropdownReport: (req, res) => {
        getdriverDropdownReport((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: 'Error in fetching Data'
                })
            }
            if (!results) {
                return res.status(200).json({
                    message: 'No Data found',
                    success: 2
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    }
}

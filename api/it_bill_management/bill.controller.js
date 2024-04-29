const { BillInsert, AllBillView, UpdateBill, CheckInsetMonthlyOrNot, MonthlyTarrifInsert, MonthlyTarrifView, getMonthData, OtherBillinsert, OtherBillView, UpdateOtherBill,
    QuaterlyTarrifView, CheckInsetQuaterlyOrNot, QuaterlyTarrifInsert, getQuaterlyData, YearlyTarrifView, CheckInsetYearlyOrNot, YearlyTarrifInsert, getYearData,
    BillMonthlyUpdate, BillQuaterlyUpdate, BillYearlyUpdate, OtherBillViewDash, getTeleMonthData, getTeleQuarterlyData, getTeleYearlyData, otherTeleBillViewinDash,
    getSoftwareMonthData, getSoftwareQuaterlyData, getSoftwareYearlyData, otherSoftwareBillViewinDash, getServiceMonthData, getServiceQuarterlyData, getServiceYearlyData,
    otherServiceBillViewinDash, getbilltype } = require('./bill.service')
const logger = require('../../logger/logger');
module.exports = {


    BillInsert: (req, res) => {
        const body = req.body;
        BillInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Bill Added successfully",
                insertId: result.insertId,
            })
        })
    },
    AllBillView: (req, res) => {
        AllBillView((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    UpdateBill: (req, res) => {
        const body = req.body;
        UpdateBill(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Bill Updated successfully"
            })
        })
    },

    CheckInsetMonthlyOrNot: (req, res) => {
        const body = req.body;
        CheckInsetMonthlyOrNot(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,

                dataa: results
            });
        })
    },
    MonthlyTarrifInsert: (req, res) => {
        const body = req.body;

        MonthlyTarrifInsert(body, (err, result) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,

                message: " inserted successfully"
            })

        })
    },

    MonthlyTarrifView: (req, res) => {
        MonthlyTarrifView((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getMonthData: (req, res) => {
        const body = req.body;
        getMonthData(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                dataa: results
            });
        })
    },

    OtherBillinsert: (req, res) => {
        const body = req.body;
        OtherBillinsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Bill Added successfully",
                insertId: result.insertId,
            })
        })
    },
    OtherBillView: (req, res) => {
        OtherBillView((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    UpdateOtherBill: (req, res) => {
        const body = req.body;
        UpdateOtherBill(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Bill Updated successfully"
            })
        })
    },
    QuaterlyTarrifView: (req, res) => {
        QuaterlyTarrifView((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })

        })
    },
    CheckInsetQuaterlyOrNot: (req, res) => {
        const body = req.body;
        CheckInsetQuaterlyOrNot(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                dataa: results
            });
        })
    },

    QuaterlyTarrifInsert: (req, res) => {
        const body = req.body;

        QuaterlyTarrifInsert(body, (err, result) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,

                message: " inserted successfully"
            })

        })
    },
    getQuaterlyData: (req, res) => {
        const body = req.body;
        getQuaterlyData(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                dataa: results
            });
        })
    },
    YearlyTarrifView: (req, res) => {

        YearlyTarrifView((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })

        })
    },
    CheckInsetYearlyOrNot: (req, res) => {
        const body = req.body;
        CheckInsetYearlyOrNot(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                dataa: results
            });
        })
    },
    YearlyTarrifInsert: (req, res) => {
        const body = req.body;
        YearlyTarrifInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: " inserted successfully"
            })

        })
    },
    getYearData: (req, res) => {
        const body = req.body;
        getYearData(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                dataa: results
            });
        })
    },
    BillMonthlyUpdate: (req, res) => {
        const body = req.body;
        BillMonthlyUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"
                })
            }
            return res.status(200).json({
                success: 2,
                monthly_slno: results.monthly_slno,
                message: "Bill Added successfully"
            })
        })
    },
    BillQuaterlyUpdate: (req, res) => {
        const body = req.body;
        BillQuaterlyUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"
                })
            }
            return res.status(200).json({
                success: 2,
                quaterly_slno: results.quaterly_slno,
                message: "updated successfully"
            })
        })
    },
    BillYearlyUpdate: (req, res) => {
        const body = req.body;
        BillYearlyUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"
                })
            }
            return res.status(200).json({
                success: 2,
                message: "updated successfully"
            })
        })
    },
    OtherBillViewDash: (req, res) => {
        OtherBillViewDash((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getTeleMonthData: (req, res) => {
        const body = req.body;
        getTeleMonthData(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                dataa: results
            });
        })
    },
    getTeleQuarterlyData: (req, res) => {
        const body = req.body;
        getTeleQuarterlyData(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                dataa: results
            });
        })
    },
    getTeleYearlyData: (req, res) => {
        const body = req.body;
        getTeleYearlyData(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                dataa: results
            });
        })
    },
    otherTeleBillViewinDash: (req, res) => {
        otherTeleBillViewinDash((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getSoftwareMonthData: (req, res) => {
        const body = req.body;
        getSoftwareMonthData(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                dataa: results
            });
        })
    },
    getSoftwareQuaterlyData: (req, res) => {
        const body = req.body;
        getSoftwareQuaterlyData(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                dataa: results
            });
        })
    },
    getSoftwareYearlyData: (req, res) => {
        const body = req.body;
        getSoftwareYearlyData(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                dataa: results
            });
        })
    },
    otherSoftwareBillViewinDash: (req, res) => {
        otherSoftwareBillViewinDash((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getServiceMonthData: (req, res) => {
        const body = req.body;
        getServiceMonthData(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                dataa: results
            });
        })
    },
    getServiceQuarterlyData: (req, res) => {
        const body = req.body;
        getServiceQuarterlyData(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                dataa: results
            });
        })
    },
    getServiceYearlyData: (req, res) => {
        const body = req.body;
        getServiceYearlyData(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                dataa: results
            });
        })
    },
    otherServiceBillViewinDash: (req, res) => {
        otherServiceBillViewinDash((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    getbilltype: (req, res) => {
        const id = req.params.id;
        getbilltype(id, (err, results) => {
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


}
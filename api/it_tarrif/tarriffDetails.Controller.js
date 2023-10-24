const logger = require('../../logger/logger')
const { MonthlyTarrifView, MonthlyTarrifUpdate, QuaterlyTarrifView, YearlyTarrifView, BillMonthlyViewUpdate,
    BillMonthlyViewId, BillQuaterlyInsert, BillQuaterlyViewId, BillQuaterlyViewUpdate, BillYearlyInsert, BillYearlyViewId,
    BillYearlyViewUpdate, MonthlyPendingBillView, QuaterlyPendingBillView, YearlyPendingBillView,
    MonthlyTarrifInsert, QuaterlyTarrifInsert, YearlyTarrifInsert, CheckInsetQuaterlyOrNot, BillQuaterlyUpdate,
    CheckInsetMonthlyOrNot, BillMonthlyUpdate, CheckInsetYearlyOrNot, BillYearlyUpdate } = require('../it_tarrif/tarriffDetails.service')
module.exports = {

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
    MonthlyTarrifUpdate: (req, res) => {
        const body = req.body;
        MonthlyTarrifUpdate(body, (err, results) => {
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


    MonthlyTarrifInsert: (req, res) => {
        const body = req.body;

        var newList = body.map((val, index) => {
            return [val.device_slno, val.tarrif_amount, val.monthly_bill_generate]
        })

        const month = body.f
        MonthlyTarrifInsert(newList, (err, result) => {
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
                message: "updated successfully"
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
    YearlyTarrifInsert: (req, res) => {
        const body = req.body;

        var newList = body.map((val, index) => {
            return [val.device_slno, val.tarrif_amount, val.yearly_bill_generate]
        })

        const year = body.f
        YearlyTarrifInsert(newList, (err, result) => {
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


    QuaterlyTarrifInsert: (req, res) => {
        const body = req.body;

        var newList = body.map((val, index) => {
            return [val.device_slno, val.tarrif_amount, val.quaterly_bill_generate]
        })

        const quater = body.f
        QuaterlyTarrifInsert(newList, (err, result) => {
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
                message: "updated successfully"
            })
        })
    },




}
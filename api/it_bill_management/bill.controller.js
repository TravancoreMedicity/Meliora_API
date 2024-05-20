const { BillInsert, AllBillView, UpdateBill, MonthlyTarrifInsert, MonthlyTarrifView, OtherBillinsert, OtherBillView, UpdateOtherBill, QuaterlyTarrifView,
    QuaterlyTarrifInsert, YearlyTarrifView, YearlyTarrifInsert, BillMonthlyUpdate, BillQuaterlyUpdate, BillYearlyUpdate, OtherBillViewDash, otherTeleBillViewinDash,
    otherSoftwareBillViewinDash, otherServiceBillViewinDash, getbilltype, checkMonthlyInsert, getUnpaidMonthlyTeleBills, checkQuarterlyInsert, checkYearlyInsert,
    getUnpaidQuarterlyTeleBills, getUnpaidYearlyTeleBills, getUnpaidMonthlySoftBills, getUnpaidQuarterlySoftBills, getUnpaidYearlySoftBills, getUnpaidBillsServMonthly,
    getUnpaidBillsSerQuarter, getUnpaidBillsSerYear } = require('./bill.service')
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
    MonthlyTarrifInsert: (req, res) => {
        const body = req.body;
        const data = body?.map((val) => {
            return [val.bill_add_slno, val.monthly_bill_generate, val.create_user]
        })
        MonthlyTarrifInsert(data, (err, result) => {
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
    QuaterlyTarrifInsert: (req, res) => {
        const body = req.body;
        const data = body?.map((val) => {
            return [val.bill_add_slno, val.quaterly_bill_generate, val.create_user]
        })
        QuaterlyTarrifInsert(data, (err, result) => {
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
    YearlyTarrifInsert: (req, res) => {
        const body = req.body;
        const data = body?.map((val) => {
            return [val.bill_add_slno, val.yearly_bill_generate, val.create_user]
        })
        YearlyTarrifInsert(data, (err, result) => {
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
    checkMonthlyInsert: (req, res) => {
        const id = req.params.id;
        checkMonthlyInsert(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                dataa: results
            });
        })
    },
    checkYearlyInsert: (req, res) => {
        const id = req.params.id;
        checkYearlyInsert(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                dataa: results
            });
        })
    },
    getUnpaidMonthlyTeleBills: (req, res) => {
        getUnpaidMonthlyTeleBills((err, results) => {
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
    getUnpaidMonthlySoftBills: (req, res) => {
        getUnpaidMonthlySoftBills((err, results) => {
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
    getUnpaidQuarterlyTeleBills: (req, res) => {
        getUnpaidQuarterlyTeleBills((err, results) => {
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
    getUnpaidYearlyTeleBills: (req, res) => {
        getUnpaidYearlyTeleBills((err, results) => {
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
    checkQuarterlyInsert: (req, res) => {
        const id = req.params.id;
        checkQuarterlyInsert(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                dataa: results
            });
        })
    },
    getUnpaidQuarterlySoftBills: (req, res) => {
        getUnpaidQuarterlySoftBills((err, results) => {
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
    getUnpaidYearlySoftBills: (req, res) => {
        getUnpaidYearlySoftBills((err, results) => {
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
    getUnpaidBillsServMonthly: (req, res) => {
        getUnpaidBillsServMonthly((err, results) => {
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
    getUnpaidBillsSerQuarter: (req, res) => {
        getUnpaidBillsSerQuarter((err, results) => {
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
    getUnpaidBillsSerYear: (req, res) => {
        getUnpaidBillsSerYear((err, results) => {
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

}
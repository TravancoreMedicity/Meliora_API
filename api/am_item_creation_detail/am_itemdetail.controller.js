const logger = require('../../logger/logger')
const { checkDetailInsertOrNot, GRNDetailsInsert, GRNDetailsUpdate, BillDetailsInsert,
    BillDetailsUpdate, CustodianDetailsInsert, CustodianDetailsUpdate, DeviceDetailsInsert,
    DeviceDetailsUpdate, LeaseDetailsInsert, LeaseDetailsUpdate, WarentGarantInsertOrNot, WarentGraruntyInsert, WarentGraruntyUpdate,
    AmcPmInsertOrNot, AmcPmInsert, AmcPmUpdate
} = require('../am_item_creation_detail/am_itemdetail.service')
module.exports = {
    checkDetailInsertOrNot: (req, res) => {
        const id = req.params.id;
        checkDetailInsertOrNot(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    GRNDetailsInsert: (req, res) => {
        const body = req.body;
        GRNDetailsInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Custodian Department inserted successfully"
            })
        })

    },
    GRNDetailsUpdate: (req, res) => {
        const body = req.body;
        GRNDetailsUpdate(body, (err, results) => {
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
                message: "GRN Details Updated successfully"
            })
        })
    },

    BillDetailsInsert: (req, res) => {
        const body = req.body;
        BillDetailsInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Bill Details inserted successfully"
            })
        })

    },

    BillDetailsUpdate: (req, res) => {
        const body = req.body;
        BillDetailsUpdate(body, (err, results) => {
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
                message: "Bill Details Updated successfully"
            })
        })
    },

    CustodianDetailsInsert: (req, res) => {
        const body = req.body;
        CustodianDetailsInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Custodian Details inserted successfully"
            })
        })

    },
    CustodianDetailsUpdate: (req, res) => {
        const body = req.body;
        CustodianDetailsUpdate(body, (err, results) => {
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
                message: "Custodian Details Updated successfully"
            })
        })
    },

    DeviceDetailsInsert: (req, res) => {
        const body = req.body;
        DeviceDetailsInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Device Details inserted successfully"
            })
        })

    },
    DeviceDetailsUpdate: (req, res) => {
        const body = req.body;
        DeviceDetailsUpdate(body, (err, results) => {
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
                message: "Device Details Updated successfully"
            })
        })
    },

    LeaseDetailsInsert: (req, res) => {
        const body = req.body;
        LeaseDetailsInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Lease Details inserted successfully"
            })
        })

    },
    LeaseDetailsUpdate: (req, res) => {
        const body = req.body;
        LeaseDetailsUpdate(body, (err, results) => {
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
                message: "Lease Details Updated successfully"
            })
        })
    },

    WarentGarantInsertOrNot: (req, res) => {
        const id = req.params.id;
        WarentGarantInsertOrNot(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    WarentGraruntyInsert: (req, res) => {
        const body = req.body;
        WarentGraruntyInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Warrenty/Guaranty Details inserted successfully"
            })
        })

    },
    WarentGraruntyUpdate: (req, res) => {
        const body = req.body;
        WarentGraruntyUpdate(body, (err, results) => {
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
                message: "Warrenty/Guaranty Details Updated successfully"
            })
        })
    },

    AmcPmInsertOrNot: (req, res) => {
        const id = req.params.id;
        AmcPmInsertOrNot(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    AmcPmInsert: (req, res) => {
        const body = req.body;
        AmcPmInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "ACM/PM Details inserted successfully"
            })
        })

    },
    AmcPmUpdate: (req, res) => {
        const body = req.body;
        AmcPmUpdate(body, (err, results) => {
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
                message: "ACM/PM Details Updated successfully"
            })
        })
    },


}
const logger = require('../../logger/logger')
const { checkDetailInsertOrNot, GRNDetailsInsert, GRNDetailsUpdate, BillDetailsInsert,
    BillDetailsUpdate, CustodianDetailsInsert, CustodianDetailsUpdate, DeviceDetailsInsert,
    DeviceDetailsUpdate, LeaseDetailsInsert, LeaseDetailsUpdate, WarentGarantInsertOrNot, WarentGraruntyInsert, WarentGraruntyUpdate,
    AmcPmInsertOrNot, AmcPmInsert, AmcPmUpdate, checkDetailInsertOrNotSpare, WarentGarantInsertOrNotSpare,
    AmcPmInsertOrNotSpare, GRNDetailsInsertSpare, GRNDetailsUpdateSpare, BillDetailsInsertSpare,
    BillDetailsUpdateSpare, DeviceDetailsInsertSpare, DeviceDetailsUpdateSpare, LeaseDetailsInsertSpare,
    LeaseDetailsUpdateSpare, WarentGraruntyInsertSpare, WarentGraruntyUpdateSpare, AmcPmInsertSpare,
    AmcPmUpdateSpare, getdeptsecBsedonCustdept, getdeptsecBsedonCustdeptSpare, SpecificationInsertOrNot,
    SpecificationInsert, SepcifiDelete, GetFreespareList, SpareDetailsInsert, SpareDetailsInsertOrNot,
    SpareDelete
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
    checkDetailInsertOrNotSpare: (req, res) => {
        const id = req.params.id;
        checkDetailInsertOrNotSpare(id, (err, results) => {
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

    GRNDetailsInsertSpare: (req, res) => {
        const body = req.body;
        GRNDetailsInsertSpare(body, (err, result) => {
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
    GRNDetailsUpdateSpare: (req, res) => {
        const body = req.body;
        GRNDetailsUpdateSpare(body, (err, results) => {
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

    BillDetailsInsertSpare: (req, res) => {
        const body = req.body;
        BillDetailsInsertSpare(body, (err, result) => {
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

    BillDetailsUpdateSpare: (req, res) => {
        const body = req.body;
        BillDetailsUpdateSpare(body, (err, results) => {
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


    DeviceDetailsInsertSpare: (req, res) => {
        const body = req.body;
        DeviceDetailsInsertSpare(body, (err, result) => {
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
    DeviceDetailsUpdateSpare: (req, res) => {
        const body = req.body;
        DeviceDetailsUpdateSpare(body, (err, results) => {
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

    LeaseDetailsInsertSpare: (req, res) => {
        const body = req.body;
        LeaseDetailsInsertSpare(body, (err, result) => {
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
    LeaseDetailsUpdateSpare: (req, res) => {
        const body = req.body;
        LeaseDetailsUpdateSpare(body, (err, results) => {
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
    WarentGarantInsertOrNotSpare: (req, res) => {
        const id = req.params.id;
        WarentGarantInsertOrNotSpare(id, (err, results) => {
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

    WarentGraruntyInsertSpare: (req, res) => {
        const body = req.body;
        WarentGraruntyInsertSpare(body, (err, result) => {
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
    WarentGraruntyUpdateSpare: (req, res) => {
        const body = req.body;
        WarentGraruntyUpdateSpare(body, (err, results) => {
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
    AmcPmInsertOrNotSpare: (req, res) => {
        const id = req.params.id;
        AmcPmInsertOrNotSpare(id, (err, results) => {
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
    AmcPmInsertSpare: (req, res) => {
        const body = req.body;
        AmcPmInsertSpare(body, (err, result) => {
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
    AmcPmUpdateSpare: (req, res) => {
        const body = req.body;
        AmcPmUpdateSpare(body, (err, results) => {
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
    getdeptsecBsedonCustdept: (req, res) => {
        const id = req.params.id;
        getdeptsecBsedonCustdept(id, (err, results) => {
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

    getdeptsecBsedonCustdeptSpare: (req, res) => {
        const id = req.params.id;
        getdeptsecBsedonCustdeptSpare(id, (err, results) => {
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

    SpecificationInsertOrNot: (req, res) => {
        const id = req.params.id;
        SpecificationInsertOrNot(id, (err, results) => {
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
    SpecificationInsert: (req, res) => {
        const body = req.body;
        var newList = body.map((val, index) => {
            return [val.am_item_map_slno, val.specifications, val.status, val.create_user]
        })
        SpecificationInsert(newList, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            } return res.status(200).json({
                success: 1,
                message: "Specification inserted Successfully"
            });

        });
    },

    SepcifiDelete: (req, res) => {
        const body = req.body;
        SepcifiDelete(body, (err, results) => {
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
                    success: 2,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Item Removed successfully"
            });
        });
    },


    GetFreespareList: (req, res) => {
        const body = req.body
        GetFreespareList(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Record Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    SpareDetailsInsert: (req, res) => {
        const body = req.body;

        var newList = body.map((val, index) => {
            return [val.am_item_map_slno, val.am_spare_item_map_slno, val.spare_status, val.create_user]
        })

        SpareDetailsInsert(newList, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            } return res.status(200).json({
                success: 1,
                message: "Specification inserted Successfully"
            });

        });
    },

    SpareDetailsInsertOrNot: (req, res) => {
        const id = req.params.id;
        SpareDetailsInsertOrNot(id, (err, results) => {
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

    SpareDelete: (req, res) => {
        const body = req.body;
        SpareDelete(body, (err, results) => {
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
                    success: 2,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Item Removed successfully"
            });
        });
    },
}
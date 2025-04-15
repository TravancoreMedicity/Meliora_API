const { pool } = require('../../config/database');
const logger = require('../../logger/logger');

const { checkDetailInsertOrNot, GRNDetailsInsert, GRNDetailsUpdate, BillDetailsInsert,
    BillDetailsUpdate, CustodianDetailsInsert, CustodianDetailsUpdate, DeviceDetailsInsert,
    DeviceDetailsUpdate, LeaseDetailsInsert, LeaseDetailsUpdate, WarentGarantInsertOrNot, WarentGraruntyInsert, WarentGraruntyUpdate,
    AmcPmInsertOrNot, AmcPmInsert, AmcPmUpdate, checkDetailInsertOrNotSpare, WarentGarantInsertOrNotSpare,
    GRNDetailsInsertSpare, GRNDetailsUpdateSpare, BillDetailsInsertSpare,
    BillDetailsUpdateSpare, DeviceDetailsInsertSpare, DeviceDetailsUpdateSpare, LeaseDetailsInsertSpare,
    LeaseDetailsUpdateSpare, WarentGraruntyInsertSpare, WarentGraruntyUpdateSpare, getdeptsecBsedonCustdept,
    getdeptsecBsedonCustdeptSpare, SpecificationInsertOrNot,
    SpecificationInsert, SepcUpdate, GetFreespareList, SpareDetailsInsert, SpareDetailsInsertOrNot,
    SpareDelete, AmcCMCInsert, AmcCmcview, AmcCmcUpdate, AmcCmcviewSelect, BillMasterInsert,
    BillMasterview, BillMasterUpdate, BillMasterviewSelect, GetBillMasterById,
    GetAmcCmcMasterById, GetSupplierSelect, GetBillBySupplNDate, SupplierAdding, GetAMCBySupplNDate,
    GetCMCBySupplNDate, LeaseMasterInsert, LeaseMasterview, GetLeaseBySupplNDate,
    leaseMasterUpdate, AMLeaseDetailsUpdate, spareContamination, spareService, DeviceRackUpdateAsset,
    DeviceRackUpdateSpare, InsertAmcCmcLog, AmcCmcDetailList, amcCmcLogUpdate, PmInsert, InsertPMLog, PmUpdate, PmDetailsList, UpdatePmLog,
    InsertLeaseLog, LeaseDetailsList, UpdateLeaseLog, updateTransLog, spareRemoveFromAsset,
    InsertTransferMaster,
    InsertTransferDetails,
    UpdateAssetService, SpareCondm



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
            DeviceRackUpdateAsset(body, (err, results) => {
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
            DeviceRackUpdateSpare(body, (err, results) => {
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
    // WarentGarantInsertOrNot: (req, res) => {
    //     const id = req.params.id;
    //     WarentGarantInsertOrNot(id, (err, results) => {
    //         if (err) {
    //             logger.logwindow(err)
    //             return res.status(400).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         if (results.length === 0) {
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "No Record Found"
    //             });
    //         }

    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         });
    //     });
    // },
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
                message: "Warrenty/Guaranty Details inserted successfully",
                insertId: result.insertId,
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
                message: "Warrenty/Guaranty Details inserted successfully",
                insertId: result.insertId,
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

    AmcPmInsert: (req, res) => {
        const body = req.body;
        AmcPmInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            const postdata = {
                am_item_amc_cmc_slno: result.insertId,
                am_cmc_slno: body.amc_slno,
                am_amc_cmc_log_status: 1
            }
            InsertAmcCmcLog(postdata, (err, results) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: "ACM/PM Details inserted successfully",
                    insertId: result.insertId,
                })

            })
        })
    },
    PmInsert: (req, res) => {
        const body = req.body;
        PmInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            const postdata = {
                am_item_map_slno: body.am_item_map_slno,
                am_pm_fromdate: body.instalation_date,
                am_pm_dutedate: body.due_date,
                create_user: body.create_user,
                am_pm_log_status: 1
            }
            InsertPMLog(postdata, (err, results) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: "PM Details Added successfully",

                })

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
            const postdata = {
                am_item_amc_cmc_slno: body.am_item_amcpm_slno,
                am_cmc_slno: body.amc_slno,
                am_amc_cmc_log_status: 1
            }
            InsertAmcCmcLog(postdata, (err, results) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }

                return res.status(200).json({
                    success: 2,
                    message: "ACM/PM Details Updated successfully"
                })
            })
        })
    },
    PmUpdate: (req, res) => {
        const body = req.body;
        PmUpdate(body, (err, results) => {
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
            const postdata = {
                am_item_map_slno: body.am_item_map_slno,
                am_pm_fromdate: body.instalation_date,
                am_pm_dutedate: body.due_date,
                create_user: body.edit_user,
                am_pm_log_status: 1
            }
            InsertPMLog(postdata, (err, results) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }

                return res.status(200).json({
                    success: 2,
                    message: "PM Details Updated successfully",
                })

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
        SpecificationInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Specification inserted Successfully",
            })
        })
    },


    SepcUpdate: (req, res) => {
        const body = req.body;
        SepcUpdate(body, (err, results) => {
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


    AmcCMCInsert: (req, res) => {
        const body = req.body;
        //validate category Instert function

        AmcCMCInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                insertid: result.insertId,
                message: "AMC/CMC inserted successfully"
            })
        })
    },
    AmcCmcview: (req, res) => {

        AmcCmcview((err, results) => {
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

    AmcCmcUpdate: (req, res) => {
        const body = req.body;

        AmcCmcUpdate(body, (err, results) => {
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
                message: "AMC CMC Updated successfully"
            })
        })
    },

    AmcCmcviewSelect: (req, res) => {

        AmcCmcviewSelect((err, results) => {
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

    BillMasterInsert: (req, res) => {
        const body = req.body;
        //validate category Instert function

        BillMasterInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                insertid: result.insertId,
                message: "Bill inserted successfully"
            })
        })
    },
    BillMasterview: (req, res) => {

        BillMasterview((err, results) => {
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

    BillMasterUpdate: (req, res) => {
        const body = req.body;

        BillMasterUpdate(body, (err, results) => {
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

    BillMasterviewSelect: (req, res) => {

        BillMasterviewSelect((err, results) => {
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

    GetBillMasterById: (req, res) => {
        const id = req.params.id;
        GetBillMasterById(id, (err, results) => {
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

    GetAmcCmcMasterById: (req, res) => {
        const id = req.params.id;
        GetAmcCmcMasterById(id, (err, results) => {
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
    AmcCmcDetailList: (req, res) => {
        const id = req.params.id;
        AmcCmcDetailList(id, (err, results) => {
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
    PmDetailsList: (req, res) => {
        const id = req.params.id;
        PmDetailsList(id, (err, results) => {
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
    LeaseDetailsList: (req, res) => {
        const id = req.params.id;
        LeaseDetailsList(id, (err, results) => {
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

    GetSupplierSelect: (req, res) => {

        GetSupplierSelect((err, results) => {
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

    GetBillBySupplNDate: (req, res) => {
        const body = req.body
        GetBillBySupplNDate(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Record Found")
                return res.status(200).json({
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

    SupplierAdding: (req, res) => {
        const body = req.body;
        //validate category Instert function

        SupplierAdding(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                insertid: result.insertId,
                message: "Supplier inserted successfully"
            })
        })
    },

    GetAMCBySupplNDate: (req, res) => {
        const body = req.body
        GetAMCBySupplNDate(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Record Found")
                return res.status(200).json({
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
    GetCMCBySupplNDate: (req, res) => {
        const body = req.body
        GetCMCBySupplNDate(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Record Found")
                return res.status(200).json({
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
    LeaseMasterInsert: (req, res) => {
        const body = req.body;
        //validate category Instert function

        LeaseMasterInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                insertid: result.insertId,
                message: "Lease inserted successfully"
            })
        })
    },
    LeaseMasterview: (req, res) => {

        LeaseMasterview((err, results) => {
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

    leaseMasterUpdate: (req, res) => {
        const body = req.body;

        leaseMasterUpdate(body, (err, results) => {
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
                message: "Lease Updated successfully"
            })
        })
    },
    GetLeaseBySupplNDate: (req, res) => {
        const body = req.body
        GetLeaseBySupplNDate(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Record Found")
                return res.status(200).json({
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

    AMLeaseDetailsUpdate: (req, res) => {
        const body = req.body;
        AMLeaseDetailsUpdate(body, (err, results) => {
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
            const postdata = {
                am_item_map_slno: body.am_item_map_slno,
                am_lease_mast_slno: body.am_lease_mast_slno,
                am_lease_log_status: 1

            }
            InsertLeaseLog(postdata, (err, results) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }

                return res.status(200).json({
                    success: 2,
                    message: "Lease Details Updated successfully",

                })

            })
        })
    },
    amcCmcLogUpdate: (req, res) => {
        const body = req.body;
        amcCmcLogUpdate(body, (err, results) => {
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
                message: "Amc/Cmc Detail Deleted"
            })
        })
    },

    UpdatePmLog: (req, res) => {
        const body = req.body;
        UpdatePmLog(body, (err, results) => {
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
                message: "PM Detail Deleted"
            })
        })
    },
    UpdateLeaseLog: (req, res) => {
        const body = req.body;
        UpdateLeaseLog(body, (err, results) => {
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
                message: "Lease Detail Deleted"
            })
        })
    },


    spareContamination: (req, res) => {
        const body = req.body;
        SpareCondm(body, (err, results) => {
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
            spareContamination(body, (err, results) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    })
                }
                if (results === 0) {
                    return res.status(200).json({
                        success: 2,
                        message: "No record found"

                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Spare transfer condaminatiobn list successfully"
                })
            })
        });
    },
    spareService: (req, res) => {
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
            spareService(body, (err, results) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    })
                }
                if (results === 0) {
                    return res.status(200).json({
                        success: 2,
                        message: "No record found"

                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Spare transfer to service list successfully"
                })
            })
        });
    },

    spareRemoveFromAsset: (req, res) => {
        const body = req.body;
        spareRemoveFromAsset(body, (err, results) => {
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
                message: "Spare Removed From Asset And Add Back to Stock successfully"
            })
        })
    },

    AssetService: async (req, res) => {
        const body = req.body;
        try {
            const masterData = {
                transfrd_dept: body.item_dept_slno || null,
                transfrd_dept_sec: body.item_deptsec_slno || null,
                transfrd_room: body.item_room_slno || null,
                transfrd_sub_room: body.item_subroom_slno || null,
                transfrd_employee: body.transfer_user || null,
                transfrd_date: new Date(),
                transfrd_type: body.am_custodian_trans_status || null,
                transfrd_from_dept: body.am_trans_from_dept || null,
                transfrd_from_dept_sec: body.am_trans_from_dept_sec || null,
                transfrd_from_room: body.am_trans_from_room || null,
                transfrd_from_sub_room: body.am_trans_from_subroom || null,
            };
            const masterId = await InsertTransferMaster(masterData);
            const detailData = {
                asset_item_map_slno: body.am_item_map_slno,
                transfr_mast_slno: masterId,
            };
            await InsertTransferDetails(detailData);
            const updatePromise = UpdateAssetService({
                asset_item_service: 1,
                asset_item_service_user: body.asset_item_service_user || null,
                item_dept_slno: body.item_dept_slno || null,
                item_deptsec_slno: body.item_deptsec_slno || null,
                am_item_map_slno: body.am_item_map_slno || null,
            });

            await updatePromise;

            return res.status(200).json({
                success: 2,
                message: "Asset Added To Service List",
            });
        } catch (err) {
            return res.status(500).json({
                success: 0,
                message: err.message || "Internal Server Error",
            });
        }
    }

}
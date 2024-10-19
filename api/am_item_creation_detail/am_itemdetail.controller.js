const logger = require('../../logger/logger')
const { checkDetailInsertOrNot, GRNDetailsInsert, GRNDetailsUpdate, BillDetailsInsert,
    BillDetailsUpdate, CustodianDetailsInsert, CustodianDetailsUpdate, DeviceDetailsInsert,
    DeviceDetailsUpdate, LeaseDetailsInsert, LeaseDetailsUpdate, WarentGarantInsertOrNot, WarentGraruntyInsert, WarentGraruntyUpdate,
    AmcPmInsertOrNot, AmcPmInsert, AmcPmUpdate, checkDetailInsertOrNotSpare, WarentGarantInsertOrNotSpare,
    GRNDetailsInsertSpare, GRNDetailsUpdateSpare, BillDetailsInsertSpare,
    BillDetailsUpdateSpare, DeviceDetailsInsertSpare, DeviceDetailsUpdateSpare, LeaseDetailsInsertSpare,
    LeaseDetailsUpdateSpare, WarentGraruntyInsertSpare, WarentGraruntyUpdateSpare, getdeptsecBsedonCustdept,
    getdeptsecBsedonCustdeptSpare, SpecificationInsertOrNot,
    SpecificationInsert, SepcifiDelete, GetFreespareList, SpareDetailsInsert, SpareDetailsInsertOrNot,
    SpareDelete, AmcCMCInsert, AmcCmcview, AmcCmcUpdate, AmcCmcviewSelect, BillMasterInsert,
    BillMasterview, BillMasterUpdate, BillMasterviewSelect, GetBillMasterById,
    GetAmcCmcMasterById, GetSupplierSelect, GetBillBySupplNDate, SupplierAdding, GetAMCBySupplNDate,
    GetCMCBySupplNDate, LeaseMasterInsert, LeaseMasterview, GetLeaseBySupplNDate,
    leaseMasterUpdate, AMLeaseDetailsUpdate, spareContamination, spareService, DeviceRackUpdateAsset,
    DeviceRackUpdateSpare, AssetService

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

        console.log("body", body);


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
            return res.status(200).json({
                success: 2,
                message: "Lease Details Updated successfully"
            })
        })
    },

    spareContamination: (req, res) => {
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

    AssetService: (req, res) => {
        const body = req.body;
        AssetService(body, (err, results) => {
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
                message: "Asset Transfered to service List"
            })
        })
    },



}
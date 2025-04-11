const { getPurchaseAckPending, getAllApprovedForPurchase, InsertPurchaseAck, QuatationCalling, QuatationNegotiation,
    QuatationFixing, updatePOAdd, InsertMultiplePO, getPOList, PoComplete, PoFinals, PurchsDataCollectionPending,
    getCRSStores, InsertPOItems, getPOItemDetails, getPendingPOItemDetails, CheckCRfPurchaseExist, getPendingPo, InsertWorkOrderDetails,
    updatePoApprovals, CheckPOExist, getSubstores, getPoDetails, updateApprvdPOItems, updatePurchaseAck, updateCRFPOComplte, InsertWorkOrder
} = require('../crm_new_purchase/crm_purchase.service');
const logger = require('../../logger/logger');

module.exports = {
    getPurchaseAckPending: (req, res) => {
        getPurchaseAckPending((err, results) => {
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


    getAllApprovedForPurchase: (req, res) => {
        getAllApprovedForPurchase((err, results) => {
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

    InsertPurchaseAck: (req, res) => {
        const body = req.body;
        const { req_slno, ack_status, ack_remarks, create_user } = body;
        CheckCRfPurchaseExist(req_slno, (err, checkResults) => {
            if (err) {
                logger.logwindow(err);
                return res.status(200).json({
                    success: 0,
                    message: "Internal Server Error",
                });
            }
            if (checkResults && checkResults.length > 0) {
                const { crm_purchase_slno } = checkResults[0];
                const updateAck = {
                    crm_purchase_slno: crm_purchase_slno,
                    req_slno: req_slno,
                    ack_status: ack_status,
                    ack_remarks: ack_remarks,
                    create_user: create_user
                }
                updatePurchaseAck(updateAck, (err, updateResults) => {
                    if (err) {
                        logger.logwindow(err);
                        return res.status(200).json({
                            success: 0,
                            message: "Internal Server Error",
                        });
                    }
                    if (!updateResults) {
                        logger.infologwindow("Record Not Found");
                        return res.status(200).json({
                            success: 2,
                            message: "Record Not Found",
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Acknowledged Successfully",
                    });
                });
            } else {
                InsertPurchaseAck(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Acknowledged Successfully",
                    });
                });
            }
        })
    },
    QuatationCalling: (req, res) => {
        const body = req.body;
        QuatationCalling(body, (err, results) => {
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
                message: "Quotation Calling updated successfully"
            });
        });
    },

    QuatationNegotiation: (req, res) => {
        const body = req.body;
        QuatationNegotiation(body, (err, results) => {
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
                message: "Quotation Negotiation updated successfully"
            });
        });
    },
    QuatationFixing: (req, res) => {
        const body = req.body;
        QuatationFixing(body, (err, results) => {
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
                message: "Quotation Fixing Updated successfully"
            });
        });
    },

    InsertMultiplePO: (req, res) => {
        const body = req.body;
        // const no = body.find((value) => value.req_slno);
        const { crm_purchase_slno } = body[0]
        updatePOAdd(crm_purchase_slno, async (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (result) {
                try {
                    const promises = body.map((val) => {
                        return new Promise((resolve, reject) => {
                            InsertMultiplePO(val, (err, results) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    const insert_id = results.insertId;
                                    const create_user = val.create_user;
                                    const crm_purchase_slno = val.crm_purchase_slno;
                                    const items = val.items;
                                    const itemData = items?.map((value) => [
                                        insert_id, value.item_code, value.item_name, value.item_qty,
                                        value.item_rate, value.item_mrp, value.tax, value.tax_amount,
                                        create_user, value.net_amount, value.grn_qnty, crm_purchase_slno
                                    ]);

                                    InsertPOItems(itemData, (err, result) => {
                                        if (err) {
                                            reject(err);
                                        } else {
                                            resolve();
                                        }
                                    });
                                }
                            });
                        });
                    });
                    await Promise.all(promises);
                    return res.status(200).json({
                        success: 1,
                        message: "PO inserted successfully"
                    });

                } catch (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
            }
        });
    },

    PoComplete: (req, res) => {
        const body = req.body;
        if (!body || !body.items || body.items.length === 0) {
            logger.infologwindow("Invalid request body or empty items array");
            return res.status(200).json({
                success: 0,
                message: "Invalid request data",
            });
        }
        PoComplete(body, (err, results) => {
            if (err) {
                logger.logwindow("Error in PoComplete query:", err);
                return res.status(200).json({
                    success: 0,
                    message: "Database error occurred while processing PO",
                });
            }
            if (!results || results.affectedRows === 0) {
                logger.infologwindow("No rows affected in crm_purchase_mast");
                return res.status(200).json({
                    success: 2,
                    message: "Record not found in crm_purchase_mast",
                });
            }
            const { items, poList } = body;
            if (poList && poList.length > 0) {
                const pos = poList?.map((val) => ({
                    po_detail_slno: val.po_detail_slno,
                    req_slno: val.req_slno,
                }));
                logger.infologwindow("Processing PO Status Updation:", pos);
                updateCRFPOComplte(pos)
                    .then((result) => {
                        logger.infologwindow("PO status updated successfully:", result);
                    })
                    .catch((err) => {
                        logger.logwindow("Error in updateCRFPOComplte:", err);
                    });
            }

            if (items && items.length > 0) {
                const poitems = items?.map((val) => ({
                    req_detl_slno: val.req_detl_slno,
                    req_slno: val.req_slno,
                }));
                logger.infologwindow("Processing PO items:", poitems);

                updateApprvdPOItems(poitems)
                    .then((result) => {
                        logger.infologwindow("PO items updated successfully:", result);
                    })
                    .catch((err) => {
                        logger.logwindow("Error in updateApprvdPOItems:", err);
                    });
            }
            return res.status(200).json({
                success: 1,
                message: "PO Process Updated",
            });
        });
    },

    PoFinals: (req, res) => {
        const body = req.body;
        PoFinals(body, (err, results) => {
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
                message: "PO Moved to Supplier"
            });
        });
    },

    getSubstores: (req, res) => {
        const id = req.params.id
        getSubstores(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    PurchsDataCollectionPending: (req, res) => {
        PurchsDataCollectionPending((err, results) => {
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

    getCRSStores: (req, res) => {
        getCRSStores((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 1,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        });
    },

    CheckPOExist: (req, res) => {
        const body = req.body;
        CheckPOExist(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
                message: "Exist"
            })
        })
    },

    getPOItemDetails: (req, res) => {
        const id = req.params.id;
        getPOItemDetails(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
            })
        })
    },

    getPendingPo: (req, res) => {
        getPendingPo((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No record found"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
            })
        })
    },

    getPendingPOItemDetails: (req, res) => {
        getPendingPOItemDetails((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

    updatePoApprovals: async (req, res) => {
        const body = req.body;
        updatePoApprovals(body).then(results => {
            return res.status(200).json({
                success: 1,
                message: "Updated"
            });
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: "Error Occured"
            });
        })
    },

    getPoDetails: (req, res) => {
        const id = req.params.id
        getPoDetails(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
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

    // report
    getPOList: (req, res) => {
        const id = req.params.id
        getPOList(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
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
    // InsertWorkOrder: (req, res) => {
    //     const body = req.body;
    //     InsertWorkOrder(body, (err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             })
    //         }
    //         if (results.length === 0) {
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "No record found"

    //             })
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: results,
    //             message: "Updated successfully"
    //         })
    //     })
    // },


    InsertWorkOrder: (req, res) => {
        const body = req.body;

        InsertWorkOrder(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No record found"
                });
            }
            InsertWorkOrderDetails(body, (err2, results2) => {
                if (err2) {
                    return res.status(200).json({
                        success: 0,
                        message: "WorkOrder inserted, but failed to insert details: " + err2
                    });
                }

                return res.status(200).json({
                    success: 1,
                    data: {
                        workOrder: results,
                        workOrderDetails: results2
                    },
                    message: "Work order and details inserted successfully"
                });
            });
        });
    }

}


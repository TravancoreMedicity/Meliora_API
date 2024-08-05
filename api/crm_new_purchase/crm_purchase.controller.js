const { getPurchaseAckPending, getAllApprovedForPurchase, InsertPurchaseAck, QuatationCalling,
    QuatationNegotiation, QuatationFixing, InsertinglePO, updatePOAdd, InsertMultiplePO, getPOList,
    PoComplete, PoFinals, getAllApprovedForStore, storedataUpdate, getSubstores, getMainStore, storeReciverdataUpdate,
    getPOListSubStorewise, SubstoreReciverdataUpdate, PurchsDataCollectionPending, getCRSStores,
    InsertPOItems, getOPItemDetails, getPendingPo
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

        InsertPurchaseAck(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Acknowledged Succesffully",
            });
        });
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

    InsertinglePO: (req, res) => {
        const body = req.body;
        InsertinglePO(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            updatePOAdd(body, (err, result) => {
                if (err) {
                    // logger.logwindow(err)
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
                if (!results) {
                    return res.status(400).json({
                        success: 2,
                        message: "Record Not Found"
                    })
                }
            });
            return res.status(200).json({
                success: 1,
                message: "PO Inserted Successfully",
            });
        });

    },

    InsertMultiplePO: (req, res) => {
        const body = req.body;
        const no = body.find((value) => value.req_slno);

        updatePOAdd(no, async (err, result) => {
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
                                    const items = val.items;
                                    const itemData = items.map((value) => [
                                        insert_id, value.item_code, value.item_name, value.item_qty,
                                        value.item_rate, value.item_mrp, value.tax, value.tax_amount, create_user
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

    PoComplete: (req, res) => {
        const body = req.body;

        PoComplete(body, (err, results) => {
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
                message: "PO Process Updated"
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
                message: "PO Enetering Complete updated successfully"
            });
        });
    },
    getAllApprovedForStore: (req, res) => {
        getAllApprovedForStore((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
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

    storedataUpdate: (req, res) => {
        const body = req.body;

        storedataUpdate(body, (err, results) => {
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
                message: "PO Enetering Complete updated successfully"
            });
        });
    },

    getSubstores: (req, res) => {
        getSubstores((err, results) => {
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

    getMainStore: (req, res) => {
        const id = req.params.id
        getMainStore(id, (err, results) => {
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
    storeReciverdataUpdate: (req, res) => {
        const body = req.body;

        storeReciverdataUpdate(body, (err, results) => {
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
                message: "PO Enetering Complete updated successfully"
            });
        });
    },

    getPOListSubStorewise: (req, res) => {
        const id = req.params.id
        getPOListSubStorewise(id, (err, results) => {
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

    SubstoreReciverdataUpdate: (req, res) => {
        const body = req.body;

        SubstoreReciverdataUpdate(body, (err, results) => {
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
                message: "PO Enetering Complete updated successfully"
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

    // CheckPOExist: (req, res) => {
    //     const body = req.body;
    //     CheckPOExist(body, (err, results) => {
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
    //             message: "Exist"
    //         })
    //     })
    // },
    getOPItemDetails: (req, res) => {
        const id = req.params.id;
        getOPItemDetails(id, (err, results) => {
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
}


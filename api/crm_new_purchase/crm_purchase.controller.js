const { getAllApprovedForPurchase, InsertPurchaseAck, QuatationCalling,
    QuatationNegotiation, QuatationFixing, InsertinglePO, updatePOAdd,
    InsertMultiplePO, getPOList, PoComplete, PoFinals, getAllApprovedForStore,
    storedataUpdate, getSubstores, getMainStore, storeReciverdataUpdate,
    getPOListSubStorewise, SubstoreReciverdataUpdate
} = require('../crm_new_purchase/crm_purchase.service');

const logger = require('../../logger/logger');

module.exports = {


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
                message: "Quatation Calling updated successfully"
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
                message: "Quatation Negotation updated successfully"
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
                message: "Quatation Fixing Updated successfully"
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
        var a1 = body.map((value, index) => {
            return [value.req_slno, value.po_number, value.po_date, value.po_status,
            value.supply_store, value.expected_delivery, value.create_user

            ]
        })
        var no = body.find((val) => {
            return val.req_slno
        })

        InsertMultiplePO(a1, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {

                const insertdata = {
                    req_slno: no.req_slno
                }
                updatePOAdd(insertdata, (err, result) => {
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
                    message: "Multiple PO inserted Successfully",
                });

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
                message: "PO Enetering Complete updated successfully"
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
}


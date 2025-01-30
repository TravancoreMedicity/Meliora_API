const { insertDeliveryMarking, InsertDeliveredPO, InsertDeliveredItems, getItemDetails, checkPOExist, getMaxCheckNo,
    updateDeliveredItemQty, updatePOStatus, getSupplier, getAllDeliveredDetails, InsertCheckedItems,
    getPendingPoSup, viewItemChecking, getSupplierDetailsForItemChecking
} = require('./delivery_marking.service');

const logger = require('../../logger/logger');

module.exports = {

    insertDeliveryMarking: (req, res) => {
        const body = req.body;
        insertDeliveryMarking(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Delivery Marked",
                insert_id: result.insertId
            });

        })
    },

    // InsertDeliveredPO: (req, res) => {
    //     const body = req.body;
    //     try {
    //         const promises = body.map((val) => {
    //             return new Promise((resolve, reject) => {
    //                 InsertDeliveredPO(val, async (err, results) => {
    //                     if (err) {
    //                         reject(err);
    //                     } else {
    //                         const insert_id = results.insertId;
    //                         const create_user = val.create_user;
    //                         const items = val.items;
    //                         const itemData = items.map((value) => [
    //                             insert_id, value.item_code, value.item_name, value.item_qty,
    //                             value.item_rate, value.item_mrp, value.tax, value.tax_amount,
    //                             create_user, value.net_amount, value.grn_qnty
    //                         ]);

    //                         InsertPOItems(itemData, (err, result) => {
    //                             if (err) {
    //                                 reject(err);
    //                             } else {
    //                                 resolve();
    //                             }
    //                         });
    //                     }
    //                 });
    //             });
    //         });
    //         await Promise.all(promises);
    //         return res.status(200).json({
    //             success: 1,
    //             message: "PO inserted successfully"
    //         });

    //     } catch (err) {
    //         return res.status(200).json({
    //             success: 0,
    //             message: err
    //         });
    //     }


    // },

    InsertDeliveredPO: async (req, res) => {
        const body = req.body;
        try {
            const promises = body.map(async (val) => {
                const insertResults = await new Promise((resolve, reject) => {
                    InsertDeliveredPO(val, (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(results);
                        }
                    });
                });
                const insert_id = insertResults.insertId;
                const create_user = val.create_user;
                const items = val.items;
                const itemData = items.map((value) => [
                    insert_id, value.item_code, value.item_name, value.item_qty,
                    value.item_rate, value.item_mrp, value.received_qty, value.item_status, create_user
                ]);
                await new Promise((resolve, reject) => {
                    InsertDeliveredItems(itemData, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
            });
            await Promise.all(promises);
            return res.status(200).json({
                success: 1,
                message: "Delivery Details Marked"
            });

        } catch (err) {
            return res.status(500).json({
                success: 0,
                message: `Error inserting PO: ${err.message || err}`
            });
        }
    },

    // checkDeliveryExist: (req, res) => {
    //     const id = req.params.id
    //     checkDeliveryExist(id, (err, results) => {
    //         if (err) {
    //             return res.status(400).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         if (results.length === 0) {
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "No Results Found"
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         });
    //     });
    // },

    checkPOExist: (req, res) => {
        const id = req.params.id
        checkPOExist(id, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
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

    getItemDetails: (req, res) => {
        const id = req.params.id
        getItemDetails(id, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
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

    updateDeliveredItemQty: async (req, res) => {
        const body = req.body;
        updateDeliveredItemQty(body).then(results => {
            return res.status(200).json({
                success: 1,
                message: " Item Sup Qty Updated"
            });
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: "Error Occured"
            });
        })
    },

    updatePOStatus: async (req, res) => {
        const body = req.body;
        updatePOStatus(body).then(results => {
            return res.status(200).json({
                success: 1,
                message: "PO Status Updated"
            });
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: "Error Occured"
            });
        })
    },

    getSupplier: (req, res) => {
        getSupplier((err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
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

    getAllDeliveredDetails: (req, res) => {
        const body = req.body;
        getAllDeliveredDetails(body, (err, results) => {
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


    getSupplierDetailsForItemChecking: (req, res) => {
        getSupplierDetailsForItemChecking((err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
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
    viewItemChecking: (req, res) => {
        const body = req.body;
        viewItemChecking(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
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

    InsertCheckedItems: (req, res) => {
        const body = req.body;
        getMaxCheckNo((err, results) => {
            if (err) {
                logger.logwindow(err);
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            let no;
            if (results.length === 0) {
                no = 1;
            } else {
                const checkno = JSON.parse(JSON.stringify(results[0]));
                no = checkno.checking_slno === undefined ? 1 : checkno.checking_slno + 1;
            }
            const itemData = body?.map((value) => [
                no,
                value.supplier_code,
                value.item_code,
                value.item_name,
                value.pending_qty,
                value.create_user,
                value.delivered_qty,
                value.excess_qty,
                value.pending_status,
                value.damage_qty,
                value.remarks,
                value.balance_qty,
                value.checking_user,
                value.requested_qty,
                value.item_slno
            ]);

            InsertCheckedItems(itemData, (err, result) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
                if (result) {
                    const updateQty = body?.map((val) => {
                        const received = val.excess_qty === 0 ? (val.requested_qty - val.balance_qty) : (val.requested_qty + val.excess_qty)
                        let item_status;
                        if (received === 0) {
                            // supplied qty 0
                            item_status = null;
                        } else if (received < val.requested_qty) {
                            // partially supplied
                            item_status = 0;
                        } else if (received >= val.requested_qty) {
                            // fully supplied
                            item_status = 1;
                        }
                        return {
                            received_qty: received,
                            item_status: item_status,
                            edit_user: val.create_user,
                            item_slno: val.item_slno,
                            marking_po_slno: val.marking_po_slno
                        }
                    })

                    const poStatusArray = updateQty.reduce((acc, curr) => {
                        if (!acc[curr.marking_po_slno]) {
                            acc[curr.marking_po_slno] = { marking_po_slno: curr.marking_po_slno, item_statuses: [] };
                        }
                        acc[curr.marking_po_slno].item_statuses.push(curr.item_status);
                        return acc;
                    }, {});
                    const poStatusResult = Object.values(poStatusArray).map(val => {
                        const allNull = val.item_statuses.every(status => status === null);
                        const allOne = val.item_statuses.every(status => status === 1);
                        let po_status;
                        // () po_status = 1; means not received or partilly received)
                        if (allNull) {
                            po_status = 1;
                        } else if (allOne) {
                            //   po_status = 0  means all items received
                            po_status = 0;
                        } else {
                            po_status = 1;
                        }
                        return {
                            po_status: po_status,
                            edit_user: val.edit_user,
                            marking_po_slno: val.marking_po_slno,
                        };
                    });
                    updateDeliveredItemQty(updateQty).then(resultItems => {
                        if (resultItems) {
                            updatePOStatus(poStatusResult).then(results => {
                                return res.status(200).json({
                                    success: 1,
                                    message: "Item Details Checked"
                                });
                            }).catch(err => {
                                return res.status(200).json({
                                    success: 0,
                                    message: "Error Occured"
                                });
                            })
                        }
                    }).catch(err => {
                        return res.status(200).json({
                            success: 0,
                            message: "Error Occured"
                        });
                    })
                }
                else {
                    return res.status(200).json({
                        success: 1,
                        message: "Item Details Checked"
                    });
                }
            });
        });
    },

    getPendingPoSup: (req, res) => {
        const id = req.params.id
        getPendingPoSup(id, (err, results) => {
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
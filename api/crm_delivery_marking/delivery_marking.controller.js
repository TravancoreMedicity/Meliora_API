const { insertDeliveryMarking, InsertDeliveredPO, InsertDeliveredItems, getItemDetails, checkPOExist, getMaxCheckNo,
    updateDeliveredItemQty, updatePOStatus, getSupplier, getAllDeliveredDetails, getAllPoDetails, InsertCheckedItems,
    getPendingPoSup
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
                    value.item_rate, value.item_mrp, value.received_qty, create_user
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

    getAllPoDetails: (req, res) => {
        const id = req.params.id
        getAllPoDetails(id, (err, results) => {
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

            // checking_slno,supplier_code,item_code,item_name,pending_qty,create_user,delivered_qty,
            // excess_qty,pending_status,damage_qty,remarks
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
                value.balance_qty
            ]);

            InsertCheckedItems(itemData, (err, result) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Item Details Checked"
                });
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
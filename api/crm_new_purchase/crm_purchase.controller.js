const { getPurchaseAckPending, getAllApprovedForPurchase, InsertPurchaseAck, QuatationCalling, QuatationNegotiation,
    QuatationFixing, updatePOAdd, InsertMultiplePO, getPOList, PoComplete, PoFinals, PurchsDataCollectionPending,
    getCRSStores, InsertPOItems, getPOItemDetails, getPendingPOItemDetails, CheckCRfPurchaseExist, getPendingPo,
    updatePoApprovals, CheckPOExist, getSubstores, getPoDetails, updateApprvdPOItems, updatePurchaseAck, updateCRFPOComplte
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


    // PoComplete: (req, res) => {
    //     const body = req.body;
    //     PoComplete(body, (err, results) => {
    //         if (err) {
    //             logger.logwindow(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         if (!results) {
    //             logger.infologwindow("Record Not Found")
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "Record Not Found"
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             message: "PO Process Updated"
    //         });
    //     });
    // },

    // PoComplete: (req, res) => {
    //     const body = req.body;
    //     if (!body || !body.items || body.items.length === 0) {
    //         logger.infologwindow("Invalid request body or empty items array");
    //         return res.status(200).json({
    //             success: 0,
    //             message: "Invalid request data",
    //         });
    //     }
    //     PoComplete(body, (err, results) => {
    //         if (err) {
    //             logger.logwindow("Error in PoComplete query:", err);
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: "Database error occurred while processing PO",
    //             });
    //         }
    //         if (!results || results.affectedRows === 0) {
    //             logger.infologwindow("No rows affected in crm_purchase_mast");
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "Record not found in crm_purchase_mast",
    //             });
    //         }
    //         const { items, poList } = body;
    //         const pos = poList?.map((val) => [val.po_detail_slno, val.req_slno]);
    //         logger.infologwindow("Processing PO Status Updation:", pos);

    //         updateCRFPOComplte(pos)
    //             .then((result) => {
    //                 logger.infologwindow("PO status updated successfully:", result);
    //                 return res.status(200).json({
    //                     success: 1,
    //                     message: "PO Process Updated",
    //                 });
    //             })
    //             .catch((err) => {
    //                 logger.logwindow("Error in updateCRFPOComplte:", err);
    //                 return res.status(200).json({
    //                     success: 0,
    //                     message: "Error updating PO status",
    //                 });
    //             });


    //         const poitems = items?.map((val) => ({
    //             req_detl_slno: val.req_detl_slno,
    //             req_slno: val.req_slno,
    //         }));
    //         logger.infologwindow("Processing PO items:", poitems);



    //         updateApprvdPOItems(poitems)
    //             .then((result) => {
    //                 logger.infologwindow("PO items updated successfully:", result);
    //                 return res.status(200).json({
    //                     success: 1,
    //                     message: "PO Process Updated",
    //                 });
    //             })
    //             .catch((err) => {
    //                 logger.logwindow("Error in updateApprvdPOItems:", err);
    //                 return res.status(200).json({
    //                     success: 0,
    //                     message: "Error updating PO items",
    //                 });
    //             });
    //     });
    // },

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



    // getPurchaseDeptCRfDetails: (req, res) => {
    //     const { level, from, to } = req.body;
    //     const sqlArray = [
    //         // DMS
    //         {
    //             val: 1, name: 'ackPending', sql: `AND ack_status is null`
    //         },
    //     ]
    //     const filterSql = sqlArray.find(e => e.val === level)?.sql || '';

    //     const sql = `
    //          SELECT
    //                 crm_request_master.req_slno,crm_request_master.actual_requirement,crm_request_master.needed,
    //                 R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
    //                 crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
    //                 crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
    //                 rm_ndrf,category,image_status,emergency_flag,emer_slno,crm_request_master.create_date,
    //                 total_approx_cost,user_deptsec,req_status,req_approv_slno,TD.dept_id, TD.dept_name,TD.dept_type,
    //                 ack_status, ack_remarks, quatation_calling_status, quatation_calling_remarks, quatation_calling_user,
    //                 quatation_calling_date, quatation_negotiation, quatation_negotiation_remarks, quatation_negotiation_user,
    //                 quatation_negotiation_date, quatation_fixing, quatation_fixing_remarks, quatation_fixing_user,
    //                 quatation_fixing_date, po_prepartion, po_complete,po_complete_date,approval_level,
    //                 crm_purchase_po_details.po_to_supplier,po_to_supplier_date,crm_request_master.sub_store_recieve,
    //                 crm_purchase_po_details.store_recieve,sub_store_name, sub_store_slno,po_number
    //             FROM
    //                 crm_request_master
    //                 LEFT JOIN crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
    //                 LEFT JOIN crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
    //                 LEFT JOIN co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
    //                 LEFT JOIN co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec                 
    //                 LEFT JOIN co_employee_master CR on CR.em_id=crm_request_master.create_user
    //                 LEFT JOIN co_department_mast TD on TD.dept_id=R.dept_id
    //                 LEFT JOIN crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
    //                 LEFT JOIN crm_purchase_po_details on crm_purchase_po_details.req_slno=crm_request_master.req_slno
    //                 LEFT JOIN crm_store_master ON crm_store_master.crm_store_master_slno=crm_purchase_po_details.sub_store_slno 
    //           WHERE
    //                 ed_approve=1 and md_approve=1 and user_acknldge is null ${filterSql}
    //             GROUP BY crm_request_master.req_slno
    //             ORDER BY crm_request_master.req_slno DESC`
    //     const queryParams = level === 8 || 17 ? [from, to] : [];
    //     getPurchaseDeptCRfDetails(sql, queryParams, (err, results) => {
    //         if (err) {
    //             return res.status(500).json({
    //                 success: 2,
    //                 message: err.message
    //             });
    //         }
    //         if (!results || results.length === 0) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: "No results found"
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         });
    //     });
    // },


}


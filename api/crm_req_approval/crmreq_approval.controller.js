const { getItemListApproval, InactiveItemDetail, updateInchargeApproval, updateReqMstHold,
    updateReqMstApproved, updateReqMstReject, InchargeApproveDetail, DetailApprvInsert,
    DetailOldItemInactive, updateCrfClose, updateMasterCrfClose, updateHODApproval, updateDMSApproval,
    updateMSApproval, updateMOApproval, updateSMOApproval, updateGMApproval, updateMDApproval, updateEDApproval,
    CrfDeptDataCollectInsert, DataCollectComplete, getDataCollectList, CrfDataCollactnSave, getAllForPdfView,
    getFinalItemListApproval, getMaxItemSlno, AddMoreItemsDetails, updateUserAck, DetailItemReject, DetailItemOnHold,
    getStoreReceiveStatus, updateUserReply, CheckCRfExist, inchargeItemOnholdRejectUpdate, getItemStatus,
    hodItemOnholdRejectUpdate, dmsItemOnholdRejectUpdate, msItemOnholdRejectUpdate, moItemOnholdRejectUpdate,
    smoItemOnholdRejectUpdate, gmItemOnholdRejectUpdate, mdItemOnholdRejectUpdate, edItemOnholdRejectUpdate,
    updateApprovedHODItemStatus, updateApprovedDMSItemStatus, updateApprovedMSItemStatus, updateApprovedMOItemStatus,
    updateApprovedSMOItemStatus, updateApprovedGMItemStatus, updateApprovedEDItemStatus,
    updateApprovedInchargeItemStatus, UpdateItemReceiveStatus, updateInternallyArranged, updateReqMstInternally,
    updateAllItemStatusForInternallArran, updateApprovedMDItemStatus, updateManagingApproval,
    updateApprovedManageItemStatus, manageItemOnholdRejectUpdate, updateuserAckInternally, InsertCrfViewInsert
} = require('../crm_req_approval/crmreq_approval.service');
const { InsertPurchaseAck } = require('../crm_new_purchase/crm_purchase.service')
const { updateApproveStatus, insertApprvitemsStatus } = require('../crm_newrequest_registration/newRequestRegister.service')
const logger = require('../../logger/logger');

module.exports = {
    getItemListApproval: (req, res) => {
        const id = req.params.id
        getItemListApproval(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
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

    getItemStatus: (req, res) => {
        const id = req.params.id
        getItemStatus(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    successs: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    successs: 2,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                successs: 1,
                data: results
            });
        });
    },

    InactiveItemDetail: (req, res) => {
        const body = req.body;
        InactiveItemDetail(body, (err, results) => {
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

    InchargeApproveDetail: (req, res) => {
        const body = req.body;
        const { apprvLevel, edit_user, apprv_date, req_detl_slno, req_slno } = body
        InchargeApproveDetail(body, (err, results) => {
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
            const apprvDetails = {
                itemStatus: 1,
                remarks: "Approved",
                statusDate: apprv_date,
                user: edit_user,
                req_detl_slno: req_detl_slno,
                req_slno: req_slno
            }
            if (apprvLevel === 1) {
                inchargeItemOnholdRejectUpdate(apprvDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item Approved successfully"
                    });
                })
            }
            // hod
            else if (apprvLevel === 2) {
                hodItemOnholdRejectUpdate(apprvDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item Approved successfully"
                    });
                })
            }
            // dms
            else if (apprvLevel === 3) {
                dmsItemOnholdRejectUpdate(apprvDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item Approved successfully"
                    });
                })
            }
            // ms
            else if (apprvLevel === 4) {
                msItemOnholdRejectUpdate(apprvDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item Approved successfully"
                    });
                })
            }
            // mo
            else if (apprvLevel === 5) {
                moItemOnholdRejectUpdate(apprvDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item Approved successfully"
                    });
                })
            }
            // smo
            else if (apprvLevel === 6) {
                smoItemOnholdRejectUpdate(apprvDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item Approved successfully"
                    });
                })
            }
            // gm
            else if (apprvLevel === 7) {
                gmItemOnholdRejectUpdate(apprvDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item Approved successfully"
                    });
                })
            }
            // md
            else if (apprvLevel === 8) {
                mdItemOnholdRejectUpdate(apprvDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item Approved successfully"
                    });
                })
            }
            // ed
            else if (apprvLevel === 9) {
                edItemOnholdRejectUpdate(apprvDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item Approved successfully"
                    });
                })
            }
            // managing director
            else if (apprvLevel === 10) {
                manageItemOnholdRejectUpdate(apprvDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item Approved successfully"
                    });
                })
            }
        });
    },

    DetailApprvInsert: (req, res) => {
        const body = req.body;
        const { req_slno, req_detl_slno } = body
        DetailOldItemInactive(req_detl_slno, (err, inactive) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (inactive) {
                updateApproveStatus(body, (err, updateStatus) => {
                    if (err) {
                        logger.logwindow(err);
                        return res.status(200).json({
                            success: 0,
                            message: "Internal server error",
                        });
                    }
                    if (updateStatus) {
                        DetailApprvInsert(body, (err, itemResults) => {
                            if (err) {
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }
                            const itemInsertId = itemResults.insertId;
                            const apprvStatusEntry = {
                                req_detl_slno: itemInsertId,
                                req_slno: req_slno
                            }
                            insertApprvitemsStatus(apprvStatusEntry, (err, results) => {
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
                                    message: "Updated Successfully",
                                });
                            });
                        })
                    }
                });
            }
        })
    },
    updateCrfClose: (req, res) => {
        const body = req.body;
        updateCrfClose(body, (err, results) => {
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
                    success: 1,
                    message: "Record Not Found"
                });
            }
            const dataupdate = {
                req_slno: body.req_slno
            }
            updateMasterCrfClose(dataupdate, (err, results) => {
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
                        success: 1,
                        message: "Record Not Found"
                    });
                }
                else {
                    return res.status(200).json({
                        success: 2,
                        message: "CRF Details Updated"
                    });
                }
            });
        });
    },
    updateInchargeApproval: (req, res) => {
        const body = req.body;
        const { incharge_user, req_slno, incharge_apprv_date, items } = body
        updateInchargeApproval(body, (err, results) => {
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
            else {
                const hasApproved = items?.filter((item) => item?.item_status_approved === 1);
                const reject_status = items?.some(item => item?.item_status_approved === 2) ? 1 : 0;
                const onhold_status = items?.some(item => item?.item_status_approved === 3) ? 1 : 0;
                const internally_arranged_status = 0;
                const dataupdate = { reject_status, onhold_status, req_slno, internally_arranged_status };

                const handleResponse = (message, success = 1) => {
                    if (!res.headersSent) {
                        return res.status(200).json({ success, message });
                    }
                };
                if (body.incharge_approve === 3) {
                    updateReqMstHold(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        return handleResponse("On-Hold Successfully");
                    });
                }
                else if (body.incharge_approve === 2) {
                    updateReqMstReject(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        return handleResponse("Rejected Successfully");
                    });
                } else {
                    updateReqMstApproved(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        if (updateResults && hasApproved.length !== 0) {
                            const apprvDetails = hasApproved?.map((val) => {
                                return {
                                    itemStatus: 1,
                                    remarks: "Approved",
                                    statusDate: incharge_apprv_date,
                                    user: incharge_user,
                                    req_detl_slno: val.req_detl_slno,
                                    req_slno: req_slno
                                }
                            })
                            updateApprovedInchargeItemStatus(apprvDetails)
                                .then(results => {
                                    return handleResponse("Approved Successfully");

                                }).catch(err => {
                                    return res.status(200).json({
                                        success: 0,
                                        message: "Error Occured"
                                    });
                                })
                        } else {
                            return handleResponse("Approved Successfully");
                        }
                    });
                }
            }
        });
    },

    updateHODApproval: (req, res) => {
        const body = req.body;
        const { hod_user, req_slno, hod_approve_date, items } = body
        updateHODApproval(body, (err, results) => {
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
            else {
                const hasApproved = items?.filter((item) => item?.item_status_approved === 1);
                const reject_status = items?.some(item => item?.item_status_approved === 2) ? 1 : 0;
                const onhold_status = items?.some(item => item?.item_status_approved === 3) ? 1 : 0;
                const internally_arranged_status = 0;
                const dataupdate = { reject_status, onhold_status, req_slno, internally_arranged_status };

                const handleResponse = (message, success = 1) => {
                    if (!res.headersSent) {
                        return res.status(200).json({ success, message });
                    }
                };
                if (body.hod_approve === 3) {
                    updateReqMstHold(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        return handleResponse("On-Hold Successfully");
                    });
                }
                else if (body.hod_approve === 2) {
                    updateReqMstReject(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        return handleResponse("Rejected Successfully");
                    });
                } else {
                    updateReqMstApproved(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        if (updateResults && hasApproved.length !== 0) {
                            const apprvDetails = hasApproved?.map((val) => {
                                return {
                                    itemStatus: 1,
                                    remarks: "Approved",
                                    statusDate: hod_approve_date,
                                    user: hod_user,
                                    req_detl_slno: val.req_detl_slno,
                                    req_slno: req_slno
                                }
                            })
                            updateApprovedHODItemStatus(apprvDetails)
                                .then(results => {
                                    return handleResponse("Approved Successfully");

                                }).catch(err => {
                                    return res.status(200).json({
                                        success: 0,
                                        message: "Error Occured"
                                    });
                                })
                        } else {
                            return handleResponse("Approved Successfully");
                        }
                    });
                }
            }
        });
    },

    updateDMSApproval: (req, res) => {
        const body = req.body;
        const { dms_user, req_slno, dms_approve_date, items } = body
        updateDMSApproval(body, (err, results) => {
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

            else {
                const hasApproved = items?.filter((item) => item?.item_status_approved === 1);
                const reject_status = items?.some(item => item?.item_status_approved === 2) ? 1 : 0;
                const onhold_status = items?.some(item => item?.item_status_approved === 3) ? 1 : 0;
                const internally_arranged_status = items.some(item => item?.item_status_approved === 4) ? 0 : 0;
                const dataupdate = { reject_status, onhold_status, req_slno, internally_arranged_status };

                const handleResponse = (message, success = 1) => {
                    if (!res.headersSent) {
                        return res.status(200).json({ success, message });
                    }
                };
                if (body.dms_approve === 4) {
                    updateReqMstInternally(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        const apprvDetails = body.items?.map((val) => {
                            return {
                                req_detl_slno: val.req_detl_slno,
                                req_slno: req_slno
                            };
                        });

                        updateAllItemStatusForInternallArran(apprvDetails)
                            .then(results => {
                                return handleResponse("Approved Successfully");
                            })
                            .catch(err => {
                                logger.logwindow(err);
                                return handleResponse("Error Occurred", 0);
                            });
                    });
                }
                else if (body.dms_approve === 3) {
                    updateReqMstHold(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        return handleResponse("On-Hold Successfully");
                    });
                }
                else if (body.dms_approve === 2) {
                    updateReqMstReject(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        return handleResponse("Rejected Successfully");
                    });
                } else {
                    updateReqMstApproved(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        if (updateResults && hasApproved.length !== 0) {
                            const apprvDetails = hasApproved?.map((val) => {
                                return {
                                    itemStatus: 1,
                                    remarks: "Approved",
                                    statusDate: dms_approve_date,
                                    user: dms_user,
                                    req_detl_slno: val.req_detl_slno,
                                    req_slno: req_slno
                                }
                            })
                            updateApprovedDMSItemStatus(apprvDetails)
                                .then(results => {
                                    return handleResponse("Approved Successfully");

                                }).catch(err => {
                                    return res.status(200).json({
                                        success: 0,
                                        message: "Error Occured"
                                    });
                                })
                        } else {
                            return handleResponse("Approved Successfully");
                        }
                    });
                }
            }

        });
    },
    updateMSApproval: (req, res) => {
        const body = req.body;
        const { ms_approve_user, ms_approve_date, req_slno, items } = body
        updateMSApproval(body, (err, results) => {
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
            else {
                const hasApproved = items?.filter((item) => item?.item_status_approved === 1);
                const reject_status = items?.some(item => item?.item_status_approved === 2) ? 1 : 0;
                const onhold_status = items?.some(item => item?.item_status_approved === 3) ? 1 : 0;
                const internally_arranged_status = items?.some(item => item?.item_status_approved === 4) ? 0 : 0;
                const dataupdate = { reject_status, onhold_status, req_slno, internally_arranged_status };

                const handleResponse = (message, success = 1) => {
                    if (!res.headersSent) {
                        return res.status(200).json({ success, message });
                    }
                };

                if (body.ms_approve === 4) {
                    updateReqMstInternally(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        const apprvDetails = body.items?.map((val) => {
                            return {
                                req_detl_slno: val.req_detl_slno,
                                req_slno: req_slno
                            };
                        });

                        updateAllItemStatusForInternallArran(apprvDetails)
                            .then(results => {
                                return handleResponse("Approved Successfully");
                            })
                            .catch(err => {
                                logger.logwindow(err);
                                return handleResponse("Error Occurred", 0);
                            });
                    });
                }
                else if (body.ms_approve === 3) {
                    updateReqMstHold(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        return handleResponse("On-Hold Successfully");
                    });
                }
                else if (body.ms_approve === 2) {
                    updateReqMstReject(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        return handleResponse("Rejected Successfully");
                    });
                } else {
                    updateReqMstApproved(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        if (updateResults && hasApproved.length !== 0) {
                            const apprvDetails = hasApproved?.map((val) => {
                                return {
                                    itemStatus: 1,
                                    remarks: "Approved",
                                    statusDate: ms_approve_date,
                                    user: ms_approve_user,
                                    req_detl_slno: val.req_detl_slno,
                                    req_slno: req_slno
                                }
                            })
                            updateApprovedMSItemStatus(apprvDetails)
                                .then(results => {
                                    return handleResponse("Approved Successfully");

                                }).catch(err => {
                                    return res.status(200).json({
                                        success: 0,
                                        message: "Error Occured"
                                    });
                                })
                        } else {
                            return handleResponse("Approved Successfully");
                        }
                    });
                }
            }
        });
    },

    updateMOApproval: (req, res) => {
        const body = req.body;
        const { manag_operation_user, om_approv_date, req_slno, items } = body

        updateMOApproval(body, (err, results) => {
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

            else {
                const hasApproved = items?.filter((item) => item?.item_status_approved === 1);
                const reject_status = items?.some(item => item?.item_status_approved === 2) ? 1 : 0;
                const onhold_status = items?.some(item => item?.item_status_approved === 3) ? 1 : 0;
                const internally_arranged_status = items.some(item => item?.item_status_approved === 4) ? 0 : 0;
                const dataupdate = { reject_status, onhold_status, req_slno, internally_arranged_status };

                const handleResponse = (message, success = 1) => {
                    if (!res.headersSent) {
                        return res.status(200).json({ success, message });
                    }
                };
                if (body.manag_operation_approv === 4) {
                    updateReqMstInternally(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        const apprvDetails = body.items?.map((val) => {
                            return {
                                req_detl_slno: val.req_detl_slno,
                                req_slno: req_slno
                            };
                        });

                        updateAllItemStatusForInternallArran(apprvDetails)
                            .then(results => {
                                return handleResponse("Approved Successfully");
                            })
                            .catch(err => {
                                logger.logwindow(err);
                                return handleResponse("Error Occurred", 0);
                            });
                    });
                }
                else if (body.manag_operation_approv === 3) {
                    updateReqMstHold(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        return handleResponse("On-Hold Successfully");
                    });
                }
                else if (body.manag_operation_approv === 2) {
                    updateReqMstReject(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        return handleResponse("Rejected Successfully");
                    });
                } else {
                    updateReqMstApproved(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        if (updateResults && hasApproved.length !== 0) {
                            const apprvDetails = hasApproved?.map((val) => {
                                return {
                                    itemStatus: 1,
                                    remarks: "Approved",
                                    statusDate: om_approv_date,
                                    user: manag_operation_user,
                                    req_detl_slno: val.req_detl_slno,
                                    req_slno: req_slno
                                }
                            })
                            updateApprovedMOItemStatus(apprvDetails)
                                .then(results => {
                                    return handleResponse("Approved Successfully");

                                }).catch(err => {
                                    return res.status(200).json({
                                        success: 0,
                                        message: "Error Occured"
                                    });
                                })
                        } else {
                            return handleResponse("Approved Successfully");
                        }
                    });
                }
            }
        });
    },

    updateSMOApproval: (req, res) => {
        const body = req.body;
        const { senior_manage_user, som_aprrov_date, req_slno, items } = body
        updateSMOApproval(body, (err, results) => {
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

            else {
                const hasApproved = items?.filter((item) => item?.item_status_approved === 1);
                const reject_status = items?.some(item => item?.item_status_approved === 2) ? 1 : 0;
                const onhold_status = items?.some(item => item?.item_status_approved === 3) ? 1 : 0;
                const internally_arranged_status = items?.some(item => item?.item_status_approved === 4) ? 0 : 0;
                const dataupdate = { reject_status, onhold_status, req_slno, internally_arranged_status };

                const handleResponse = (message, success = 1) => {
                    if (!res.headersSent) {
                        return res.status(200).json({ success, message });
                    }
                };

                if (body.senior_manage_approv === 4) {
                    updateReqMstInternally(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        const apprvDetails = body.items?.map((val) => {
                            return {
                                req_detl_slno: val.req_detl_slno,
                                req_slno: req_slno
                            };
                        });

                        updateAllItemStatusForInternallArran(apprvDetails)
                            .then(results => {
                                return handleResponse("Approved Successfully");
                            })
                            .catch(err => {
                                logger.logwindow(err);
                                return handleResponse("Error Occurred", 0);
                            });
                    });
                }
                else if (body.senior_manage_approv === 3) {
                    updateReqMstHold(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        return handleResponse("On-Hold Successfully");
                    });
                }
                else if (body.senior_manage_approv === 2) {
                    updateReqMstReject(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        return handleResponse("Rejected Successfully");
                    });
                } else {
                    updateReqMstApproved(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        if (updateResults && hasApproved.length !== 0) {
                            const apprvDetails = hasApproved?.map((val) => {
                                return {
                                    itemStatus: 1,
                                    remarks: "Approved",
                                    statusDate: som_aprrov_date,
                                    user: senior_manage_user,
                                    req_detl_slno: val.req_detl_slno,
                                    req_slno: req_slno
                                }
                            })
                            updateApprovedSMOItemStatus(apprvDetails)
                                .then(results => {
                                    return handleResponse("Approved Successfully");

                                }).catch(err => {
                                    return res.status(200).json({
                                        success: 0,
                                        message: "Error Occured"
                                    });
                                })
                        } else {
                            return handleResponse("Approved Successfully");
                        }
                    });
                }
            }
        });
    },

    updateGMApproval: (req, res) => {
        const body = req.body;
        const { gm_user, gm_approv_date, req_slno, items } = body
        updateGMApproval(body, (err, results) => {
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

            else {
                const hasApproved = items?.filter((item) => item?.item_status_approved === 1);
                const reject_status = items?.some(item => item?.item_status_approved === 2) ? 1 : 0;
                const onhold_status = items?.some(item => item?.item_status_approved === 3) ? 1 : 0;
                const internally_arranged_status = items?.some(item => item?.item_status_approved === 4) ? 0 : 0;
                const dataupdate = { reject_status, onhold_status, req_slno, internally_arranged_status };

                const handleResponse = (message, success = 1) => {
                    if (!res.headersSent) {
                        return res.status(200).json({ success, message });
                    }
                };

                if (body.gm_approve === 4) {
                    updateReqMstInternally(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        const apprvDetails = body.items?.map((val) => {
                            return {
                                req_detl_slno: val.req_detl_slno,
                                req_slno: req_slno
                            };
                        });

                        updateAllItemStatusForInternallArran(apprvDetails)
                            .then(results => {
                                return handleResponse("Approved Successfully");
                            })
                            .catch(err => {
                                logger.logwindow(err);
                                return handleResponse("Error Occurred", 0);
                            });
                    });
                }
                else if (body.gm_approve === 3) {
                    updateReqMstHold(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        return handleResponse("On-Hold Successfully");
                    });
                }
                else if (body.gm_approve === 2) {
                    updateReqMstReject(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        return handleResponse("Rejected Successfully");
                    });
                } else {
                    updateReqMstApproved(dataupdate, (err, updateResults) => {
                        if (err) {
                            return handleResponse("Internal Server Error", 0);
                        }
                        if (!updateResults) {
                            return handleResponse("Record Not Found", 2);
                        }
                        if (updateResults && hasApproved.length !== 0) {
                            const apprvDetails = hasApproved?.map((val) => {
                                return {
                                    itemStatus: 1,
                                    remarks: "Approved",
                                    statusDate: gm_approv_date,
                                    user: gm_user,
                                    req_detl_slno: val.req_detl_slno,
                                    req_slno: req_slno
                                }
                            })
                            updateApprovedGMItemStatus(apprvDetails)
                                .then(results => {
                                    return handleResponse("Approved Successfully");

                                }).catch(err => {
                                    return res.status(200).json({
                                        success: 0,
                                        message: "Error Occured"
                                    });
                                })
                        } else {
                            return handleResponse("Approved Successfully");
                        }
                    });
                }
            }
        });
    },

    updateMDApproval: (req, res) => {
        const body = req.body;
        updateMDApproval(body, (err, results) => {
            if (err) {
                logger.logwindow(err);
                return res.status(200).json({
                    success: 0,
                    message: "Internal Server Error",
                });
            }
            if (!results) {
                logger.infologwindow("Record Not Found");
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found",
                });
            }

            const { req_slno, md_user, md_approve, items, md_approve_date } = body;
            const hasApproved = items?.filter((item) => item?.item_status_approved === 1);
            const reject_status = items?.some(item => item?.item_status_approved === 2) ? 1 : 0;
            const onhold_status = items?.some(item => item?.item_status_approved === 3) ? 1 : 0;
            const internally_arranged_status = items?.some(item => item?.item_status_approved === 4) ? 0 : 0;
            const dataupdate = { reject_status, onhold_status, req_slno, internally_arranged_status };

            const handleResponse = (message, success = 1) => {
                if (!res.headersSent) {
                    return res.status(200).json({ success, message });
                }
            };

            if (md_approve === 4) {
                updateReqMstInternally(dataupdate, (err, updateResults) => {
                    if (err) {
                        return handleResponse("Internal Server Error", 0);
                    }
                    if (!updateResults) {
                        return handleResponse("Record Not Found", 2);
                    }

                    const apprvDetails = body.items?.map((val) => {
                        return {
                            req_detl_slno: val.req_detl_slno,
                            req_slno: req_slno
                        };
                    });

                    updateAllItemStatusForInternallArran(apprvDetails)
                        .then(results => {
                            return handleResponse("Approved Successfully");
                        })
                        .catch(err => {
                            logger.logwindow(err);
                            return handleResponse("Error Occurred", 0);
                        });
                });
            }
            else if (md_approve === 3) {
                updateReqMstHold(dataupdate, (err, updateResults) => {
                    if (err) {
                        return handleResponse("Internal Server Error", 0);
                    }
                    if (!updateResults) {
                        return handleResponse("Record Not Found", 2);
                    }
                    return handleResponse("On-Hold Successfully");
                });
            } else if (md_approve === 2) {
                updateReqMstReject(dataupdate, (err, updateResults) => {
                    if (err) {
                        return handleResponse("Internal Server Error", 0);
                    }
                    if (!updateResults) {
                        return handleResponse("Record Not Found", 2);
                    }
                    return handleResponse("Rejected Successfully");
                });
            } else {
                updateReqMstApproved(dataupdate, (err, updateResults) => {
                    if (err) {
                        return handleResponse("Internal Server Error", 0);
                    }
                    if (!updateResults) {
                        return handleResponse("Record Not Found", 2);
                    }

                    if (updateResults && hasApproved.length !== 0) {
                        const apprvDetails = hasApproved.map((val) => ({
                            itemStatus: 1,
                            remarks: "Approved",
                            statusDate: md_approve_date,
                            user: md_user,
                            req_detl_slno: val.req_detl_slno,
                            req_slno: req_slno,
                        }));

                        updateApprovedMDItemStatus(apprvDetails)
                            .then(() => {
                                CheckCRfExist(req_slno, (err, checkResults) => {
                                    if (err) {
                                        logger.logwindow(err);
                                        return handleResponse("Internal Server Error", 0);
                                    }
                                    if (checkResults && checkResults.length !== 0) {
                                        const hasIncompletePO = checkResults.some(row => row.po_complete === 0);
                                        if (!hasIncompletePO) {
                                            const insertAck = {
                                                req_slno,
                                                ack_status: 0,
                                                ack_remarks: '',
                                                create_user: md_user,
                                            };
                                            InsertPurchaseAck(insertAck, (err) => {
                                                if (err) {
                                                    logger.logwindow(err);
                                                    return handleResponse("Error Inserting Purchase Acknowledgment", 0);
                                                }
                                            });
                                        }
                                    }
                                    return handleResponse("Approved Successfully");
                                });
                            })
                            .catch(() => handleResponse("Error Occurred", 0));
                    } else {
                        return handleResponse("Approved Successfully");
                    }
                });
            }
        });
    },
    updateEDApproval: (req, res) => {
        const body = req.body;
        updateEDApproval(body, (err, results) => {
            if (err) {
                logger.logwindow(err);
                return res.status(200).json({
                    success: 0,
                    message: "Internal Server Error",
                });
            }
            if (!results) {
                logger.infologwindow("Record Not Found");
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found",
                });
            }

            const { req_slno, ed_user, ed_approve, items, ed_approve_date } = body;
            const hasApproved = items?.filter((item) => item?.item_status_approved === 1);
            const reject_status = items?.some(item => item?.item_status_approved === 2) ? 1 : 0;
            const onhold_status = items?.some(item => item?.item_status_approved === 3) ? 1 : 0;
            const internally_arranged_status = items?.some(item => item?.item_status_approved === 4) ? 0 : 0;
            const dataupdate = { reject_status, onhold_status, req_slno, internally_arranged_status };

            const handleResponse = (message, success = 1) => {
                if (!res.headersSent) {
                    return res.status(200).json({ success, message });
                }
            };

            if (ed_approve === 4) {
                updateReqMstInternally(dataupdate, (err, updateResults) => {
                    if (err) {
                        return handleResponse("Internal Server Error", 0);
                    }
                    if (!updateResults) {
                        return handleResponse("Record Not Found", 2);
                    }

                    const apprvDetails = body.items?.map((val) => {
                        return {
                            req_detl_slno: val.req_detl_slno,
                            req_slno: req_slno
                        };
                    });

                    updateAllItemStatusForInternallArran(apprvDetails)
                        .then(results => {
                            return handleResponse("Approved Successfully");
                        })
                        .catch(err => {
                            logger.logwindow(err);
                            return handleResponse("Error Occurred", 0);
                        });
                });
            }
            else if (ed_approve === 3) {
                updateReqMstHold(dataupdate, (err, updateResults) => {
                    if (err) {
                        return handleResponse("Internal Server Error", 0);
                    }
                    if (!updateResults) {
                        return handleResponse("Record Not Found", 2);
                    }
                    return handleResponse("On-Hold Successfully");
                });
            } else if (ed_approve === 2) {
                updateReqMstReject(dataupdate, (err, updateResults) => {
                    if (err) {
                        return handleResponse("Internal Server Error", 0);
                    }
                    if (!updateResults) {
                        return handleResponse("Record Not Found", 2);
                    }
                    return handleResponse("Rejected Successfully");
                });
            } else {
                updateReqMstApproved(dataupdate, (err, updateResults) => {
                    if (err) {
                        return handleResponse("Internal Server Error", 0);
                    }
                    if (!updateResults) {
                        return handleResponse("Record Not Found", 2);
                    }

                    if (updateResults && hasApproved.length !== 0) {
                        const apprvDetails = hasApproved.map((val) => ({
                            itemStatus: 1,
                            remarks: "Approved",
                            statusDate: ed_approve_date,
                            user: ed_user,
                            req_detl_slno: val.req_detl_slno,
                            req_slno: req_slno,
                        }));

                        updateApprovedEDItemStatus(apprvDetails)
                            .then(() => {
                                CheckCRfExist(req_slno, (err, checkResults) => {
                                    if (err) {
                                        logger.logwindow(err);
                                        return handleResponse("Internal Server Error", 0);
                                    }
                                    if (checkResults && checkResults.length !== 0) {
                                        const hasIncompletePO = checkResults.some(row => row.po_complete === 0);
                                        if (!hasIncompletePO) {
                                            const insertAck = {
                                                req_slno,
                                                ack_status: 0,
                                                ack_remarks: '',
                                                create_user: ed_user,
                                            };
                                            InsertPurchaseAck(insertAck, (err) => {
                                                if (err) {
                                                    logger.logwindow(err);
                                                    return handleResponse("Error Inserting Purchase Acknowledgment", 0);
                                                }
                                            });
                                        }
                                    }
                                    return handleResponse("Approved Successfully");
                                });
                            })
                            .catch(() => handleResponse("Error Occurred", 0));
                    } else {
                        return handleResponse("Approved Successfully");
                    }
                });
            }
        });
    },

    updateManagingApproval: (req, res) => {
        const body = req.body;
        updateManagingApproval(body, (err, results) => {
            if (err) {
                logger.logwindow(err);
                return res.status(200).json({
                    success: 0,
                    message: "Internal Server Error",
                });
            }
            if (!results) {
                logger.infologwindow("Record Not Found");
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found",
                });
            }

            const { req_slno, managing_director_user, ed_approve, items, managing_director_approve_date } = body;
            const hasApproved = items?.filter((item) => item?.item_status_approved === 1);
            const reject_status = items?.some(item => item?.item_status_approved === 2) ? 1 : 0;
            const onhold_status = items?.some(item => item?.item_status_approved === 3) ? 1 : 0;
            const internally_arranged_status = items?.some(item => item?.item_status_approved === 4) ? 0 : 0;
            const dataupdate = { reject_status, onhold_status, req_slno, internally_arranged_status };

            const handleResponse = (message, success = 1) => {
                if (!res.headersSent) {
                    return res.status(200).json({ success, message });
                }
            };

            if (ed_approve === 4) {
                updateReqMstInternally(dataupdate, (err, updateResults) => {
                    if (err) {
                        return handleResponse("Internal Server Error", 0);
                    }
                    if (!updateResults) {
                        return handleResponse("Record Not Found", 2);
                    }

                    const apprvDetails = body.items?.map((val) => {
                        return {
                            req_detl_slno: val.req_detl_slno,
                            req_slno: req_slno
                        };
                    });

                    updateAllItemStatusForInternallArran(apprvDetails)
                        .then(results => {
                            return handleResponse("Approved Successfully");
                        })
                        .catch(err => {
                            logger.logwindow(err);
                            return handleResponse("Error Occurred", 0);
                        });
                });
            }
            else if (ed_approve === 3) {
                updateReqMstHold(dataupdate, (err, updateResults) => {
                    if (err) {
                        return handleResponse("Internal Server Error", 0);
                    }
                    if (!updateResults) {
                        return handleResponse("Record Not Found", 2);
                    }
                    return handleResponse("On-Hold Successfully");
                });
            } else if (ed_approve === 2) {
                updateReqMstReject(dataupdate, (err, updateResults) => {
                    if (err) {
                        return handleResponse("Internal Server Error", 0);
                    }
                    if (!updateResults) {
                        return handleResponse("Record Not Found", 2);
                    }
                    return handleResponse("Rejected Successfully");
                });
            } else {
                updateReqMstApproved(dataupdate, (err, updateResults) => {
                    if (err) {
                        return handleResponse("Internal Server Error", 0);
                    }
                    if (!updateResults) {
                        return handleResponse("Record Not Found", 2);
                    }
                    if (updateResults && hasApproved.length !== 0) {
                        const apprvDetails = hasApproved.map((val) => ({
                            itemStatus: 1,
                            remarks: "Approved",
                            statusDate: managing_director_approve_date,
                            user: managing_director_user,
                            req_detl_slno: val.req_detl_slno,
                            req_slno: req_slno,
                        }));

                        updateApprovedManageItemStatus(apprvDetails)
                            .then(() => {
                                CheckCRfExist(req_slno, (err, checkResults) => {
                                    if (err) {
                                        logger.logwindow(err);
                                        return handleResponse("Internal Server Error", 0);
                                    }
                                    if (checkResults && checkResults.length !== 0) {
                                        const hasIncompletePO = checkResults?.some(row => row.po_complete === 0);
                                        if (!hasIncompletePO) {
                                            const insertAck = {
                                                req_slno,
                                                ack_status: 0,
                                                ack_remarks: '',
                                                create_user: managing_director_user,
                                            };
                                            InsertPurchaseAck(insertAck, (err) => {
                                                if (err) {
                                                    logger.logwindow(err);
                                                    return handleResponse("Error Inserting Purchase Acknowledgment", 0);
                                                }
                                            });
                                        }
                                    }
                                    return handleResponse("Approved Successfully");
                                });
                            })
                            .catch(() => handleResponse("Error Occurred", 0));
                    } else {
                        return handleResponse("Approved Successfully");
                    }
                });
            }
        });
    },
    CrfDeptDataCollectInsert: (req, res) => {
        const body = req.body;
        var newList = body?.map((val, index) => {
            return [val.crf_requst_slno, val.crf_req_collect_dept, val.crf_req_remark, val.reqest_one, val.req_user]
        })
        CrfDeptDataCollectInsert(newList, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Request Send for Data collection Successfully"
            });

        });

    },

    DataCollectComplete: (req, res) => {
        const id = req.params.id
        DataCollectComplete(id, (err, results) => {
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
    getDataCollectList: (req, res) => {
        const id = req.params.id
        getDataCollectList(id, (err, results) => {
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

    CrfDataCollactnSave: (req, res) => {
        const body = req.body;
        CrfDataCollactnSave(body, (err, results) => {
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
                message: "Data Edited successfully"
            });
        });
    },

    getAllForPdfView: (req, res) => {

        getAllForPdfView((err, results) => {
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

    getFinalItemListApproval: (req, res) => {
        const id = req.params.id
        getFinalItemListApproval(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    succes: 2,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    succes: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                succes: 1,
                dataa: results
            });
        });
    },

    getMaxItemSlno: (req, res) => {
        const id = req.params.id
        getMaxItemSlno(id, (err, results) => {
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

    AddMoreItemsDetails: (req, res) => {
        const body = req.body;
        const { req_slno } = body
        AddMoreItemsDetails(body, (err, itemResults) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            const itemInsertId = itemResults.insertId;
            const apprvStatusEntry = {
                req_detl_slno: itemInsertId,
                req_slno: req_slno
            }
            insertApprvitemsStatus(apprvStatusEntry, (err, results) => {
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
                    message: "Updated Successfully",
                });
            });
        });
    },


    updateUserAck: (req, res) => {
        const body = req.body;
        updateUserAck(body, (err, results) => {
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
            if (results) {
                updateUserReply(body.req_slno, (err, replyResult) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    if (replyResult) {
                        const items = body.po_itm_slno.map((val) => ({
                            po_itm_slno: val.po_itm_slno
                        }));

                        UpdateItemReceiveStatus(items).then(results => {
                            return res.status(200).json({
                                success: 1,
                                message: "User Acknowledged successfully"
                            });
                        }).catch(err => {
                            return res.status(200).json({
                                success: 0,
                                message: "Error Occured"
                            });
                        })
                    }

                })
            }

        });
    },
    DetailItemReject: (req, res) => {
        const body = req.body;
        const { apprvLevel, reject_remarks, reject_user, reject_date, req_detl_slno, req_slno } = body
        DetailItemReject(body, (err, results) => {
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
            const rejectDetails = {
                itemStatus: 2,
                remarks: reject_remarks,
                statusDate: reject_date,
                user: reject_user,
                req_detl_slno: req_detl_slno,
                req_slno: req_slno
            }
            if (apprvLevel === 1) {
                inchargeItemOnholdRejectUpdate(rejectDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Updated"
                    });
                })
            }
            // hod
            else if (apprvLevel === 2) {
                hodItemOnholdRejectUpdate(rejectDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Updated"
                    });
                })
            }
            // dms
            else if (apprvLevel === 3) {
                dmsItemOnholdRejectUpdate(rejectDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Updated"
                    });
                })
            }
            // ms
            else if (apprvLevel === 4) {
                msItemOnholdRejectUpdate(rejectDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Updated"
                    });
                })
            }
            // mo
            else if (apprvLevel === 5) {
                moItemOnholdRejectUpdate(rejectDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Updated"
                    });
                })
            }
            // smo
            else if (apprvLevel === 6) {
                smoItemOnholdRejectUpdate(rejectDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Updated"
                    });
                })
            }
            // gm
            else if (apprvLevel === 7) {
                gmItemOnholdRejectUpdate(rejectDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Updated"
                    });
                })
            }
            // md
            else if (apprvLevel === 8) {
                mdItemOnholdRejectUpdate(rejectDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Updated"
                    });
                })
            }
            // ed
            else if (apprvLevel === 9) {
                edItemOnholdRejectUpdate(rejectDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Updated"
                    });
                })
            }
            // managing director
            else if (apprvLevel === 10) {
                manageItemOnholdRejectUpdate(rejectDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Updated"
                    });
                })
            }
        });
    },

    DetailItemOnHold: (req, res) => {
        const body = req.body;
        const { apprvLevel, hold_remarks, hold_user, hold_date, req_detl_slno, req_slno } = body
        DetailItemOnHold(body, (err, results) => {
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
            const onholdDetails = {
                itemStatus: 3,
                remarks: hold_remarks,
                statusDate: hold_date,
                user: hold_user,
                req_detl_slno: req_detl_slno,
                req_slno: req_slno
            }
            if (apprvLevel === 1) {
                inchargeItemOnholdRejectUpdate(onholdDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item On-hold successfully"
                    });
                })
            }
            // hod
            else if (apprvLevel === 2) {
                hodItemOnholdRejectUpdate(onholdDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item On-hold successfully"
                    });
                })
            }
            // dms
            else if (apprvLevel === 3) {
                dmsItemOnholdRejectUpdate(onholdDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item On-hold successfully"
                    });
                })
            }
            // ms
            else if (apprvLevel === 4) {
                msItemOnholdRejectUpdate(onholdDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item On-hold successfully"
                    });
                })
            }
            // mo
            else if (apprvLevel === 5) {
                moItemOnholdRejectUpdate(onholdDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item On-hold successfully"
                    });
                })
            }
            // smo
            else if (apprvLevel === 6) {
                smoItemOnholdRejectUpdate(onholdDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item On-hold successfully"
                    });
                })
            }
            // gm
            else if (apprvLevel === 7) {
                gmItemOnholdRejectUpdate(onholdDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item On-hold successfully"
                    });
                })
            }
            // md
            else if (apprvLevel === 8) {
                mdItemOnholdRejectUpdate(onholdDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item On-hold successfully"
                    });
                })
            }
            // ed
            else if (apprvLevel === 9) {
                edItemOnholdRejectUpdate(onholdDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item On-hold successfully"
                    });
                })
            }
            // managing director
            else if (apprvLevel === 10) {
                manageItemOnholdRejectUpdate(onholdDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item On-hold successfully"
                    });
                })
            }
        });
    },

    updateInternallyArranged: (req, res) => {
        const body = req.body;
        const { apprvLevel, internal_remarks, internal_user, internal_date, req_detl_slno, req_slno } = body
        updateInternallyArranged(body, (err, results) => {
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
            const internalDetails = {
                itemStatus: 4,
                remarks: internal_remarks,
                statusDate: internal_date,
                user: internal_user,
                req_detl_slno: req_detl_slno,
                req_slno: req_slno
            }
            if (apprvLevel === 1) {
                inchargeItemOnholdRejectUpdate(internalDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Updated Successfully"
                    });
                })
            }
            // hod
            else if (apprvLevel === 2) {
                hodItemOnholdRejectUpdate(internalDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Updated Successfully"
                    });
                })
            }
            // dms
            else if (apprvLevel === 3) {
                dmsItemOnholdRejectUpdate(internalDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Updated Successfully"
                    });
                })
            }
            // ms
            else if (apprvLevel === 4) {
                msItemOnholdRejectUpdate(internalDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Updated Successfully"
                    });
                })
            }
            // mo
            else if (apprvLevel === 5) {
                moItemOnholdRejectUpdate(internalDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Updated Successfully"
                    });
                })
            }
            // smo
            else if (apprvLevel === 6) {
                smoItemOnholdRejectUpdate(internalDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Updated Successfully"
                    });
                })
            }
            // gm
            else if (apprvLevel === 7) {
                gmItemOnholdRejectUpdate(internalDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Updated Successfully"
                    });
                })
            }
            // md
            else if (apprvLevel === 8) {
                mdItemOnholdRejectUpdate(internalDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Updated Successfully"
                    });
                })
            }
            // ed
            else if (apprvLevel === 9) {
                edItemOnholdRejectUpdate(internalDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Updated Successfully"
                    });
                })
            }
            // managing director
            else if (apprvLevel === 10) {
                manageItemOnholdRejectUpdate(internalDetails, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Updated Successfully"
                    });
                })
            }
        });
    },

    getStoreReceiveStatus: (req, res) => {
        const id = req.params.id
        getStoreReceiveStatus(id, (err, results) => {
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
    updateuserAckInternally: (req, res) => {
        const body = req.body;
        updateUserAck(body, (err, results) => {
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
            if (results) {
                updateUserReply(body.req_slno, (err, replyResult) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    if (!replyResult) {
                        // You could also handle "reply not found" case here if needed
                        return res.status(200).json({
                            success: 2,
                            message: "Reply Record Not Found"
                        });
                    }

                    // If everything goes well, return success
                    return res.status(200).json({
                        success: 1,
                        message: "User Acknowledged successfully"
                    });

                })
            }

        });
    },
    InsertCrfViewInsert: (req, res) => {
        const body = req.body;
        InsertCrfViewInsert(body, (err, results) => {
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
}


const { getItemListApproval, MaxItemSlno, InactiveItemDetail, updateInchargeApproval, updateReqMstHold,
    updateReqMstApproved, updateReqMstReject, InchargeApproveDetail, DetailApprvInsert,
    DetailOldItemInactive, updateCrfClose, updateMasterCrfClose, updateHODApproval, updateDMSApproval,
    updateMSApproval, updateMOApproval, updateSMOApproval, updateGMApproval,
    updateMDApproval, updateEDApproval, CrfDeptDataCollectInsert, DataCollectComplete, getDataCollectList,
    CrfDataCollactnSave, getAllForPdfView, getFinalItemListApproval, getMaxItemSlno,
    AddMoreItemsDetails, updateUserAck, DetailItemReject, DetailItemOnHold

} = require('../crm_req_approval/crmreq_approval.service');

const logger = require('../../logger/logger');

module.exports = {


    getItemListApproval: (req, res) => {
        const id = req.params.id
        getItemListApproval(id, (err, results) => {
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

    MaxItemSlno: (req, res) => {
        const id = req.params.id
        MaxItemSlno(id, (err, results) => {
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



    updateInchargeApproval: (req, res) => {
        const body = req.body;
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
                    success: 1,
                    message: "Record Not Found"
                });
            }

            else {
                const dataupdate = {
                    req_slno: body.req_slno
                }
                if (body.incharge_approve === 3) {
                    updateReqMstHold(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "On-Hold Successfully"
                        });
                    });
                }
                else if (body.incharge_approve === 2) {
                    updateReqMstReject(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "Rejected Successfully"
                        });
                    });
                } else {
                    updateReqMstApproved(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "Approved Successfully"
                        });
                    });
                }


            }

        });
    },

    InchargeApproveDetail: (req, res) => {
        const body = req.body;
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
            return res.status(200).json({
                success: 1,
                message: "Item Updated successfully"
            });
        });
    },

    DetailApprvInsert: (req, res) => {
        const body = req.body;
        DetailApprvInsert(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            DetailOldItemInactive(body, (err, results) => {
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
                    message: "Item Name Updated Successfully",
                });
            });


        });
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
                        message: "CRf Close Successfully"
                    });
                }
            });
        });


    },



    updateHODApproval: (req, res) => {
        const body = req.body;
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
                    success: 1,
                    message: "Record Not Found"
                });
            }

            else {
                const dataupdate = {
                    req_slno: body.req_slno
                }
                if (body.hod_approve === 3) {
                    updateReqMstHold(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "On-Hold Successfully"
                        });
                    });
                }
                else if (body.hod_approve === 2) {
                    updateReqMstReject(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "Rejected Successfully"
                        });
                    });
                } else {
                    updateReqMstApproved(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "Approved Successfully"
                        });
                    });
                }


            }

        });
    },

    updateDMSApproval: (req, res) => {
        const body = req.body;
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
                    success: 1,
                    message: "Record Not Found"
                });
            }

            else {
                const dataupdate = {
                    req_slno: body.req_slno
                }
                if (body.dms_approve === 3) {
                    updateReqMstHold(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "On-Hold Successfully"
                        });
                    });
                }
                else if (body.dms_approve === 2) {
                    updateReqMstReject(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "Rejected Successfully"
                        });
                    });
                } else {
                    updateReqMstApproved(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "Approved Successfully"
                        });
                    });
                }


            }

        });
    },
    updateMSApproval: (req, res) => {
        const body = req.body;
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
                    success: 1,
                    message: "Record Not Found"
                });
            }

            else {
                const dataupdate = {
                    req_slno: body.req_slno
                }
                if (body.ms_approve === 3) {
                    updateReqMstHold(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "On-Hold Successfully"
                        });
                    });
                }
                else if (body.ms_approve === 2) {
                    updateReqMstReject(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "Rejected Successfully"
                        });
                    });
                } else {
                    updateReqMstApproved(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "Approved Successfully"
                        });
                    });
                }


            }

        });
    },

    updateMOApproval: (req, res) => {
        const body = req.body;
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
                    success: 1,
                    message: "Record Not Found"
                });
            }

            else {
                const dataupdate = {
                    req_slno: body.req_slno
                }
                if (body.manag_operation_approv === 3) {
                    updateReqMstHold(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "On-Hold Successfully"
                        });
                    });
                }
                else if (body.manag_operation_approv === 2) {
                    updateReqMstReject(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "Rejected Successfully"
                        });
                    });
                } else {
                    updateReqMstApproved(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "Approved Successfully"
                        });
                    });
                }


            }

        });
    },


    updateSMOApproval: (req, res) => {
        const body = req.body;
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
                    success: 1,
                    message: "Record Not Found"
                });
            }

            else {
                const dataupdate = {
                    req_slno: body.req_slno
                }
                if (body.senior_manage_approv === 3) {
                    updateReqMstHold(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "On-Hold Successfully"
                        });
                    });
                }
                else if (body.senior_manage_approv === 2) {
                    updateReqMstReject(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "Rejected Successfully"
                        });
                    });
                } else {
                    updateReqMstApproved(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "Approved Successfully"
                        });
                    });
                }


            }

        });
    },


    updateGMApproval: (req, res) => {
        const body = req.body;
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
                    success: 1,
                    message: "Record Not Found"
                });
            }

            else {
                const dataupdate = {
                    req_slno: body.req_slno
                }
                if (body.gm_approve === 3) {
                    updateReqMstHold(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "On-Hold Successfully"
                        });
                    });
                }
                else if (body.gm_approve === 2) {
                    updateReqMstReject(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "Rejected Successfully"
                        });
                    });
                } else {
                    updateReqMstApproved(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "Approved Successfully"
                        });
                    });
                }


            }

        });
    },


    updateMDApproval: (req, res) => {
        const body = req.body;
        updateMDApproval(body, (err, results) => {
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
                const dataupdate = {
                    req_slno: body.req_slno
                }
                if (body.md_approve === 3) {
                    updateReqMstHold(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "On-Hold Successfully"
                        });
                    });
                }
                else if (body.md_approve === 2) {
                    updateReqMstReject(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "Rejected Successfully"
                        });
                    });
                } else {
                    updateReqMstApproved(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "Approved Successfully"
                        });
                    });
                }


            }

        });
    },


    updateEDApproval: (req, res) => {
        const body = req.body;
        updateEDApproval(body, (err, results) => {
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
                const dataupdate = {
                    req_slno: body.req_slno
                }
                if (body.ed_approve === 3) {
                    updateReqMstHold(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "On-Hold Successfully"
                        });
                    });
                }
                else if (body.ed_approve === 2) {
                    updateReqMstReject(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "Rejected Successfully"
                        });
                    });
                } else {
                    updateReqMstApproved(dataupdate, (err, results) => {
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
                        return res.status(200).json({
                            success: 2,
                            message: "Approved Successfully"
                        });
                    });
                }


            }

        });
    },

    CrfDeptDataCollectInsert: (req, res) => {

        const body = req.body;
        var newList = body.map((val, index) => {
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
        // const body_result = validateComplaintRegist.validate(body);
        // if (body_result.error) {
        //     logger.logwindow(body_result.error.details[0].message)
        //     return res.status(200).json({
        //         success: 3,
        //         message: body_result.error.details[0].message
        //     });
        // }
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

    AddMoreItemsDetails: (req, res) => {
        const body = req.body;
        AddMoreItemsDetails(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                message: "New Item inserted Successfully",

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
            return res.status(200).json({
                success: 1,
                message: "User Acknowledged successfully"
            });
        });
    },
    DetailItemReject: (req, res) => {
        const body = req.body;
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
            return res.status(200).json({
                success: 1,
                message: "Item Rejected successfully"
            });
        });
    },
    DetailItemOnHold: (req, res) => {
        const body = req.body;
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
            return res.status(200).json({
                success: 1,
                message: "Item On-hold successfully"
            });
        });
    },
}


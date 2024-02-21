const { getItemListApproval, MaxItemSlno, InactiveItemDetail, updateInchargeApproval, updateReqMstHold,
    updateReqMstApproved, updateReqMstReject, InchargeApproveDetail, DetailApprvInsert,
    DetailOldItemInactive, updateCrfClose, updateMasterCrfClose, updateHODApproval, updateDMSApproval,
    updateMSApproval, updateMOApproval, updateSMOApproval, updateGMApproval,
    updateMDApproval, updateEDApproval

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


}


const { getDashClinicalCRF, getDashNonClinicalCRF, getDashClinicalNDRF, getDashNonClinicalNDRF,
    updateDMSApproval, updateMSApproval, updateOMApproval,
    updateSOMpproval, updateCEOApproval, updateReqMst, updateReqMstReject, updateReqMstApproved,

} = require("../crf_dashboards/crfdashboard.service")
const logger = require('../../logger/logger')

module.exports = {

    getDashClinicalCRF: (req, res) => {
        getDashClinicalCRF((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
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
    getDashNonClinicalCRF: (req, res) => {
        getDashNonClinicalCRF((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
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

    getDashClinicalNDRF: (req, res) => {
        getDashClinicalNDRF((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
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
    getDashNonClinicalNDRF: (req, res) => {
        getDashNonClinicalNDRF((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
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
                    updateReqMst(dataupdate, (err, results) => {
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
                    updateReqMst(dataupdate, (err, results) => {
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

    updateOMApproval: (req, res) => {
        const body = req.body;
        updateOMApproval(body, (err, results) => {
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
                    updateReqMst(dataupdate, (err, results) => {
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

    updateSOMpproval: (req, res) => {
        const body = req.body;
        updateSOMpproval(body, (err, results) => {
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
                    updateReqMst(dataupdate, (err, results) => {
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

    updateCEOApproval: (req, res) => {
        const body = req.body;
        updateCEOApproval(body, (err, results) => {
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
                if (body.cao_approve === 3) {
                    updateReqMst(dataupdate, (err, results) => {
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
                else if (body.cao_approve === 2) {
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
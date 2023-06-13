const { validateComplaintRegist } = require('../../validation/validation_schema');
const { getcomplaintAssign, quickAssign, getEmployee, detailedAssign, getcomplaintAssignbyEmployee, quickAssigncompstatus,
    detailedAssigncompstatus, getassistantEmployee, insertAssistemp, getALLcomplaintbyEmployee, getIndividualassitemployee,
    AssistantRecieved, checkInsertVal, TransferDept, assignedListNotRectifiedOnly, rectifiedListForVErify,
    AssistMultiple, getALLAssignedComList, TransferEmployee, EmployeeInactive, beforAssignHold, updatePunchMastDuty
} = require('../complaint_assign/complaintAssign.service');
const logger = require('../../logger/logger');
const { default: Expo } = require('expo-server-sdk');
const { log } = require('winston');

const expo = new Expo()
module.exports = {
    getcomplaintAssign: (req, res) => {
        const id = req.params.id
        getcomplaintAssign(id, (err, results) => {
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
    quickAssign: (req, res) => {
        const body = req.body;
        req.io.emit("message", `New Complaint Registed ! Please Check`)
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results));
            if (Object.keys(value).length === 0) {
                quickAssign(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(400).json({
                            success: 2,
                            message: err
                        });
                    }
                    quickAssigncompstatus(body, (err, results) => {
                        if (err) {
                            logger.logwindow(err)
                            return res.status(400).json({
                                success: 2,
                                message: err
                            });
                        }
                        return res.status(200).json({
                            success: 1,
                            message: "Complaint Assigned Successfully"
                        });
                    })
                });
            } else {
                logger.infologwindow("Already Assigned Selected Employee")
                return res.status(200).json({
                    success: 7,
                    message: "Already Assigned Selected Employee"
                })
            }
        })
    },
    getEmployee: (req, res) => {
        const id = req.params.id
        getEmployee(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
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
    detailedAssign: (req, res) => {

        req.io.emit("message", `New Complaint Registed ! Please Check`)
        const body = req.body;
        var newList = body.map((val, index) => {
            return [val.complaint_slno, val.assigned_emp, val.assigned_date, val.assign_rect_status,
            val.assigned_user, val.assign_status]
        })

        checkInsertVal(newList, (err, results) => {
            const value = JSON.parse(JSON.stringify(results));
            if (Object.keys(value).length === 0) {
                detailedAssign(newList, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 2,
                            message: err
                        });
                    }
                    detailedAssigncompstatus(body[0], (err, results) => {
                        if (err) {
                            logger.logwindow(err)
                            return res.status(200).json({
                                success: 2,
                                message: err
                            });
                        }
                        return res.status(200).json({
                            success: 1,
                            message: "Complaint Assigned Successfully"
                        });
                    })
                });

            }
            else {
                return res.status(200).json({
                    success: 3,
                    message: "Complaint Already Assigned "
                });

            }

        })
    },
    getcomplaintAssignbyEmployee: (req, res) => {
        const id = req.params.id
        getcomplaintAssignbyEmployee(id, (err, results) => {
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
    getassistantEmployee: (req, res) => {
        req.io.emit("message", `New Complaint Registed ! Please Check`)
        const body = req.body
        getassistantEmployee(body, (err, results) => {
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
    insertAssistemp: (req, res) => {
        req.io.emit("message", `New Complaint Registed ! Please Check`)
        const body = req.body
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results));
            if (Object.keys(value).length === 0) {

                insertAssistemp(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(400).json({
                            success: 2,
                            message: err
                        });
                    }
                    quickAssigncompstatus(body, (err, results) => {
                        if (err) {
                            logger.logwindow(err)
                            return res.status(400).json({
                                success: 2,
                                message: err
                            });
                        }
                        return res.status(200).json({
                            success: 1,
                            message: "Complaint Assisted Successfully"
                        });
                    })
                });
            }
            else {
                return res.status(200).json({
                    success: 3,
                    message: "Already Assist for This Complaint"
                });

            }

        })


    },
    getALLcomplaintbyEmployee: (req, res) => {
        const id = req.params.id
        getALLcomplaintbyEmployee(id, (err, results) => {
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
    getIndividualassitemployee: (req, res) => {
        const id = req.params.id
        getIndividualassitemployee(id, (err, results) => {
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
    AssistantRecieved: (req, res) => {

        req.io.emit("message", `New Complaint Registed ! Please Check`)
        const body = req.body
        AssistantRecieved(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Assisted Successfully"
            });
        });
    },
    TransferDept: (req, res) => {

        req.io.emit("message", `New Complaint Registed ! Please Check`)
        const body = req.body
        TransferDept(body, (err, results) => {
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
                message: "Complaint Transfer Successfully"
            });
        });
    },
    assignedListNotRectifiedOnly: (req, res) => {
        const id = req.params.id
        assignedListNotRectifiedOnly(id, (err, results) => {
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
    rectifiedListForVErify: (req, res) => {
        const id = req.params.id
        rectifiedListForVErify(id, (err, results) => {
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

    AssistMultiple: (req, res) => {

        req.io.emit("message", `New Complaint Registed ! Please Check`)
        const body = req.body;
        var newList = body.map((val, index) => {
            return [val.complaint_slno, val.assigned_emp, val.assist_assign_date, val.assist_flag,
            val.assist_requested_emp, val.assign_rect_status, val.assigned_user]
        })

        AssistMultiple(newList, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Complaint Assist Requested Successfullt"
                });
            }

        });
    },

    getALLAssignedComList: (req, res) => {
        const id = req.params.id
        getALLAssignedComList(id, (err, results) => {
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

    TransferEmployee: (req, res) => {

        req.io.emit("message", `New Complaint Registed ! Please Check`)
        const body = req.body

        var newList = body.map((val, index) => {
            return [val.complaint_slno, val.assigned_emp]
        })

        // TransferEmployee(body, (err, results) => {
        //     if (err) {
        //         logger.logwindow(err)
        //         return res.status(200).json({
        //             success: 2,
        //             message: err
        //         });
        //     }
        //     if (results.length === 0) {
        //         logger.infologwindow("No Results Found")
        //         return res.status(200).json({
        //             success: 0,
        //             message: "No Results Found"
        //         });
        //     }
        //     return res.status(200).json({
        //         success: 1,
        //         message: "Complaint Transfer Successfully"
        //     });
        // });
    },

    transferInsert: (req, res) => {

        req.io.emit("message", `New Complaint Registed ! Please Check`)
        const body = req.body;
        var newList = body.map((val, index) => {
            return [val.complaint_slno, val.assigned_emp, val.assigned_date, val.assign_rect_status,
            val.assigned_user, val.assign_status]
        })
        detailedAssign(newList, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Complaint Assigned Successfully"
            });
        });
    },

    EmployeeInactive: (req, res) => {

        req.io.emit("message", `New Complaint Registed ! Please Check`)
        const body = req.body
        var newList = body.map((val, index) => {
            return [val.complaint_slno, val.assigned_emp]
        })
        EmployeeInactive(newList, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Assisted Successfully"
            });
        });
    },
    beforAssignHold: (req, res) => {
        const body = req.body
        beforAssignHold(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: err
                });
            }
            quickAssign(body, (err, results) => {
                if (err) {
                    logger.logwindow(err)
                    return res.status(400).json({
                        success: 2,
                        message: err
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Assisted Successfully"
                });
            })

        });
    },
    updatePunchMastDuty: async (req, res) => {
        const body = req.body;
        updatePunchMastDuty(body).then(results => {
            return res.status(200).json({
                succes: 1,
                messagee: 'Update Successfully'
            });
        }).catch(err => {
            return res.status(200).json({
                succes: 0,
                messagee: "Error Occured , Please Contact HRD / IT"
            });
        })
    },
}
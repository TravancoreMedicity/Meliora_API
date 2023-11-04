const { requestRegistInsert, requestRegistInsertDetl, requestApprovalInsert, getReqByDeptBase, getItemListByReqno,
    requestRegistUpdate, requestRegistDetlUpdate, getAuthorization, getDeptApprovList, updateInchargeApproval,
    updateHodApproval, getApprovListOthers, updateOMApproval, updateSOMpproval, updateCEOApproval,
    updateEDApproval, updateReqMst, getApprovListDMS, deleteItemListByReqno, getCrfDeptDataCollect,
    CrfDeptDataCollectInsert, getDataCollectList, EditItemListByReqno, CrfDataCollactnSave,
    getItemListDataCollectByReqno, dataCollectDetailInsert, getApprovListMS, DataCollectComplete
} = require('../crm_request_register/requestRegister.service');
const { validateRequestRegister, validateRequestRegisterDetl, validateUserGroup } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');

module.exports = {
    requestRegistInsert: (req, res) => {
        const body = req.body;
        //validate diet master insertion function
        const body_result = validateRequestRegister.validate(body);
        if (body_result.error) {
            //  logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        requestRegistInsert(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Request Registred Successfully",
                insetid: results.insertId
            });
        });
    },

    requestRegistInsertDetl: (req, res) => {
        const body = req.body;
        //validate  insertion function
        // const body_result = validateRequestRegisterDetl.validate(body);
        // if (body_result.error) {
        //     logger.warnlogwindow(body_result.error.details[0].message)
        //     return res.status(200).json({
        //         success: 2,
        //         message: body_result.error.details[0].message
        //     });
        // }
        var a1 = body.map((value, index) => {
            return [value.req_slno, value.item_slno, value.item_desc, value.item_brand, value.item_unit,
            value.item_qnty, value.item_specification, value.aprox_cost, value.item_status,
            value.create_user

            ]
        })
        requestRegistInsertDetl(a1, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Request Registred Successfully",
            });
        });
    },

    requestApprovalInsert: (req, res) => {
        const body = req.body;
        requestApprovalInsert(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Request Registred Successfully",
            });
        });
    },


    getReqByDeptBase: (req, res) => {
        const id = req.params.id
        getReqByDeptBase(id, (err, results) => {
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
    getItemListByReqno: (req, res) => {
        const id = req.params.id
        getItemListByReqno(id, (err, results) => {
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
    requestRegistUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateRequestRegister.validate(body);
        if (body_result.error) {
            logger.logwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }
        requestRegistUpdate(body, (err, results) => {
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
                message: "Request Register Updated Successfully"
            });
        });
    },
    requestRegistDetlUpdate: (req, res) => {
        const body = req.body;
        // const body_result = validateComplaintRegist.validate(body);
        // if (body_result.error) {
        //     logger.logwindow(body_result.error.details[0].message)
        //     return res.status(200).json({
        //         success: 3,
        //         message: body_result.error.details[0].message
        //     });
        // }
        requestRegistDetlUpdate(body, (err, results) => {
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
                message: "Complaint Department Updated Successfully"
            });
        });
    },

    getAuthorization: (req, res) => {
        const id = req.params.id
        getAuthorization(id, (err, results) => {
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

    getDeptApprovList: (req, res) => {
        const body = req.body
        getDeptApprovList(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
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

    getApprovListOthers: (req, res) => {
        getApprovListOthers((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No results found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
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

            if (body.incharge_approve === 3) {

                const dataupdate = {
                    req_slno: body.req_slno
                }
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
                        message: "Approved Successfully"
                    });
                });
            }
            else {
                return res.status(200).json({
                    success: 2,
                    message: "Approved Successfully"
                });
            }
        });
    },
    updateHodApproval: (req, res) => {
        const body = req.body;
        updateHodApproval(body, (err, results) => {
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
            if (body.hod_approve === 3) {

                const dataupdate = {
                    req_slno: body.req_slno
                }
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
                        message: "Approved Successfully"
                    });
                });
            } else {
                return res.status(200).json({
                    success: 2,
                    message: "Approved Successfully"
                });
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
            if (body.manag_operation_approv === 3) {

                const dataupdate = {
                    req_slno: body.req_slno
                }
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
                        message: "Approved Successfully"
                    });
                });
            } else {
                return res.status(200).json({
                    success: 2,
                    message: "Approved Successfully"
                });
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
            if (body.senior_manage_approv === 3) {

                const dataupdate = {
                    req_slno: body.req_slno
                }
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
                        message: "Approved Successfully"
                    });
                });
            } else {
                return res.status(200).json({
                    success: 2,
                    message: "Approved Successfully"
                });
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
            if (body.cao_approve === 3) {

                const dataupdate = {
                    req_slno: body.req_slno
                }
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
                        message: "Approved Successfully"
                    });
                });
            } else {
                return res.status(200).json({
                    success: 2,
                    message: "Approved Successfully"
                });
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
            if (body.ed_approve === 3) {

                const dataupdate = {
                    req_slno: body.req_slno
                }
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
                        message: "Approved Successfully"
                    });
                });
            } else {
                return res.status(200).json({
                    success: 2,
                    message: "Approved Successfully"
                });
            }
        });
    },
    getApprovListDMS: (req, res) => {
        getApprovListDMS((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No results found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },


    deleteItemListByReqno: (req, res) => {
        const body = req.body;
        // const body_result = validateComplaintRegist.validate(body);
        // if (body_result.error) {
        //     logger.logwindow(body_result.error.details[0].message)
        //     return res.status(200).json({
        //         success: 3,
        //         message: body_result.error.details[0].message
        //     });
        // }
        deleteItemListByReqno(body, (err, results) => {
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

    EditItemListByReqno: (req, res) => {
        const body = req.body;
        // const body_result = validateComplaintRegist.validate(body);
        // if (body_result.error) {
        //     logger.logwindow(body_result.error.details[0].message)
        //     return res.status(200).json({
        //         success: 3,
        //         message: body_result.error.details[0].message
        //     });
        // }
        EditItemListByReqno(body, (err, results) => {
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

    getCrfDeptDataCollect: (req, res) => {
        getCrfDeptDataCollect((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No results found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    CrfDeptDataCollectInsert: (req, res) => {

        const body = req.body;
        var newList = body.map((val, index) => {
            return [val.crf_requst_slno, val.crf_req_collect_dept, val.req_user]
        })

        // checkInsertVal(newList, (err, results) => {
        //     const value = JSON.parse(JSON.stringify(results));
        //     if (Object.keys(value).length === 0) {
        CrfDeptDataCollectInsert(newList, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            // detailedAssigncompstatus(body[0], (err, results) => {
            //     if (err) {
            //         logger.logwindow(err)
            //         return res.status(200).json({
            //             success: 2,
            //             message: err
            //         });
            //     }
            return res.status(200).json({
                success: 1,
                message: "Request Send for Data collection Successfully"
            });
            // })
        });

        //     }
        //     else {
        //         return res.status(200).json({
        //             success: 3,
        //             message: "Complaint Already Assigned "
        //         });

        //     }

        // })
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

    getItemListDataCollectByReqno: (req, res) => {
        const id = req.params.id
        getItemListDataCollectByReqno(id, (err, results) => {
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



    dataCollectDetailInsert: (req, res) => {
        const body = req.body;
        //validate  insertion function
        // const body_result = validateRequestRegisterDetl.validate(body);
        // if (body_result.error) {
        //     logger.warnlogwindow(body_result.error.details[0].message)
        //     return res.status(200).json({
        //         success: 2,
        //         message: body_result.error.details[0].message
        //     });
        // }
        var a1 = body.map((value, index) => {
            return [value.req_slno, value.item_slno, value.item_desc, value.item_brand, value.item_unit,
            value.item_qnty, value.item_specification, value.aprox_cost, value.item_status,
            value.create_user

            ]
        })
        dataCollectDetailInsert(a1, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Request Registred Successfully",
            });
        });
    },

    getApprovListMS: (req, res) => {
        getApprovListMS((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No results found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
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

}


const { requestRegistInsert, requestRegistInsertDetl, requestApprovalInsert, InHodExist, getAllReqBasedDept,
    getDetailItemList, EditItemListByReqno, UpdateReqMaster, getApprovListOthers, getpoApproovalDetails,
    getAllListDashboard, getAllReqBasedDeptreq, deleteItemDetails, getCRFPurchaseDashboard, getDeliveryMarkingDetails,
    getAllPoDetails, getAllItemDetails, getStoreAckDetails, getUserAckDetails, getCompletedCRF
} = require('../crm_newrequest_registration/newRequestRegister.service');
const { validateCRMRequestRegister } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');

module.exports = {
    requestRegistInsert: (req, res) => {
        const body = req.body;

        //validate diet master insertion function
        const body_result = validateCRMRequestRegister.validate(body);
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
                insertid: results.insertId
            });
        });
    },

    requestRegistInsertDetl: (req, res) => {
        const body = req.body;
        var a1 = body.map((value, index) => {
            return [value.req_slno, value.item_slno, value.item_desc, value.approve_item_desc,
            value.item_brand, value.approve_item_brand, value.item_unit, value.approve_item_unit,
            value.item_qnty, value.item_qnty_approved, value.item_specification, value.approve_item_specification,
            value.item_unit_price, value.approve_item_unit_price, value.aprox_cost, value.approve_aprox_cost,
            value.item_status, value.item_status_approved, value.approve_item_status, value.create_user
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

    InHodExist: (req, res) => {
        const id = req.params.id;
        InHodExist(id, (err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }
            if (results.length == 0) {
                // logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No data"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },

    getAllReqBasedDept: (req, res) => {
        const body = req.body
        getAllReqBasedDept(body, (err, results) => {
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


    getDetailItemList: (req, res) => {
        const id = req.params.id
        getDetailItemList(id, (err, results) => {
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



    UpdateReqMaster: (req, res) => {
        const body = req.body;
        const body_result = validateCRMRequestRegister.validate(body);
        if (body_result.error) {
            logger.logwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }
        UpdateReqMaster(body, (err, results) => {
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

    getAllListDashboard: (req, res) => {
        getAllListDashboard((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No results found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getAllReqBasedDeptreq: (req, res) => {
        const id = req.params.id
        getAllReqBasedDeptreq(id, (err, results) => {
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

    deleteItemDetails: (req, res) => {
        const body = req.body;
        deleteItemDetails(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Deleted"
            });
        });
    },

    EditItemListByReqno: async (req, res) => {
        const body = req.body;
        EditItemListByReqno(body).then(results => {
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

    getCRFPurchaseDashboard: (req, res) => {
        getCRFPurchaseDashboard((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No results found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getpoApproovalDetails: (req, res) => {
        getpoApproovalDetails((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No results found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getDeliveryMarkingDetails: (req, res) => {
        const body = req.body;
        getDeliveryMarkingDetails(body, (err, results) => {
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

    getAllItemDetails: (req, res) => {
        const body = req.body;
        getAllItemDetails(body, (err, results) => {
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

    getStoreAckDetails: (req, res) => {
        const body = req.body;
        getStoreAckDetails(body, (err, results) => {
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
    getUserAckDetails: (req, res) => {
        const body = req.body;
        getUserAckDetails(body, (err, results) => {
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
    getCompletedCRF: (req, res) => {
        const body = req.body;
        getCompletedCRF(body, (err, results) => {
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


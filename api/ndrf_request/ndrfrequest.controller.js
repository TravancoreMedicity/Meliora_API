const { updateNdrfConvert, InsertNdrf, getNdrfList, checkInsertVal, updateEDApproval, ndrfApprovalInsert,
    updateOMApproval, updateSMOApproval, updateCAOApproval, getNdrfPdf, updateMDApproval, ndrfDetailInsert
    , getItemListDataCollectByReqno, purchaseAcknlodge
} = require('../ndrf_request/ndrfrequest.service')
const logger = require('../../logger/logger')

module.exports = {
    InsertNdrf: (req, res) => {
        const body = req.body;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {

                InsertNdrf(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    updateNdrfConvert(body, (err, result) => {
                        if (err) {
                            // logger.logwindow(err)
                            return res.status(200).json({
                                success: 0,
                                message: err
                            });
                        }
                        if (!results) {
                            return res.status(400).json({
                                success: 2,
                                message: "Record Not Found"
                            })
                        }
                    });
                    return res.status(200).json({
                        success: 1,
                        message: "NDRF Created Successfully",
                        insetid: results.insertId
                    });
                });


            } else {
                return res.status(200).json({
                    success: 7,
                    message: "NDRF Allready Created "
                })
            }
        })

    },
    getNdrfList: (req, res) => {
        getNdrfList((err, results) => {
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

    ndrfApprovalInsert: (req, res) => {
        const body = req.body;
        ndrfApprovalInsert(body, (err, results) => {
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

    ndrfDetailInsert: (req, res) => {
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
            return [value.ndrf_mast_slno, value.item_slno, value.item_desc, value.item_brand, value.item_unit,
            value.item_qnty, value.item_specification, value.aprox_cost, value.item_status,
            value.create_user
            ]
        })
        ndrfDetailInsert(a1, (err, results) => {

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
            return res.status(200).json({
                success: 2,
                message: "Approved Successfully"
            });
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
            return res.status(200).json({
                success: 2,
                message: "Approved Successfully"
            });
        });
    },
    updateCAOApproval: (req, res) => {
        const body = req.body;

        updateCAOApproval(body, (err, results) => {
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
            return res.status(200).json({
                success: 2,
                message: "Approved Successfully"
            });
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
            return res.status(200).json({
                success: 2,
                message: "Approved Successfully"
            });
        });
    },
    getNdrfPdf: (req, res) => {
        getNdrfPdf((err, results) => {
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

    purchaseAcknlodge: (req, res) => {
        const body = req.body;

        purchaseAcknlodge(body, (err, results) => {
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
    },
}
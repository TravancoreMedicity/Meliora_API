
const { getRectifycomplt, Updatecomplit, UpdateVerify, getAssignEmps, updateassignDetail,
    ReopenComplaintInsert, getlocationbsedAsset, AssetMappComplaint, AssetDetailsGet, updateHoldProgress, getEmplHoldList, getEmplRectfiedList, getEmplVerifiedList,
    getUserEndRectfiedList, getUserEndVerifiedList, getDepartmentPendingList, getDepartmentRectfiedList, getDepartmentVerifiedList, getAuthorization
} = require('../Rectifycomplit/Rectifycomplit.service')
const logger = require('../../logger/logger');
module.exports = {
    getRectifycomplt: (req, res) => {
        const id = req.params.id
        getRectifycomplt(id, (err, results) => {
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
    Updatecomplit: (req, res) => {
        const body = req.body;
        req.io.emit("message", `New Complaint Registed ! Please Check`)
        Updatecomplit(body[0], (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            const result = updateassignDetail(body)
                .then((r) => {
                    return res.status(200).json({
                        success: 2,
                        data: r,
                        message: "Rectified Sucessfully"
                    });
                }).catch((e) => {
                    return res.status(200).json({
                        success: 1,
                        message: e.sqlMessage
                    });
                })

        })
    },
    UpdateVerify: (req, res) => {
        const body = req.body;
        req.io.emit("message", `New Complaint Registed ! Please Check`)
        UpdateVerify(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                // logger.infologwindow("Record Not Found")
                return res.status(200).json({
                    success: 1,
                    message: "Record Not Found"
                })
            }
            if (body.cm_rectify_status === 'Z') {

                ReopenComplaintInsert(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 1,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 2,
                        message: "Verified complaint successfully"
                    })
                });



            } else {
                return res.status(200).json({
                    success: 2,
                    message: "Verified complaint successfully"
                })
            }


        })


    },
    getAssignEmps: (req, res) => {
        const id = req.params.id
        getAssignEmps(id, (err, results) => {
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
    getlocationbsedAsset: (req, res) => {
        const id = req.params.id
        getlocationbsedAsset(id, (err, results) => {
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
    AssetMappComplaint: (req, res) => {
        const body = req.body;
        AssetMappComplaint(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Asset Added Successfully"
            });
        });
    },
    AssetDetailsGet: (req, res) => {
        const id = req.params.id
        AssetDetailsGet(id, (err, results) => {
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

    updateHoldProgress: (req, res) => {
        const body = req.body
        updateHoldProgress(body, (err, results) => {
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
                    message: "No Complaints"
                });
            }
            req.io.emit("message", `New Complaint Registed ! Please Check`)
            return res.status(200).json({
                success: 1,
                message: "Complaint Status Updated  Successfully"
            });
        });
    },

    getEmplHoldList: (req, res) => {
        const body = req.body;
        getEmplHoldList(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getEmplRectfiedList: (req, res) => {
        const body = req.body;
        getEmplRectfiedList(body, (err, results) => {


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
                data: results
            })
        })
    },
    getEmplVerifiedList: (req, res) => {
        const body = req.body;
        getEmplVerifiedList(body, (err, results) => {


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
                data: results
            })
        })
    },
    getUserEndRectfiedList: (req, res) => {
        const body = req.body;
        getUserEndRectfiedList(body, (err, results) => {
            console.log("results", results);

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
                data: results
            })
        })
    },

    getUserEndVerifiedList: (req, res) => {
        const body = req.body;
        getUserEndVerifiedList(body, (err, results) => {

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
                data: results
            })
        })
    },


    getDepartmentPendingList: (req, res) => {
        const body = req.body;
        getDepartmentPendingList(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    getDepartmentRectfiedList: (req, res) => {
        const body = req.body;
        getDepartmentRectfiedList(body, (err, results) => {
            console.log("results", results);

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
                data: results
            })
        })
    },


    getDepartmentVerifiedList: (req, res) => {
        const body = req.body;
        getDepartmentVerifiedList(body, (err, results) => {

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
                data: results
            })
        })
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

}
const { getAssetDetails, getcomplaintDetails, getAssetcomplaintDetails, serviceDetailsInsert, getserviceDetails, serviceDetailsUpdate, getAllserviceDetails,
    AssetDetailsUpdate, SpareDetailsUpdate, spareServiceUpdate, servicedEmpDetailsInsert, getDeptServiceDetailsData, servicedEmpDetailsUpdate, AssetServiceHoldUpdate,
    SpareServiceHoldUpdate, getAssetListUnderCustodian, getAssetAlllDetails
} = require('./spare_service_details.service')
module.exports = {

    getAssetDetails: (req, res) => {
        const body = req.body;
        getAssetDetails(body, (err, results) => {
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
    getAssetListUnderCustodian: (req, res) => {
        const body = req.body;
        getAssetListUnderCustodian(body, (err, results) => {
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

    getAssetAlllDetails: (req, res) => {
        const body = req.body;
        getAssetAlllDetails(body, (err, results) => {
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
    getcomplaintDetails: (req, res) => {
        const body = req.body;
        getcomplaintDetails(body, (err, results) => {
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
    getAssetcomplaintDetails: (req, res) => {
        const body = req.body;
        getAssetcomplaintDetails(body, (err, results) => {
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
    serviceDetailsInsert: (req, res) => {
        const body = req.body;
        serviceDetailsInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Service Details Added Successfully",
                insertId: result.insertId,
            })
        })
    },


    getserviceDetails: (req, res) => {
        const body = req.body;
        getserviceDetails(body, (err, results) => {
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
    serviceDetailsUpdate: (req, res) => {
        const body = req.body;
        serviceDetailsUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Service details Updated Successfully"
            })
        })
    },
    getAllserviceDetails: (req, res) => {
        const body = req.body;
        getAllserviceDetails(body, (err, results) => {
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
    AssetDetailsUpdate: (req, res) => {
        const body = req.body;
        AssetDetailsUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Service details Updated Successfully"
            })
        })
    },
    SpareDetailsUpdate: (req, res) => {
        const body = req.body;
        SpareDetailsUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Service details Updated Successfully"
            })
        })
    },
    spareServiceUpdate: (req, res) => {
        const body = req.body;
        spareServiceUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Service details Updated Successfully"
            })
        })
    },
    servicedEmpDetailsInsert: (req, res) => {
        const body = req.body;
        servicedEmpDetailsInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Service Details Added Successfully",
                insertId: result.insertId,
            })
        })
    },
    // getDeptServiceDetailsData: (req, res) => {
    //     const id = req.params.id

    //     console.log("id", id);

    //     getDeptServiceDetailsData(id, (err, results) => {
    //         if (err) {
    //             logger.logwindow(err)
    //             return res.status(400).json({
    //                 success: 2,
    //                 message: err
    //             });
    //         }
    //         if (results.length === 0) {
    //             logger.infologwindow("No Results Found")
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: "No Assigned Complaints"
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         });
    //     });
    // },
    getDeptServiceDetailsData: (req, res) => {
        const body = req.body
        getDeptServiceDetailsData(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Records Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Records Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    servicedEmpDetailsUpdate: (req, res) => {
        const body = req.body;
        servicedEmpDetailsUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Service details Updated Successfully"
            })
        })
    },
    AssetServiceHoldUpdate: (req, res) => {
        const body = req.body;
        AssetServiceHoldUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Service details Updated Successfully"
            })
        })
    },
    SpareServiceHoldUpdate: (req, res) => {
        const body = req.body;
        SpareServiceHoldUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Service details Updated Successfully"
            })
        })
    },

}
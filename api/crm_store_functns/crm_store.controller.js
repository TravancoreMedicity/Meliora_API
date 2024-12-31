const { getCRSStorePending, getCrsReceiceAllList, searchPendingStore, getPendingGrnPo, existCheck,
    grnDetailsInsert, grnDetailsUpdate, updateGrnItemQnty, getPOItemDetails, UpdateStoreReceive, getStoreList,
    UpdatePurchasePoReceive, searchReceivedDetails, getCRFDataForSubstore, getCRFDetails, StoreToUserAcknowledgement,
    crfReqItemStoreAcknow, getUserInfoDetails, updateStoreAcknow, UpdateCrfAck, getUserAckDetails, updateUserReply,
    getReqItemForCRFView
} = require('../crm_store_functns/crm_store.service');

const logger = require('../../logger/logger');

module.exports = {

    getCRSStorePending: (req, res) => {
        getCRSStorePending((err, results) => {
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


    getCrsReceiceAllList: (req, res) => {
        getCrsReceiceAllList((err, results) => {
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

    searchPendingStore: (req, res) => {
        const body = req.body;
        searchPendingStore(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    searchReceivedDetails: (req, res) => {
        const body = req.body;
        searchReceivedDetails(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getPendingGrnPo: (req, res) => {
        getPendingGrnPo((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Pending PO Found"

                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
            })
        })
    },

    existCheck: (req, res) => {
        const body = req.body;
        existCheck(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    existdata: []
                })
            }
            return res.status(200).json({
                success: 1,
                existdata: results
            })
        })
    },

    grnDetailsInsert: (req, res) => {
        const body = req.body;
        const data = body?.map((val) => {
            return [val.store_code, val.po_number, JSON.stringify(val.grn_no), val.create_user]
        })
        grnDetailsInsert(data, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Updated Successfully"
            })
        })
    },

    grnDetailsUpdate: async (req, res) => {
        const body = req.body;
        grnDetailsUpdate(body).then(results => {
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

    updateGrnItemQnty: async (req, res) => {
        const body = req.body;
        updateGrnItemQnty(body).then(results => {
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

    getPOItemDetails: (req, res) => {
        const body = req.body;
        getPOItemDetails(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

    UpdateStoreReceive: async (req, res) => {
        const body = req.body;
        UpdateStoreReceive(body).then(results => {
            if (results) {
                const newArray = body?.map((val) => {
                    return {
                        store_receive: val.store_recieve === null ? 0 : val.store_recieve,
                        store_receive_user: val.store_recieve === 1 ? val.store_receive_user : null,
                        store_receive_date: val.store_recieve === 1 ? val.store_receive_date : null,
                        crm_purchase_slno: val.crm_purchase_slno
                    }
                })
                UpdatePurchasePoReceive(newArray).then(results => {
                    return res.status(200).json({
                        success: 1,
                        message: "Updated"
                    });
                })
            }
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: "Error Occured"
            });
        })
    },

    getStoreList: (req, res) => {
        getStoreList((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

    getCRFDataForSubstore: (req, res) => {
        getCRFDataForSubstore((err, results) => {
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

    getCRFDetails: (req, res) => {
        const id = req.params.id
        getCRFDetails(id, (err, results) => {
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

    crfReqItemStoreAcknow: (req, res) => {
        const body = req.body;
        crfReqItemStoreAcknow(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "User acknowledgment successfully saved"
            })
        })
    },

    StoreToUserAcknowledgement: (req, res) => {
        const body = req.body;
        StoreToUserAcknowledgement(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results) {
                UpdateCrfAck(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "User acknowledgment successfully saved"
                    })
                })
            }
        });
    },





    // StoreToUserAcknowledgement: async (req, res) => {
    //     const body = req.body;
    //     StoreToUserAcknowledgement(body).then(results => {
    //         return res.status(200).json({
    //             success: 1,
    //             message: "Notification Successfully Saved!"
    //         })


    //         // if (results) {
    //         //     UpdateCrfAck(body, (err, results) => {
    //         //         if (err) {
    //         //             logger.logwindow(err)
    //         //             return res.status(200).json({
    //         //                 success: 0,
    //         //                 message: err
    //         //             });
    //         //         }
    //         //         return res.status(200).json({
    //         //             success: 1,
    //         //             message: "Notification Successfully Saved!"
    //         //         })
    //         //     })
    //         // }
    //     }).catch(err => {
    //         return res.status(200).json({
    //             success: 0,
    //             message: "Error Occured"
    //         });
    //     })
    // },


    // if(result) {
    //     StoreToUserAcknowledgement(body, (err, results) => {
    //         if (err) {
    //             logger.logwindow(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         UpdateCrfAck(body, (err, results) => {
    //             if (err) {
    //                 logger.logwindow(err)
    //                 return res.status(200).json({
    //                     success: 0,
    //                     message: err
    //                 });
    //             }
    //             return res.status(200).json({
    //                 success: 1,
    //                 message: "Notification Successfully Saved!"
    //             })
    //         })
    //     })
    // }


    getUserInfoDetails: (req, res) => {
        const body = req.body;
        getUserInfoDetails(body, (err, results) => {
            if (err) {

                return res.status(400).json({
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

    updateStoreAcknow: (req, res) => {
        const body = req.body;
        updateStoreAcknow(body, (err, results) => {
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
                message: "User acknowledgment successfully saved"
            });
        });
    },

    getUserAckDetails: (req, res) => {
        const id = req.params.id
        getUserAckDetails(id, (err, results) => {
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
                datas: results
            });
        });
    },

    updateUserReply: (req, res) => {
        const body = req.body;
        updateUserReply(body, (err, results) => {
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
                message: "Successfully Updated!"
            });
        });
    },

    getReqItemForCRFView: (req, res) => {
        const id = req.params.id
        getReqItemForCRFView(id, (err, results) => {
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


    // storeReceiveUpdate: (req, res) => {
    //     const body = req.body;
    //     storeReceiveUpdate(body, (err, results) => {
    //         if (err) {
    //             logger.logwindow(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         if (!results) {
    //             logger.infologwindow("Record Not Found")
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "Record Not Found"
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             message: "Received"
    //         });
    //     });
    // },
    // grnCountView: (req, res) => {
    //     grnCountView((err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             })
    //         }
    //         if (Object.keys(results).length === 0) {
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "No Data Found",
    //                 data: []
    //             })
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         })
    //     })
    // },



    // getPORecivedList: (req, res) => {
    //     const id = req.params.id
    //     getPORecivedList(id, (err, results) => {
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
    //                 message: "No Results Found"
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         });
    //     });
    // },

    // InsertPoDetailsLog: (req, res) => {
    //     const body = req.body;

    //     InsertPoDetailsLog(body, (err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         updatePOTable(body, (err, results) => {
    //             if (err) {
    //                 logger.logwindow(err)
    //                 return res.status(200).json({
    //                     success: 0,
    //                     message: err
    //                 });
    //             }
    //             if (!results) {
    //                 logger.infologwindow("Record Not Found")
    //                 return res.status(200).json({
    //                     success: 2,
    //                     message: "Record Not Found"
    //                 });
    //             }
    //             return res.status(200).json({
    //                 success: 1,
    //                 message: "Item recived deatils saved",
    //             });
    //         });

    //     });
    // },
    // InsertPoDetailsLogFully: (req, res) => {
    //     const body = req.body;

    //     InsertPoDetailsLogFully(body, (err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         updatePOTableFully(body, (err, results) => {
    //             if (err) {
    //                 logger.logwindow(err)
    //                 return res.status(200).json({
    //                     success: 0,
    //                     message: err
    //                 });
    //             }
    //             if (!results) {
    //                 logger.infologwindow("Record Not Found")
    //                 return res.status(200).json({
    //                     success: 2,
    //                     message: "Record Not Found"
    //                 });
    //             }
    //             id = req.body.req_slno
    //             getPOCompleteCheck(id, (err, results) => {
    //                 if (err) {
    //                     logger.logwindow(err)
    //                     return res.status(400).json({
    //                         success: 2,
    //                         message: err
    //                     });
    //                 }
    //                 if (results.length === 0) {
    //                     updatePOTableStoreReceive(body, (err, results) => {
    //                         if (err) {
    //                             logger.logwindow(err)
    //                             return res.status(200).json({
    //                                 success: 0,
    //                                 message: err
    //                             });
    //                         }
    //                         if (!results) {
    //                             logger.infologwindow("Record Not Found")
    //                             return res.status(200).json({
    //                                 success: 2,
    //                                 message: "Record Not Found"
    //                             });
    //                         }

    //                     });
    //                 }
    //                 return res.status(200).json({
    //                     success: 1,
    //                     message: "Item recived deatils saved",
    //                 });
    //             });
    //         });

    //     });
    // },
    // getPOListSubStorewisePend: (req, res) => {
    //     const id = req.params.id
    //     getPOListSubStorewisePend(id, (err, results) => {
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
    //                 message: "No Results Found"
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         });
    //     });
    // },
    // getPOListSubStorewiseAllList: (req, res) => {
    //     const id = req.params.id
    //     getPOListSubStorewiseAllList(id, (err, results) => {
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
    //                 message: "No Results Found"
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         });
    //     });
    // },

    // SubstoreReciverdataUpdate: (req, res) => {
    //     const body = req.body;

    //     SubstoreReciverdataUpdate(body, (err, results) => {
    //         if (err) {
    //             logger.logwindow(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         if (!results) {
    //             logger.infologwindow("Record Not Found")
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "Record Not Found"
    //             });
    //         }

    //         if (req.body.fully === 1) {
    //             subStoreupdatePODeltTable(body, (err, results) => {
    //                 if (err) {
    //                     logger.logwindow(err)
    //                     return res.status(200).json({
    //                         success: 0,
    //                         message: err
    //                     });
    //                 }
    //                 if (!results) {
    //                     logger.infologwindow("Record Not Found")
    //                     return res.status(200).json({
    //                         success: 2,
    //                         message: "Record Not Found"
    //                     });
    //                 }
    //                 substoreupdatePOTable(body, (err, results) => {

    //                     if (err) {
    //                         logger.logwindow(err)
    //                         return res.status(200).json({
    //                             success: 0,
    //                             message: err
    //                         });
    //                     }
    //                     if (!results) {
    //                         logger.infologwindow("Record Not Found")
    //                         return res.status(200).json({
    //                             success: 2,
    //                             message: "Record Not Found"
    //                         });
    //                     }
    //                     return res.status(200).json({
    //                         success: 1,
    //                         message: "Item recived deatils saved",
    //                     });
    //                 });
    //             });
    //         } else {
    //             return res.status(200).json({
    //                 success: 1,
    //                 message: "Item recived deatils saved",
    //             });
    //         }


    //     });
    // },





}


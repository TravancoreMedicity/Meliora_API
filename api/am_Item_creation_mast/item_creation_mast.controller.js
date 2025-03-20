const logger = require('../../logger/logger');
const { ItemcreationdeptInsert, insertItemAdditional, getInsertData, getItemsFronList, itemInactive,
    getCustdyBasedLastAssetNo, ItemcreationdeptInsertSpare, getCustdyBasedLastSpareNo,
    insertSpareItemAdditional, getInsertSpareData, itemInactiveSpare, getSpareItemsFronList,
    getItemsFronListonlydept, getItemsFronListdeptandsec, getSpareItemsFronListonlydept,
    getSpareItemsFronListdeptandsec, getDataBySerialNoAsset, getdataBySerailNoSpare
} = require('../am_Item_creation_mast/item_creation_mast.service')
module.exports = {
    ItemcreationdeptInsert: (req, res) => {
        const body = req.body;
        var custodian = body.map((val) => {
            return val.item_custodian_dept
        })
        var xx = custodian.find((e) => e)

        getCustdyBasedLastAssetNo(xx, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                let no = 1
                var newList = body.map((val, index) => {
                    return [val.item_creation_slno, val.item_dept_slno, val.item_deptsec_slno,
                    val.item_room_slno, val.item_subroom_slno, val.item_rack_slno, val.item_create_status,
                    val.item_custodian_dept, val.item_custodian_dept_sec, val.item_asset_no, no = no + 1, val.create_user]
                })
                ItemcreationdeptInsert(newList, (err, result) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item creation data inserted successfully"
                    })
                })
            }
            const assetno = JSON.parse(JSON.stringify(results[0]))
            let no = assetno.item_asset_no_only
            var newList = body.map((val, index) => {
                return [val.item_creation_slno, val.item_dept_slno, val.item_deptsec_slno,
                val.item_room_slno, val.item_subroom_slno, val.item_rack_slno, val.item_create_status,
                val.item_custodian_dept, val.item_custodian_dept_sec, val.item_asset_no, no = no + 1, val.create_user]
            })

            ItemcreationdeptInsert(newList, (err, result) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Item creation data inserted successfully"
                })
            })
        });
    },


    insertItemAdditional: (req, res) => {
        const body = req.body;
        getCustdyBasedLastAssetNo(body.item_custodian_dept, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            else {
                const assetno = JSON.parse(JSON.stringify(results[0]))

                let no = assetno.item_asset_no_only
                body.item_asset_no_only = no + 1
                insertItemAdditional(body, (err, result) => {

                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        insertid: result.insertId,
                        message: "Item Added successfully"
                    })
                })
            }
        })

    },

    getInsertData: (req, res) => {
        const body = req.body
        getInsertData(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },

    itemInactive: (req, res) => {
        const body = req.body;

        itemInactive(body, (err, results) => {
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
                message: "Item Inactive successfully"
            })
        })
    },

    getItemsFronList: (req, res) => {
        const body = req.body

        const dept = body.item_dept_slno
        const deptsec = body.item_deptsec_slno
        const itemslno = body.item_creation_slno

        if (dept !== 0 && (deptsec === undefined || deptsec === 0) && (itemslno === undefined || itemslno === 0)) {
            getItemsFronListonlydept(body, (err, results) => {
                if (err) {
                    logger.logwindow(err)
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }

                if (results.length == 0) {
                    logger.infologwindow("No Results Found")
                    return res.status(200).json({
                        success: 0,
                        message: "No Record Found"
                    });
                }

                return res.status(200).json({
                    success: 1,
                    data: results
                });
            })
        }
        else if (dept !== 0 && deptsec !== undefined && (itemslno === undefined || itemslno === 0)) {
            getItemsFronListdeptandsec(body, (err, results) => {
                if (err) {
                    logger.logwindow(err)
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }

                if (results.length == 0) {
                    logger.infologwindow("No Results Found")
                    return res.status(200).json({
                        success: 0,
                        message: "No Record Found"
                    });
                }

                return res.status(200).json({
                    success: 1,
                    data: results
                });
            })
        }
        else {
            getItemsFronList(body, (err, results) => {
                if (err) {
                    logger.logwindow(err)
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }

                if (results.length == 0) {
                    logger.infologwindow("No Results Found")
                    return res.status(200).json({
                        success: 0,
                        message: "No Record Found"
                    });
                }

                return res.status(200).json({
                    success: 1,
                    data: results
                });
            })
        }

    },

    ItemcreationdeptInsertSpare: (req, res) => {
        const body = req.body;

        var custodian = body.map((val) => {
            return val.spare_custodian_dept
        })
        var xx = custodian.find((e) => e)

        getCustdyBasedLastSpareNo(xx, (err, results) => {

            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
                let no = 1
                var newList = body.map((val, index) => {
                    return [val.spare_creation_slno, val.spare_dept_slno, val.spare_deptsec_slno,
                    val.spare_room_slno, val.spare_subroom_slno, val.spare_rack_slno, val.spare_create_status,
                    val.spare_custodian_dept, val.spare_custodian_dept_sec, val.spare_asset_no, no = no + 1, val.create_user]
                })

                ItemcreationdeptInsertSpare(newList, (err, result) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item creation data inserted successfully"
                    })
                })
            }
            const assetno = JSON.parse(JSON.stringify(results[0]))
            let no = assetno.spare_asset_no_only === undefined ? 0 : assetno.spare_asset_no_only
            var newList = body.map((val, index) => {
                return [val.spare_creation_slno, val.spare_dept_slno, val.spare_deptsec_slno,
                val.spare_room_slno, val.spare_subroom_slno, val.spare_rack_slno, val.spare_create_status,
                val.spare_custodian_dept, val.spare_custodian_dept_sec, val.spare_asset_no, no = no + 1, val.create_user]
            })
            ItemcreationdeptInsertSpare(newList, (err, result) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Item creation data inserted successfully"
                })
            })
        });
    },

    insertSpareItemAdditional: (req, res) => {
        const body = req.body;
        getCustdyBasedLastSpareNo(body.spare_custodian_dept, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            else {
                const assetno = JSON.parse(JSON.stringify(results[0]))

                let no = assetno.spare_asset_no_only
                body.spare_asset_no_only = no + 1
                insertSpareItemAdditional(body, (err, result) => {

                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        insertid: result.insertId,
                        message: "Item Added successfully"
                    })
                })
            }
        })

    },
    getInsertSpareData: (req, res) => {
        const body = req.body
        getInsertSpareData(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },

    itemInactiveSpare: (req, res) => {
        const body = req.body;

        itemInactiveSpare(body, (err, results) => {
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
                message: "Item Inactive successfully"
            })
        })
    },

    getSpareItemsFronList: (req, res) => {
        const body = req.body

        const dept = body.spare_dept_slno
        const deptsec = body.spare_deptsec_slno
        const itemslno = body.spare_creation_slno

        if (dept !== 0 && (deptsec === undefined || deptsec === 0) && (itemslno === undefined || itemslno === 0)) {
            getSpareItemsFronListonlydept(body, (err, results) => {
                if (err) {
                    logger.logwindow(err)
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }

                if (results.length == 0) {
                    logger.infologwindow("No Results Found")
                    return res.status(200).json({
                        success: 0,
                        message: "No Record Found"
                    });
                }

                return res.status(200).json({
                    success: 1,
                    data: results
                });
            })
        }
        else if (dept !== 0 && deptsec !== undefined && (itemslno === undefined || itemslno === 0)) {
            getSpareItemsFronListdeptandsec(body, (err, results) => {
                if (err) {
                    logger.logwindow(err)
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }

                if (results.length == 0) {
                    logger.infologwindow("No Results Found")
                    return res.status(200).json({
                        success: 0,
                        message: "No Record Found"
                    });
                }

                return res.status(200).json({
                    success: 1,
                    data: results
                });
            })
        }
        else {
            getSpareItemsFronList(body, (err, results) => {
                if (err) {
                    logger.logwindow(err)
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }

                if (results.length == 0) {
                    logger.infologwindow("No Results Found")
                    return res.status(200).json({
                        success: 0,
                        message: "No Record Found"
                    });
                }

                return res.status(200).json({
                    success: 1,
                    data: results
                });
            })
        }

    },
    getDataBySerialNoAsset: (req, res) => {
        const body = req.body
        getDataBySerialNoAsset(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getdataBySerailNoSpare: (req, res) => {
        const body = req.body
        getdataBySerailNoSpare(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
}
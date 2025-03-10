const { insertCondemMasterData, insertCondemDetailData, UpdateItemDetails, getItemDetails, getItemSlno,
    updateCondemMasterData, getpendingApprovals, getItemUnderForm, updateScarpStoreData, ApproveData
} = require('./am_condem.service')
module.exports = {


    insertCondemMasterData: (req, res) => {
        const body = req.body;
        insertCondemMasterData(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            } else {
                const condem_mast_slno = result.insertId;
                const details = body.deatilData.map((item) => ({
                    condem_mast_slno: condem_mast_slno,
                    am_asset_item_slno: item.type === 'asset' ? item.am_item_map_slno : null,
                    am_spare_item_slno: item.type === 'spare' ? item.am_spare_item_map_slno : null,
                    item_status: 1
                }));
                Promise.all(details.map((postdata) => {
                    return new Promise((resolve, reject) => {
                        insertCondemDetailData(postdata, (err, results) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(results);
                            }
                        });
                    });
                }))
                    .then(() => {
                        return res.status(200).json({
                            success: 1,
                            condem_mast_slno: condem_mast_slno
                        });
                    })
                    .catch((error) => {
                        return res.status(200).json({
                            success: 0,
                            message: error
                        });
                    });
            }
        });
    },

    UpdateItemDetails: (req, res) => {
        const body = req.body;
        UpdateItemDetails(body, (err, results) => {
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
                message: "Details Added Successfully",
            })
        })
    },
    updateCondemMasterData: (req, res) => {
        const body = req.body;
        updateCondemMasterData(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in Form Submittion"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Form Submitted Succesfully",
            })
        })
    },
    // ApproveData: (req, res) => {
    //     const body = req.body;
    //     ApproveData(body, (err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             })
    //         }
    //         if (results === 0) {
    //             return res.status(200).json({
    //                 success: 1,
    //                 message: "Unable to Update"

    //             })
    //         }
    //         return res.status(200).json({
    //             success: 2,
    //             message: "Condemnation Form Approved",
    //         })
    //     })
    // },


    updateScarpStoreData: (req, res) => {
        const body = req.body;
        updateScarpStoreData(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "Unable to Update"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Item Added to ScrapStore",
            })
        })
    },


    getItemDetails: (req, res) => {
        const body = req.body;
        getItemDetails(body, (err, results) => {
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
    getpendingApprovals: (req, res) => {
        const body = req.body;
        getpendingApprovals(body, (err, results) => {
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
    getItemUnderForm: (req, res) => {
        const body = req.body;
        getItemUnderForm(body, (err, results) => {

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


    getItemSlno: (req, res) => {
        const body = req.body;
        getItemSlno(body, (err, results) => {
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
    ApproveData: (data, callback) => {

        console.log("datffffa", data);

        if (data.condem_mast_slno) {

            let sql = "UPDATE am_condemnation_master SET";
            const queryParams = [];
            const fieldsToUpdate = [];

            Object.keys(data).forEach((key) => {
                if (key !== "condem_mast_slno" && data[key] !== undefined) {
                    fieldsToUpdate.push(`${key} = ?`);
                    queryParams.push(data[key]);
                }
            });

            if (fieldsToUpdate.length === 0) {
                return callback("No fields to update");
            }

            sql += ` ${fieldsToUpdate.join(", ")} WHERE condem_mast_slno = ?`;
            queryParams.push(data.condem_mast_slno);

            pool.query(sql, queryParams, (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
        }
    }
    // ApproveData: (data, res) => {
    //     console.log("data", data);


    //     if (data.condem_mast_slno) {

    //         let sql = "UPDATE am_condemnation_master SET";
    //         const queryParams = [];
    //         const fieldsToUpdate = [];
    //         Object.keys(data).forEach((key) => {
    //             if (key !== "condem_mast_slno" && data[key] !== undefined) {
    //                 fieldsToUpdate.push(`${key} = ?`);
    //                 queryParams.push(data[key]);
    //             }
    //         });
    //         if (fieldsToUpdate.length === 0) {
    //             return res.status(400).json({ success: 0, message: "No fields to update" });
    //         }
    //         sql += ` ${fieldsToUpdate.join(", ")} WHERE condem_mast_slno = ?`;
    //         queryParams.push(data.condem_mast_slno);
    //         pool.query(sql, queryParams, (error, results) => {
    //             if (error) {
    //                 return res.status(500).json({ success: 0, message: error });
    //             }
    //             if (results.affectedRows === 0) {
    //                 return res.status(200).json({ success: 1, message: "Unable to Update" });
    //             }
    //             return res.status(200).json({ success: 2, message: "Condemnation Form Approved" });
    //         });
    //     }
    // }
}
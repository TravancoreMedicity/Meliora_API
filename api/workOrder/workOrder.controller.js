
const { pool } = require('../../config/database')
const { getCRFDatas,
    insertWorkOrderMain,
    insertMaterialDetails,
    insertLabourDetails,
    insertRetentionDetails,
    insertTerms,
    insertPaymentTerms,
    insertBillingTerms,
    getWorkOrderDetails,
    getmaterialData,
    getLastWoNumber,
    woLevelApproval,
    updateWoApprovalStatus,
    getApprovedWo,
    getCrfItem } = require('./workOrder.service')
module.exports = {

    getCRFDatas: (req, res) => {

        getCRFDatas((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
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

    insertWorkOrderDetails: (req, res) => {
        const data = req.body;
        // console.log("data:", data);

        pool.getConnection((err, connection) => {
            if (err) {
                return res.status(500).json({ success: 0, message: err.message });
            }
            connection.beginTransaction(async (err) => {

                if (err) {
                    connection.release();
                    return res.status(500).json({ success: 0, message: err.message });
                }

                try {
                    // 1️⃣ MAIN TABLE
                    // if (Object.values(data.vendor_detail)?.length>0) {
                    //     const woMainResult = await insertWorkOrderMain(connection, data.vendor_details);
                    // const woMainSlno = woMainResult.insertId;

                    // // 2️⃣ MATERIAL
                    // await insertMaterialDetails(connection, woMainSlno, data.material_details);

                    // // 3️⃣ LABOUR
                    // await insertLabourDetails(connection, woMainSlno, data.labour_details);

                    // // 4️⃣ RETENTION
                    // await insertRetentionDetails(connection, woMainSlno, data.retention_details);

                    // // 5️⃣ TERMS
                    // await insertTerms(connection, woMainSlno, data.terms_details);

                    // // 6️⃣ PAYMENT TERMS
                    // await insertPaymentTerms(connection, woMainSlno, data.payment_terms_details);

                    // // 7️⃣ BILLING TERMS
                    // await insertBillingTerms(connection, woMainSlno, data.billing_terms_details);

                    // }

                    if (data.vendor_details && Object.keys(data.vendor_details).length > 0) {

                        const woMainResult = await insertWorkOrderMain(connection, data.vendor_details);
                        const woMainSlno = woMainResult.insertId;

                        if (Array.isArray(data.material_details) && data.material_details.length > 0) {
                            await insertMaterialDetails(connection, woMainSlno, data.material_details);
                        }

                        if (Array.isArray(data.labour_details) && data.labour_details.length > 0) {
                            await insertLabourDetails(connection, woMainSlno, data.labour_details);
                        }

                        if (data.retention_details) {
                            await insertRetentionDetails(connection, woMainSlno, data.retention_details);
                        }

                        if (data.terms_details?.validUpto) {
                            await insertTerms(connection, woMainSlno, data.terms_details);
                        }

                        if (data.payment_terms_details?.validUpto) {
                            await insertPaymentTerms(connection, woMainSlno, data.payment_terms_details);
                        }

                        if (data.billing_terms_details?.validUpto) {
                            await insertBillingTerms(connection, woMainSlno, data.billing_terms_details);
                        }
                    }


                    connection.commit(() => {
                        connection.release();
                        res.status(200).json({
                            success: 1,
                            message: 'Work Order Created Successfully'
                        });
                    });

                } catch (error) {
                    connection.rollback(() => {
                        connection.release();
                        res.status(500).json({
                            success: 0,
                            message: error.message
                        });
                    });
                }
            });
        });
    },

    getWorkOrderDetails: (req, res) => {
        const levelNo = Number(req.query.level_no);

        getWorkOrderDetails(levelNo, (error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }

            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No data",
                    data: [],
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },

    getmaterialData: (req, res) => {
        const id = req.params.id;
        getmaterialData(id, (error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "no data",
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
    getLastWoNumber: (req, res) => {
        getLastWoNumber((error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "no data",
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },

    woLevelApproval: (req, res) => {
        const data = req.body; // 👈 array directly
        if (data.length === 0) {
            return res.status(400).json({
                success: 0,
                message: "Invalid data"
            });
        }
        woLevelApproval(data, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            // return res.status(200).json({
            //     success: 1,
            //     message: "Work Order Approved Successfully"
            // });

            updateWoApprovalStatus(data, (err, results) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: "Work Order Approved Successfully"
                });
            });

        });

    },

    getApprovedWo: (req, res) => {
        const empid = Number(req.query.empid);

        getApprovedWo(empid, (error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }

            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No data",
                    data: [],
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },

    getCrfItem: (req, res) => {
        const id = req.params.id;
        getCrfItem(id, (error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "no data",
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
}


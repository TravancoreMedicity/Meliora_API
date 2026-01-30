
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
    updateWoApprovalStatus } = require('./workOrder.service')
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
                    const woMainResult = await insertWorkOrderMain(connection, data.vendor_details);
                    const woMainSlno = woMainResult.insertId;

                    // 2️⃣ MATERIAL
                    await insertMaterialDetails(connection, woMainSlno, data.material_details);

                    // 3️⃣ LABOUR
                    await insertLabourDetails(connection, woMainSlno, data.labour_details);

                    // 4️⃣ RETENTION
                    await insertRetentionDetails(connection, woMainSlno, data.retention_details);

                    // 5️⃣ TERMS
                    await insertTerms(connection, woMainSlno, data.termsConditions);

                    // 6️⃣ PAYMENT TERMS
                    await insertPaymentTerms(connection, woMainSlno, data.paymentTerms);

                    // 7️⃣ BILLING TERMS
                    await insertBillingTerms(connection, woMainSlno, data.billingTerms);

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
}


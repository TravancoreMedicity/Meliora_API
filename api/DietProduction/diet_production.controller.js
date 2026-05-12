const {
    createProductionBatch,
    GetProductionMapingData,
    getKitchenItemList,
    updateKitchenBatchStatusService,
    updateBatchStatus,
    CompletedBatchStatus,
    CancelProductionBatch,
    getAllOrderStatusDetail
} = require('./diet_production.service');

module.exports = {

    createProductionBatch: (req, res) => {

        const {
            BatchDetail,
            SelectedOrders,
            processed_by,
            remark
        } = req.body;

        if (
            !Array.isArray(BatchDetail) ||
            !BatchDetail.length
        ) {
            return res.status(200).json({
                success: 0,
                message: "Batch detail missing"
            });
        }

        if (
            !Array.isArray(SelectedOrders) ||
            !SelectedOrders.length
        ) {
            return res.status(200).json({
                success: 0,
                message: "No selected orders"
            });
        }

        if (!remark) {
            return res.status(200).json({
                success: 0,
                message: "Batch Remark Required"
            });
        }

        createProductionBatch(
            BatchDetail,
            SelectedOrders,
            processed_by, remark,
            (err, results) => {

                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: "Production batch created",
                    data: results
                });
            }
        );
    },
    GetProductionMapingData: (req, res) => {
        GetProductionMapingData((err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: "Error in Fetching Production Maping"
                })
            }

            return res.status(200).json({
                success: 1,
                message: "Data Fetching SuccessFully!",
                data: result
            })
        })
    },

    getKitchenItemList: (req, res) => {
        getKitchenItemList((err, result) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: "Error in Fetching Production Maping"
                })
            }

            return res.status(200).json({
                success: 1,
                message: "Data Fetching SuccessFully!",
                data: result
            })
        })
    },
    updateKitchenBatchStatus: (req, res) => {

        const {
            items,
            kitchen_status,
            emp_id
        } = req.body;

        // VALIDATION
        if (
            !Array.isArray(items) ||
            items.length === 0
        ) {
            return res.status(400).json({
                success: 0,
                message: "Item Detail is required"
            });
        }

        if (!kitchen_status) {
            return res.status(400).json({
                success: 0,
                message: "kitchen_status is required"
            });
        }

        updateKitchenBatchStatusService(
            items,
            kitchen_status,
            emp_id,
            (err, result) => {

                if (err) {

                    console.log(err);

                    return res.status(500).json({
                        success: 0,
                        message: "Error in kitchen status update"
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: "Kitchen status updated successfully",
                    data: result
                });
            }
        );
    },

    updateBatchStatus: (req, res) => {

        const {
            items,
            kitchen_status
        } = req.body;

        // VALIDATION
        if (
            !Array.isArray(items) ||
            items.length === 0
        ) {
            return res.status(400).json({
                success: 0,
                message: "Item Detail is required"
            });
        }

        if (!kitchen_status) {
            return res.status(400).json({
                success: 0,
                message: "kitchen_status is required"
            });
        }

        updateBatchStatus(
            items,
            kitchen_status,
            (err, result) => {

                if (err) {

                    console.log(err);

                    return res.status(500).json({
                        success: 0,
                        message: "Error in kitchen status update"
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: "Batch Sent to Kitchen!",
                    data: result
                });
            }
        );
    },

    CompletedBatchStatus: (req, res) => {
        const {
            batch_id,
            kitchen_status
        } = req.body;

        if (!kitchen_status) {
            return res.status(400).json({
                success: 0,
                message: "kitchen_status is required"
            });
        }

        if (!batch_id) {
            return res.status(400).json({
                success: 0,
                message: "Batch Id is required"
            });
        }


        CompletedBatchStatus(
            batch_id,
            kitchen_status,
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Error in kitchen status update"
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: "Batch Completed SuccessFully!",
                });
            }
        );
    },


    CancelProductionBatch: (req, res) => {
        const {
            batch_id,
            kitchen_status,
            cancelled_by
        } = req.body;

        if (!kitchen_status) {
            return res.status(400).json({
                success: 0,
                message: "kitchen_status is required"
            });
        }

        if (!batch_id) {
            return res.status(400).json({
                success: 0,
                message: "Batch Id is required"
            });
        }

        if (!cancelled_by) {
            return res.status(400).json({
                success: 0,
                message: "Employee Detail is Missing"
            });
        }
        CancelProductionBatch(
            batch_id,
            kitchen_status,
            cancelled_by,
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Error in Cancelling Batch!"
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: "Cancelled Batch!",
                });
            }
        );
    },

getAllOrderStatusDetail: (req, res) => {
        getAllOrderStatusDetail((err, result) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: "Error in Fetching Production Maping"
                })
            }

            return res.status(200).json({
                success: 1,
                message: "Data Fetching SuccessFully!",
                data: result
            })
        })
    }

    


};
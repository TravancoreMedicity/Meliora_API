const {
    insertDietProductionBatch,
    getAllDietProductionBatch,
    updateDietProductionBatch,
    getAllBatchProductionItem
} = require('./dietproductionbatch.service.js');

module.exports = {

    insertDietProductionBatch: (req, res) => {
        const { batch, itemDetail } = req.body;

      
        if (!Array.isArray(batch) || batch.length === 0) {
            return res.status(200).json({
                success: 0,
                message: "Invalid Batch Data"
            });
        }

        insertDietProductionBatch(batch, itemDetail, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Batch + Items Inserted Successfully"
            });
        });
    },
    // insertDietProductionBatch: (req, res) => {
    //     const { batch, itemDetail } = req.body;

    //     console.log({
    //         itemDetail,
    //         batch
    //     });

    //     // Validate batch
    //     if (!Array.isArray(batch) || batch.length === 0) {
    //         return res.status(200).json({
    //             success: 0,
    //             message: "Invalid Batch Data"
    //         });
    //     }

    //     // Validate itemDetail
    //     if (!Array.isArray(itemDetail) || itemDetail.length === 0) {
    //         return res.status(200).json({
    //             success: 0,
    //             message: "No items found. Cannot insert any batch."
    //         });
    //     }

    //     // Filter batches that have items
    //     const validBatches = batch.filter(b => {
    //         // Check if there is at least one item for this batch type_id
    //         return itemDetail.some(item => item.type_id === b.type_id);
    //     });

    //     // Identify batches that were skipped
    //     const skippedBatches = batch.filter(b => !validBatches.includes(b));

    //     if (validBatches.length === 0) {
    //         return res.status(200).json({
    //             success: 0,
    //             message: "No items found for any batch. Cannot insert."
    //         });
    //     }

    //     // Proceed with insertion only for batches with items
    //     insertDietProductionBatch(validBatches, itemDetail, (err, results) => {
    //         if (err) {
    //             return res.status(500).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }

    //         let message = "Batch + Items Inserted Successfully";
    //         if (skippedBatches.length > 0) {
    //             message += `. Skipped ${skippedBatches.length} batch(es) with no items: ${skippedBatches.map(b => b.type_id).join(", ")}`;
    //         }

    //         return res.status(200).json({
    //             success: 2,
    //             data: results,
    //             message
    //         });
    //     });
    // },


    getAllDietProductionBatch: (req, res) => {
        const { date } = req.body;
        getAllDietProductionBatch(date, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    data: [],
                    message: "No Batch Process"
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Fetched Successfully"
            });

        });

    },


    getAllBatchProductionItem: (req, res) => {
        const { date } = req.body;

        getAllBatchProductionItem(date, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    data: [],
                    message: "No Batch Process"
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Fetched Successfully"
            });

        });

    },



    updateDietProductionBatch: (req, res) => {

        const data = req.body;

        const { production_date, type_id, batch_id } = data;

        if (!batch_id) {
            return res.status(200).json({
                success: 0,
                message: "Batch ID is required"
            });
        }

        if (!production_date) {
            return res.status(200).json({
                success: 0,
                message: "Production Date is required"
            });
        }

        if (!type_id) {
            return res.status(200).json({
                success: 0,
                message: "Type is required"
            });
        }

        updateDietProductionBatch(data, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Updated Successfully"
            });

        });

    }

};
const {
    insertItemMaster,
    getAllItemMaster,
    updateItemMaster,
    getItemFullDetail,
    getFoodandBeverage,
    checkAliasAndCodeExists
} = require('./itemmaster.service');

module.exports = {

    // insertItemMaster: (req, res) => {


    //     // Required validation
    //     if (!data.item_name || !data.item_group_id || !data.item_category_id) {
    //         return res.status(200).json({
    //             success: 0,
    //             message: "Required fields missing"
    //         });
    //     }
    //     // Clean ingredients
    //     if (data.ingredients && data.ingredients.length === 0) {
    //         delete data.ingredients;
    //     }

    //     // Clean rates
    //     if (data.itemrate && data.itemrate.length === 0) {
    //         delete data.itemrate;
    //     }

    //     insertItemMaster(data, (err, result) => {
    //         if (err) {
    //             console.log("INSERT ITEM ERROR :", err);
    //             return res.status(200).json({
    //                 success: 0,
    //                 stage: err.stage || "UNKNOWN",
    //                 message: err.message || err
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 2,
    //             item_id: result.item_id,   // send id
    //             message: "Item Inserted Successfully"
    //         });

    //     });
    // },

    insertItemMaster: (req, res) => {
        const data = req.body;

        if (!data.item_name || !data.item_group_id || !data.item_category_id) {
            return res.status(200).json({
                success: 0,
                message: "Required fields missing"
            });
        }

        checkAliasAndCodeExists(
            data.item_alias,
            data.item_code,
            (err, result) => {

                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }

                if (result.aliasExists) {
                    return res.status(200).json({
                        success: 0,
                        message: "Item Alias already exists"
                    });
                }

                if (result.codeExists) {
                    return res.status(200).json({
                        success: 0,
                        message: "Item Code already exists"
                    });
                }

                // If both are unique, continue insert

                if (data.ingredients?.length === 0) {
                    delete data.ingredients;
                }

                if (data.itemrate?.length === 0) {
                    delete data.itemrate;
                }

                insertItemMaster(data, (err, result) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            stage: err.stage || "UNKNOWN",
                            message: err.message || err
                        });
                    }

                    return res.status(200).json({
                        success: 2,
                        item_id: result.item_id,
                        message: "Item Inserted Successfully"
                    });
                });
            }
        );
    },
    getAllItemMaster: (req, res) => {
        getAllItemMaster((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "No Results Found",
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Fetched Successfully"
            });

        });

    },
    getItemFullDetail: (req, res) => {
        getItemFullDetail((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "No Results Found",
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Fetched Successfully"
            });

        });
    },
    getFoodandBeverage: (req, res) => {
        getFoodandBeverage((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "No Results Found",
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Fetched Successfully"
            });

        });
    },

    updateItemMaster: (req, res) => {

        const data = req.body;

        if (!data.item_id) {
            return res.status(200).json({
                success: 0,
                message: "Item ID missing"
            });
        }

        updateItemMaster(data, (err, result) => {

            if (err) {

                console.log(err);

                return res.status(200).json({
                    success: 0,
                    stage: err.stage,
                    message: err.message
                });
            }

            return res.status(200).json({
                success: 2,
                message: "Item Updated Successfully"
            });

        });

    },



};
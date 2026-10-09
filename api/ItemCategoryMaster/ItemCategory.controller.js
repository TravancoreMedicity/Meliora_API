
const {
    insertItemGroupMaster,
    getAllItemGroupMaster,
    updateItemGroupMaster
} = require('../item_group/itemgroup.service');
const { insertItemCatMaster, getAllItemCatMaster, updateItemCatMaster, getAllItemCategory } = require('./ItemCategory.service');
module.exports = {

    insertCategoryItemMaster: (req, res) => {
        const data = req.body;
        const { item_group_id, category_name, category_code } = data;

        // Minimal validation

        if (!item_group_id) {
            return res.status(200).json({
                success: 0,
                message: "Group Id is required"
            });
        }

        if (!category_name || category_name.trim() === "") {
            return res.status(200).json({
                success: 0,
                message: "Category Name is required"
            });
        }

        if (!category_code || category_code.trim() === "") {
            return res.status(200).json({
                success: 0,
                message: "Category code is required"
            });
        }

        // Call insert function
        insertItemCatMaster(data, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err.message || err
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
                data: results
            });
        });
    },
    getItemCategoryMaster: (req, res) => {
        getAllItemCatMaster((err, results) => {
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
                    data: results

                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Inserted SuccessFully",
            });
        });
    },
    getAllItemCategory: (req, res) => {
        const data = req.body;

        getAllItemCategory(data, (err, results) => {
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
                    data: results

                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Inserted SuccessFully",
            });
        });
    },
    updateItemCategoryMaster: (req, res) => {
        const data = req.body;
        const { item_group_id, category_name, category_code } = data;
        // Minimal validation
        if (!item_group_id) {
            return res.status(200).json({
                success: 0,
                message: "Group Id is required"
            });
        }

        if (!category_name || category_name.trim() === "") {
            return res.status(200).json({
                success: 0,
                message: "Category Name is required"
            });
        }

        if (!category_code || category_code.trim() === "") {
            return res.status(200).json({
                success: 0,
                message: "Category code is required"
            });
        }
        updateItemCatMaster(data, (err, results) => {
            if (err) {
                // logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "No Results Found",
                    data: results

                });
            }
            return res.status(200).json({
                success: 2,
                data: results,
                message: "Updated SuccessFully",
            });
        });
    }


}


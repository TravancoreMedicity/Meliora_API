const {
    insertBillingCategoryService,
    getAllBillingCategoryService,
    updateBillingCategoryService
} = require('./billingcategorymaster.service');

module.exports = {

    insertBillingCategory: (req, res) => {

        insertBillingCategoryService(req.body, (err, results) => {

            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Category Inserted Successfully",
                data: results
            });
        });
    },

    getAllBillingCategory: (req, res) => {

        getAllBillingCategoryService((err, results) => {

            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                message: results?.length ? "Fetched Successfully" : "No Data Found",
                data: results || []
            });
        });
    },

    updateBillingCategory: (req, res) => {

        updateBillingCategoryService(req.body, (err, results) => {

            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                message: "Category Updated Successfully",
                data: results
            });
        });
    }

};
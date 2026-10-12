const {
    insertDietTemplateFood,
    getAllDietTemplateFood,
    updateDietTemplateFoodBulk,
    inactiveDietFoodItem
} = require('./diettemplatefood.service');

module.exports = {

    insertDietTemplateFood: (req, res) => {
        const data = req.body;
        if (!Array.isArray(data) || data.length === 0) {
            return res.status(200).json({
                success: 0,
                message: "No diet template food data provided"
            });
        }
        insertDietTemplateFood(data, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                data: results,
                message: "Diet Template Food Inserted Successfully"
            });

        });
    },

    getAllDietTemplateFood: (req, res) => {
        const data = req.body;
        getAllDietTemplateFood(data, (err, results) => {

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
    updateDietTemplateFood: (req, res) => {
        const data = req.body;
        // Validate input
        if (!Array.isArray(data) || data.length === 0) {
            return res.status(200).json({
                success: 0,
                message: "No data provided for update"
            });
        }
        updateDietTemplateFoodBulk(data, (err, results) => {
            // If error from service
            if (err) {
                return res.status(200).json({
                    success: err.success || 0,
                    message: err.message || "Update failed",
                    failedItem: err.failedItem || null,
                    error: err.error || null
                });
            }
            // Success response
            return res.status(200).json({
                success: 2,
                data: results,
                message: "Batch updated successfully"
            });
        });
    },
    inactiveDietFoodItem: (req, res) => {
        const data = req.body;
        // Validate input
        if (!data.template_food_id) {
            return res.status(200).json({
                success: 0,
                message: "Template id is Missing"
            });
        }

        inactiveDietFoodItem(data, (err, results) => {
            // If error from service
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: "Error in Updating Status"
                });
            }
            // Success response
            return res.status(200).json({
                success: 2,
                data: results,
                message: "Updated successfully"
            });
        });
    },




};
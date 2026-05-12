const {
    insertDietPrice,
    getDietPrice,
    updateDietPrice
} = require('./dietpricemaster.service');

module.exports = {

    // INSERT
    insertDietPrice: (req, res) => {

        const data = req.body;

        // REQUIRED FIELD VALIDATION
        if (!data.diet_id) {
            return res.status(200).json({
                success: 0,
                message: "Diet is required"
            });
        }

        if (!data.diet_rm_category_slno) {
            return res.status(200).json({
                success: 0,
                message: "Room category is required"
            });
        }

        if (!data.party_type_id) {
            return res.status(200).json({
                success: 0,
                message: "Party type is required"
            });
        }

        if (!data.created_by) {
            return res.status(200).json({
                success: 0,
                message: "Created user required"
            });
        }

        // NUMBER VALIDATION
        if (data.daily_rate && isNaN(data.daily_rate)) {
            return res.status(200).json({
                success: 0,
                message: "Daily rate must be a number"
            });
        }

        if (data.half_day_rate && isNaN(data.half_day_rate)) {
            return res.status(200).json({
                success: 0,
                message: "Half day rate must be a number"
            });
        }

        if (data.gst_rate && isNaN(data.gst_rate)) {
            return res.status(200).json({
                success: 0,
                message: "GST must be a number"
            });
        }

        // NEGATIVE VALIDATION
        if (data.daily_rate < 0 || data.half_day_rate < 0) {
            return res.status(200).json({
                success: 0,
                message: "Rates cannot be negative"
            });
        }

        if (data.gst_rate < 0 || data.gst_rate > 100) {
            return res.status(200).json({
                success: 0,
                message: "GST must be between 0 and 100"
            });
        }

        insertDietPrice(data, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    stage: err.stage || "UNKNOWN",
                    message: err.message || err
                });
            }

            return res.status(200).json({
                success: 2,
                message: "Diet Price Inserted Successfully"
            });
        });
    },


    // GET
    getDietPrice: (req, res) => {
        const data = req.body;
        getDietPrice(data, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    data: [],
                    message: "No Data Found"
                });
            }

            return res.status(200).json({
                success: 2,
                data: results
            });
        });
    },


    // UPDATE
    updateDietPrice: (req, res) => {

        const data = req.body;

        if (!data.diet_price_id) {
            return res.status(200).json({
                success: 0,
                message: "Price ID required"
            });
        }

        if (!data.updated_by) {
            return res.status(200).json({
                success: 0,
                message: "Updated user required"
            });
        }

        // NUMBER VALIDATION
        if (data.daily_rate && isNaN(data.daily_rate)) {
            return res.status(200).json({
                success: 0,
                message: "Daily rate must be a number"
            });
        }

        if (data.half_day_rate && isNaN(data.half_day_rate)) {
            return res.status(200).json({
                success: 0,
                message: "Half day rate must be a number"
            });
        }

        if (data.gst_rate && isNaN(data.gst_rate)) {
            return res.status(200).json({
                success: 0,
                message: "GST must be a number"
            });
        }

        // NEGATIVE CHECK
        if (data.daily_rate < 0 || data.half_day_rate < 0) {
            return res.status(200).json({
                success: 0,
                message: "Rates cannot be negative"
            });
        }

        if (data.gst_rate < 0 || data.gst_rate > 100) {
            return res.status(200).json({
                success: 0,
                message: "GST must be between 0 and 100"
            });
        }

        updateDietPrice(data, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    stage: err.stage || "UPDATE",
                    message: err.message || err
                });
            }

            return res.status(200).json({
                success: 2,
                message: "Updated Successfully"
            });
        });
    }

};
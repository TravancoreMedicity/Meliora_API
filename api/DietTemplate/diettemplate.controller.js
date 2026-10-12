const {
    insertDietTemplate,
    getAllDietTemplate,
    updateDietTemplate,
    checkDateOverlap,
    checkDateOverlapForUpdate
} = require('./diettemplate.service');

module.exports = {

    insertDietTemplate: (req, res) => {

        const data = req.body;
        const { template_name, diet_id, effective_from, effective_to } = data;

        if (!template_name || template_name.trim() === "") {
            return res.status(200).json({
                success: 0,
                message: "Template Name is required"
            });
        }

        if (!diet_id) {
            return res.status(200).json({
                success: 0,
                message: "Diet is required"
            });
        }

        // DATE VALIDATION
        if (new Date(effective_to) <= new Date(effective_from)) {
            return res.status(200).json({
                success: 0,
                message: "Effective To must be greater than Effective From"
            });
        }

        // STEP 1: CHECK OVERLAP
        checkDateOverlap(data, (err, results) => {

            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length > 0) {
                return res.status(200).json({
                    success: 0,
                    message: "Date range overlaps with existing diet template"
                });
            }

            //  STEP 2: INSERT
            insertDietTemplate(data, (err, results) => {

                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: err
                    });
                }

                return res.status(200).json({
                    success: 1,
                    data: results,
                    message: "Successfully Inserted"
                });

            });

        });

    },
    getAllDietTemplate: (req, res) => {

        getAllDietTemplate((err, results) => {

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
                message: "Fetched Successfully"
            });

        });

    },

    updateDietTemplate: (req, res) => {

        const data = req.body;
        const { template_name, diet_id, effective_from, effective_to, template_id } = data;

        if (!template_name || template_name.trim() === "") {
            return res.status(200).json({
                success: 0,
                message: "Template Name is required"
            });
        }

        if (!diet_id) {
            return res.status(200).json({
                success: 0,
                message: "Diet is required"
            });
        }

        if (!template_id) {
            return res.status(200).json({
                success: 0,
                message: "Template ID is required"
            });
        }

        //  DATE VALIDATION
        if (new Date(effective_to) <= new Date(effective_from)) {
            return res.status(200).json({
                success: 0,
                message: "Effective To must be greater than Effective From"
            });
        }

        //  STEP 1: CHECK OVERLAP (excluding current record)
        checkDateOverlapForUpdate(data, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length > 0) {
                return res.status(200).json({
                    success: 0,
                    message: "Date range overlaps with existing diet template"
                });
            }

            //  STEP 2: UPDATE
            updateDietTemplate(data, (err, results) => {

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

        });

    },

};
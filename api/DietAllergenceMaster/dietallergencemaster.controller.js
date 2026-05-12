const {
    insertDietAllergenceService,
    getAllDietAllergenceService,
    updateAllergenceService,
} = require('./dietallergencemaster.service');

module.exports = {

    insertDietAllergenMaster: (req, res) => {
        insertDietAllergenceService(req.body, (err, results) => {

            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Successfully Inserted",
                data: results
            });
        });
    },

    getAllDietAllergenceMaster: (req, res) => {

        getAllDietAllergenceService((err, results) => {

            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                message: results?.length ? "Fetched Successfully" : "No Results Found",
                data: results || []
            });
        });
    },

    updateDietAllergenceMaster: (req, res) => {

        updateAllergenceService(req.body, (err, results) => {

            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                message: "Updated Successfully",
                data: results
            });
        });
    }

};
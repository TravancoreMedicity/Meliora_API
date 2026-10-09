const { insertUnitMaster, getAllUnitMaster, updateUnitMaster } = require("./unitMaster.service");

module.exports = {

    insertUnitMaster: (req, res) => {
        const data = req.body;
        const { unit_name, unit_code, unit_type } = data;

        if (!unit_name || unit_name.trim() === "") {
            return res.status(200).json({
                success: 0,
                message: "Unit Name is required"
            });
        }

        if (!unit_code || unit_code.trim() === "") {
            return res.status(200).json({
                success: 0,
                message: "Unit Code is required"
            });
        }

        if (!unit_type || unit_type.trim() === "") {
            return res.status(200).json({
                success: 0,
                message: "Unit Type is required"
            });
        }

        insertUnitMaster(data, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err.message || err
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Successfully Inserted!"
            });
        });
    },

    getAllUnitMaster: (req, res) => {

        getAllUnitMaster((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results || results.length === 0) {
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

    updateUnitMaster: (req, res) => {
        const data = req.body;
        const { unit_name, unit_code, unit_type } = data;

        if (!unit_name || unit_name.trim() === "") {
            return res.status(200).json({
                success: 0,
                message: "Unit Name is required"
            });
        }

        if (!unit_code || unit_code.trim() === "") {
            return res.status(200).json({
                success: 0,
                message: "Unit Code is required"
            });
        }

        if (!unit_type || unit_type.trim() === "") {
            return res.status(200).json({
                success: 0,
                message: "Unit Type is required"
            });
        }

        updateUnitMaster(data, (err, results) => {

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

}
const {
    insertPatientDietMaster,
    getAllPatientDietMaster,
    updatePatientDietMaster
} = require('./patientdietmaster.service');

module.exports = {

    insertPatientDietMaster: (req, res) => {
        const data = req.body;

        const { diet_name, speciality_id } = data;

        if (!diet_name || diet_name.trim() === "") {
            return res.status(200).json({
                success: 0,
                message: "Diet Name is required"
            });
        }

        if (!speciality_id) {
            return res.status(200).json({
                success: 0,
                message: "Speciality is required"
            });
        }

        insertPatientDietMaster(data, (err, results) => {

            if (err) {
                return res.status(500).json({
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
                message: "Successfully Inserted"
            });

        });
    },


    getAllPatientDietMaster: (req, res) => {

        getAllPatientDietMaster((err, results) => {

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


    updatePatientDietMaster: (req, res) => {

        const data = req.body;

        const { diet_name, speciality_id } = data;

        if (!diet_name || diet_name.trim() === "") {
            return res.status(200).json({
                success: 0,
                message: "Diet Name is required"
            });
        }

        if (!speciality_id) {
            return res.status(200).json({
                success: 0,
                message: "Speciality is required"
            });
        }

        updatePatientDietMaster(data, (err, results) => {

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
                message: "Updated Successfully"
            });

        });

    }

};
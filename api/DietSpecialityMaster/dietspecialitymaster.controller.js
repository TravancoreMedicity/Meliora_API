const {
    insertDietSpecialityDetail,
    getAllinsertDietSpecialityDetail,
    updateinsertDietSpecialityDetail
} = require('./dietspecialitymaster.service');

module.exports = {

    insertDietSpecialityDetail: (req, res) => {
        const data = req.body;
        const { speciality_name, clinical_description, applicable_condition } = data;
        if (!speciality_name || speciality_name.trim() === "") {
            return res.status(200).json({
                success: 0,
                message: "Speciality Name is required"
            });
        };

        if (!clinical_description || clinical_description.trim() === "") {
            return res.status(200).json({
                success: 0,
                message: "Speciality Description is required"
            });
        };
        if (!applicable_condition || applicable_condition.trim() === "") {
            return res.status(200).json({
                success: 0,
                message: "Applicable Condition is required"
            });
        };


        // Call insert function
        insertDietSpecialityDetail(data, (err, results) => {
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
                data: results,
                message: "Successfully Inserted !",
            });
        });
    },

    getAllinsertDietSpecialityDetail: (req, res) => {
        getAllinsertDietSpecialityDetail((err, results) => {
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
                message: "Fetched SuccessFully",
            });
        });
    },

    updateinsertDietSpecialityDetail: (req, res) => {
        const data = req.body;
        const { speciality_name, clinical_description, applicable_condition } = data;
        if (!speciality_name || speciality_name.trim() === "") {
            return res.status(200).json({
                success: 0,
                message: "Speciality Name is required"
            });
        };

        if (!clinical_description || clinical_description.trim() === "") {
            return res.status(200).json({
                success: 0,
                message: "Speciality Description is required"
            });
        };
        if (!applicable_condition || applicable_condition.trim() === "") {
            return res.status(200).json({
                success: 0,
                message: "Applicable Condition is required"
            });
        };

        updateinsertDietSpecialityDetail(data, (err, results) => {
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


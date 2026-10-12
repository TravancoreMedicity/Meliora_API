

const { getAllOrderPartyType, updateAllOrderPartyType, insertAllOrderPartyType } = require('./OrderPartyType.service');
module.exports = {

    insertAllOrderPartyType: (req, res) => {
        const data = req.body;
        const { party_name } = data;
        if (!party_name || party_name.trim() === "") {
            return res.status(200).json({
                success: 0,
                message: "Category Name is required"
            });
        }

        // Call insert function
        insertAllOrderPartyType(data, (err, results) => {
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
    getAllOrderPartyType: (req, res) => {
        getAllOrderPartyType((err, results) => {
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

    updateAllOrderPartyType: (req, res) => {
        const data = req.body;
        const { party_name, party_type_id } = data;

        if (!party_name || party_name.trim() === "") {
            return res.status(200).json({
                success: 0,
                message: "Category Name is required"
            });
        }

        if (!party_type_id) {
            return res.status(200).json({
                success: 0,
                message: "Editing Id is required"
            });
        }

        updateAllOrderPartyType(data, (err, results) => {
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


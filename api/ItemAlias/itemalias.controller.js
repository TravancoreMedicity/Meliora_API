const {
    insertItemAlias,
    getAllItemAlias,
    updateItemAlias
} = require('./itemalias.service');

module.exports = {

    insertItemAlias: (req, res) => {
        const data = req.body;

        if (!data.item_id || !data.alias_name) {
            return res.status(200).json({
                success: 0,
                message: "Item ID and Alias Name are required"
            });
        }

        insertItemAlias(data, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                data: result,
                message: "Item Alias Inserted Successfully"
            });
        });
    },

    getAllItemAlias: (req, res) => {
        getAllItemAlias((err, results) => {
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

    updateItemAlias: (req, res) => {
        const data = req.body;

        if (!data.alias_id) {
            return res.status(200).json({
                success: 0,
                message: "Alias ID Required"
            });
        }

        updateItemAlias(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Item Alias Updated Successfully"
            });
        });
    }
};
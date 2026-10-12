const {
    insertItemType,
    getAllItemType,
    updateItemType
} = require('./itemtype.service');

module.exports = {

    insertItemType: (req, res) => {

        const data = req.body;

        if (!data.item_type_name) {
            return res.status(200).json({
                success: 0,
                message: "Item Type Name Required"
            });
        }

        insertItemType(data, (err, result) => {

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
                message: "Item Type Inserted Successfully"
            });

        });

    },


    getAllItemType: (req, res) => {

        getAllItemType((err, results) => {

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


    updateItemType: (req, res) => {

        const data = req.body;

        if (!data.item_type_id) {
            return res.status(200).json({
                success: 0,
                message: "Item Type ID Required"
            });
        }

        updateItemType(data, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
                message: "Item Type Updated Successfully"
            });

        });

    }

};
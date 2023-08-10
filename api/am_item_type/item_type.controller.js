const { ItemTypeInsert, ItemTypeView, ItemTypeUpdate } = require('../am_item_type/item_type.services')
module.exports = {
    ItemTypeInsert: (req, res) => {
        const body = req.body;
        ItemTypeInsert(body, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Item Type inserted successfully"
            })
        })
    },
    ItemTypeView: (req, res) => {

        ItemTypeView((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })

        })
    },
    ItemTypeUpdate: (req, res) => {
        const body = req.body;
        ItemTypeUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Item Type data Updated successfully"
            })
        })
    },
}
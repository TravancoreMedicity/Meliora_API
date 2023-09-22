
const { validateItemCreate } = require('../../validation/validation_schema');
const { ItemNameInsert, ItemNameview, ItemNameUpdate } = require('../am_item_name_creation/item.services')
module.exports = {
    ItemNameInsert: (req, res) => {
        const body = req.body;
        //validate item name Instert function
        const body_result = validateItemCreate.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.item_name = body_result.value.item_name;

        ItemNameInsert(body, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                insertid: result.insertId,
                message: "Item creation data inserted successfully"
            })
        })
    },
    ItemNameview: (req, res) => {

        ItemNameview((err, results) => {
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
    ItemNameUpdate: (req, res) => {
        const body = req.body;

        ItemNameUpdate(body, (err, results) => {
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
                message: "Item creation data Updated successfully"
            })
        })
    },
}
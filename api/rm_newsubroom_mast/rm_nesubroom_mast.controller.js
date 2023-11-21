const { validateAssetType } = require('../../validation/validation_schema');
const { newSubRoomInsert, newSubRoomView, newSubRoomUpdate } = require('../rm_newsubroom_mast/rm_newsubroom_mast.service')
module.exports = {
    newSubRoomInsert: (req, res) => {
        const body = req.body;
        newSubRoomInsert(body, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });

            }
            return res.status(200).json({
                success: 1,
                message: "Sub Room inserted successfully"
            })
        })
    },

    newSubRoomView: (req, res) => {

        newSubRoomView((err, results) => {
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
    newSubRoomUpdate: (req, res) => {
        const body = req.body;
        newSubRoomUpdate(body, (err, results) => {
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
                message: "Sub Room Updated successfully"
            })
        })
    },
}
const { RoomInsert, RoomView, RoomUpdate } = require('../rm_roomnew_creation/rm_newroom.services')
module.exports = {
    RoomInsert: (req, res) => {
        const body = req.body;
        RoomInsert(body, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                insetid: result.insertId
            })
        })
    },

    RoomView: (req, res) => {

        RoomView((err, results) => {
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
    RoomUpdate: (req, res) => {
        const body = req.body;
        RoomUpdate(body, (err, results) => {
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
                message: "floor creation data Updated successfully"
            })
        })
    },
}

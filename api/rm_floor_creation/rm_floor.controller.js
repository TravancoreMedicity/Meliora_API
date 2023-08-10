const { FloorInsert, FloorView, FloorUpdate } = require('../rm_floor_creation/rm_floor.services')
module.exports = {
    FloorInsert: (req, res) => {
        const body = req.body;
        FloorInsert(body, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Floor creation data inserted successfully"
            })
        })
    },

    FloorView: (req, res) => {

        FloorView((err, results) => {
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
    FloorUpdate: (req, res) => {
        const body = req.body;
        FloorUpdate(body, (err, results) => {
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


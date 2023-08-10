const { ManufactureInsert, ManufactureView, ManufactureUpdate } = require('../am_manufacture/manufacture.services')
module.exports = {
    ManufactureInsert: (req, res) => {
        const body = req.body;
        ManufactureInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Manufacture inserted successfully"
            })
        })
    },
    ManufactureView: (req, res) => {

        ManufactureView((err, results) => {
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
    ManufactureUpdate: (req, res) => {
        const body = req.body;
        ManufactureUpdate(body, (err, results) => {
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
                message: "Manufacture data Updated successfully"
            })
        })
    },
}

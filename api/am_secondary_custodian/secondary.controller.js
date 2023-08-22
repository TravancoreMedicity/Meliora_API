const { SecondaryInsert, SecondaryView, SecondaryUpdate } = require('../am_secondary_custodian/secondary.services')
module.exports = {
    SecondaryInsert: (req, res) => {
        const body = req.body;
        SecondaryInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Secondary Custodian inserted successfully"
            })
        })
    },
    SecondaryView: (req, res) => {

        SecondaryView((err, results) => {
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
    SecondaryUpdate: (req, res) => {
        const body = req.body;
        SecondaryUpdate(body, (err, results) => {
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
                message: "Secondary data Updated successfully"
            })
        })
    },
}
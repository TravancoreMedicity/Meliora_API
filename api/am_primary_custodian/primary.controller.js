const { PrimaryInsert, PrimaryView, PrimaryUpdate } = require('../am_primary_custodian/primary.services')
module.exports = {
    PrimaryInsert: (req, res) => {
        const body = req.body;
        PrimaryInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Primary Custodian inserted successfully"
            })
        })
    },
    PrimaryView: (req, res) => {

        PrimaryView((err, results) => {
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
    PrimaryUpdate: (req, res) => {
        const body = req.body;
        PrimaryUpdate(body, (err, results) => {
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
                message: "PrimaryCustodian data Updated successfully"
            })
        })
    },
}
const { UomInsert, Uomview, UomUpdate } = require('../am_uom/uom.services')
module.exports = {
    UomInsert: (req, res) => {
        const body = req.body;
        UomInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Unit of Measurement inserted successfully"
            })
        })
    },
    Uomview: (req, res) => {

        Uomview((err, results) => {
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
    UomUpdate: (req, res) => {
        const body = req.body;
        UomUpdate(body, (err, results) => {
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
                message: "Unit of Measurement successfully"
            })
        })
    },
}
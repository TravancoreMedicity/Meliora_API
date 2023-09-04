const { SubmodelInsert, Submodelview, SubmodelUpdate } = require('../am_submodel/submodel.services')
module.exports = {
    SubmodelInsert: (req, res) => {
        const body = req.body;
        SubmodelInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Submodel inserted successfully"
            })
        })
    },
    Submodelview: (req, res) => {

        Submodelview((err, results) => {
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
    SubmodelUpdate: (req, res) => {
        const body = req.body;
        SubmodelUpdate(body, (err, results) => {
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
                message: "Submodel data Updated successfully"
            })
        })
    },
}
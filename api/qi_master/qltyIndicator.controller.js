
const { qualityIndicatorInsert, qualityIndicatorView, qualityIndicatorUpdate } = require('./qltyIndicator.service')
module.exports = {
    qualityIndicatorInsert: (req, res) => {
        const body = req.body;
        qualityIndicatorInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data Created"
            })
        })
    },
    qualityIndicatorView: (req, res) => {
        qualityIndicatorView((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    qualityIndicatorUpdate: (req, res) => {
        const body = req.body;
        qualityIndicatorUpdate(body, (err, results) => {
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
                message: "Updated successfully"
            })
        })
    }
}
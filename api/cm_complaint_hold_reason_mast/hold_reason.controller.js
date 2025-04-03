const { complaintHoldInsert, holdReasonget, complaintHoldUpdate } = require('./hold_reason.service')
module.exports = {

    complaintHoldInsert: (req, res) => {
        const body = req.body;
        complaintHoldInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Hold Reason Added Succesfully",
            })
        })
    },
    holdReasonget: (req, res) => {
        holdReasonget((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: "data not found"
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    complaintHoldUpdate: (req, res) => {
        const body = req.body;
        complaintHoldUpdate(body, (err, results) => {
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
                message: "Hold Reason Updated successfully"
            })
        })
    },

}
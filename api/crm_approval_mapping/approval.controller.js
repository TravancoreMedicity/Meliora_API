const { approvalInsert, checKCompany, viewApproval, updateApproval } = require('./approval.service')
module.exports = {
    approvalInsert: (req, res) => {
        const body = req.body;
        checKCompany(body, (err, checkResult) => {
            const value = JSON.parse(JSON.stringify(checkResult))
            console.log(value, "exist");

            if (Object.keys(value).length === 0) {
                approvalInsert(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err.message
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Inserted Successfully"
                    })
                })
            }
            else {
                return res.status(200).json({
                    success: 2,
                    message: "Company Details Exist"
                })
            }
        })
    },
    viewApproval: (req, res) => {
        viewApproval((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })

        })
    },

    updateApproval: (req, res) => {
        const body = req.body;
        updateApproval(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 1,
                message: "Updated successfully"
            })
        })
    },

}


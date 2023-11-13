const { CredentialInsert, CredentialView, CredentialUpdate } = require('../it_password_credential_type_master/password_credential.service')
module.exports = {
    CredentialInsert: (req, res) => {
        const body = req.body;
        CredentialInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data inserted successfully"
            })
        })
    },
    CredentialView: (req, res) => {

        CredentialView((err, results) => {
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
    CredentialUpdate: (req, res) => {
        const body = req.body;

        CredentialUpdate(body, (err, results) => {
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
                message: "Data Updated successfully"
            })
        })
    },
}
const {
    EmergencyQiInsert,
    EmergencyAlreadyExist

} = require('./qi_emergency.service')
module.exports = {
    EmergencyQiInsert: (req, res) => {
        const body = req.body;
        EmergencyAlreadyExist(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                EmergencyQiInsert(body, (err, result) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Saved"
                    })
                })
            }
            else {
                return res.status(200).json({
                    success: 6,
                    message: "Data Already Exist"
                })
            }
        })
    },
    EmergencyAlreadyExist: (req, res) => {
        const id = req.params.id;
        EmergencyAlreadyExist(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

}

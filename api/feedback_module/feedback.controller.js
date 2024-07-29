

const { getfeedbackNursingStations } = require('./feedback.service')
module.exports = {

    getfeedbackNursingStations: (req, res) => {
        getfeedbackNursingStations((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },


}

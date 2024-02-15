const {
    EndoscopyQiInsert,
    EndoscopyAlreadyExist,
    EndoscopyQiUpdate,
    getQualityInicatorList,
    getQIReportEndoscopy } = require('./qi_daily.service')
module.exports = {

    EndoscopyQiInsert: (req, res) => {
        const body = req.body;
        EndoscopyAlreadyExist(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                EndoscopyQiInsert(body, (err, result) => {
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

    EndoscopyAlreadyExist: (req, res) => {
        const id = req.params.id;
        EndoscopyAlreadyExist(id, (err, results) => {
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
    EndoscopyQiUpdate: (req, res) => {
        const body = req.body;
        EndoscopyQiUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Data Saved"
            })
        })
    },

    getQualityInicatorList: (req, res) => {
        const id = req.params.id;
        getQualityInicatorList(id, (err, results) => {
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
    getQIReportEndoscopy: (req, res) => {
        const body = req.body;
        getQIReportEndoscopy(body, (err, results) => {
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
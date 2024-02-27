const {
    DailyCensusInsert,
    DailyCensusAlreadyExist,
    DailyCensusYesterdayCount,
    GetDailyCensusReport,
    DailyCensusUpdate,
    GetCensusBargraphReport
} = require('./daily_census.service')
module.exports = {
    DailyCensusInsert: (req, res) => {
        const body = req.body;
        DailyCensusAlreadyExist(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                DailyCensusInsert(body, (err, result) => {
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

    DailyCensusAlreadyExist: (req, res) => {
        const body = req.body;
        DailyCensusAlreadyExist(body, (err, results) => {
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


    DailyCensusYesterdayCount: (req, res) => {
        const body = req.body;
        DailyCensusYesterdayCount(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"

                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    GetDailyCensusReport: (req, res) => {
        const body = req.body;
        GetDailyCensusReport(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found"

                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    DailyCensusUpdate: (req, res) => {
        const body = req.body;
        DailyCensusUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Data Updated"
            })
        })
    },
    GetCensusBargraphReport: (req, res) => {
        const body = req.body;
        GetCensusBargraphReport(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found"

                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

}
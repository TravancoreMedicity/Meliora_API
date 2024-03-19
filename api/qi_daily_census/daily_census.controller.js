const {
    DailyCensusInsert,
    DailyCensusAlreadyExist,
    DailyCensusYesterdayCount,
    GetDailyCensusReport,
    DailyCensusUpdate,
    GetCensusBargraphReport,
    CensusAlreadyInsert,
    ElliderDataUpdate
} = require('./daily_census.service')
module.exports = {
    DailyCensusInsert: (req, res) => {
        const body = req.body;
        const data = body?.map((val) => {
            return [val.census_ns_slno, val.census_date, val.yesterday_census, val.total_admission, val.total_discharge,
            val.transfer_in, val.transfer_out, val.total_death, val.census_total, val.create_user, val.ora_admission,
            val.ora_discharge, val.ora_death, val.ora_census_total, val.update_status, val.ora_dama, val.ora_lama]
        })
        const { census_date } = body[0]
        CensusAlreadyInsert(census_date, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                DailyCensusInsert(data, (err, result) => {
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

    ElliderDataUpdate: async (req, res) => {
        const body = req.body;
        ElliderDataUpdate(body).then(results => {
            return res.status(200).json({
                success: 1,
                message: "Data Updated"
            });
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: err
            });
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
                yestdata: results
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
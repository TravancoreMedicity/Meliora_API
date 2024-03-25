const {
    EndoscopyQiInsert,
    EndoDetailsAlreadyInsert,
    getPatientList,
    EndoscopyQiUpdate,
    getEndoscopyPatientList
} = require('./qi_daily.service')
module.exports = {

    EndoscopyQiInsert: (req, res) => {
        const body = req.body;
        const data = body?.map((val) => {
            return [val.qi_endo_date, val.endo_ptno, val.endo_ptname, val.endo_ptsex, val.endo_ptage,
            val.endo_ptaddrs1, val.endo_ptaddrs2, val.endo_ptaddrs3, val.endo_ptaddrs4, val.doctor_name,
            val.qi_dept_code, val.endo_status, val.create_user]
        })
        EndoscopyQiInsert(data, (err, result) => {
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
    },

    EndoDetailsAlreadyInsert: (req, res) => {
        const body = req.body;
        EndoDetailsAlreadyInsert(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "No Record Found"
                })
            }
            else {
                return res.status(200).json({
                    success: 2,
                    message: "Data Already Exist",
                    data: results
                })
            }
        })
    },

    getPatientList: (req, res) => {
        const body = req.body;
        getPatientList(body, (err, results) => {
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
    EndoscopyQiUpdate: async (req, res) => {
        const body = req.body;
        EndoscopyQiUpdate(body).then(results => {
            return res.status(200).json({
                success: 1,
                message: "Data Updated"
            });
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: "Error Occured"
            });
        })
    },

    getEndoscopyPatientList: (req, res) => {
        const body = req.body;
        getEndoscopyPatientList(body, (err, results) => {
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

    // EndoscopyAlreadyExist: (req, res) => {
    //     const body = req.body;
    //     EndoscopyAlreadyExist(body, (err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             })
    //         }
    //         if (results.length === 0) {
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "No record found"

    //             })
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         })
    //     })
    // },
    // EndoscopyQiUpdate: (req, res) => {
    //     const body = req.body;
    //     EndoscopyQiUpdate(body, (err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             })
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             message: "Data Saved"
    //         })
    //     })
    // },

    // getQualityInicatorList: (req, res) => {
    //     const id = req.params.id;
    //     getQualityInicatorList(id, (err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             })
    //         }
    //         if (Object.keys(results).length === 0) {
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "No Data Found",
    //                 data: []
    //             })
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         })
    //     })
    // },
    // getQIReportEndoscopy: (req, res) => {
    //     const body = req.body;
    //     getQIReportEndoscopy(body, (err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             })
    //         }
    //         if (Object.keys(results).length === 0) {
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "No Data Found",
    //                 data: []
    //             })
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         })
    //     })
    // },
}
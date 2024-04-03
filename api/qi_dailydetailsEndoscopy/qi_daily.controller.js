const {
    EndoscopyQiInsert, EndoDetailsAlreadyInsert, getPatientList, EndoscopyPatientUpdate,
    getEndoscopyPatientList, EndoscopyQiUpdate, getLastUpdatedDate, UpdateLastImportedDate
} = require('./qi_daily.service')
module.exports = {

    EndoscopyQiInsert: (req, res) => {
        const body = req.body;
        const data = body?.map((val) => {
            return [val.qi_endo_date, val.endo_ptno, val.endo_ptname, val.endo_ptsex, val.endo_ptage, val.endo_ptaddrs1,
            val.endo_ptaddrs2, val.endo_ptaddrs3, val.endo_ptaddrs4, val.doctor_name, val.qi_dept_code, val.endo_status,
            val.create_user, val.test_req_date, val.endo_arrival_time, val.assessment_time, val.proc_start_time, val.proc_end_time,
            val.report_gene_time, val.report_desp_time, val.error_status, val.error_details, val.error_resaon, val.error_corrective,
            val.error_preventive, val.redo_status, val.redos_reason, val.redos_corrective, val.redos_preventive, val.incidense_error_status,
            val.incidense_description, val.incidense_action, val.falls_status, val.near_misses_status, val.sentinel_events_status,
            val.qi_status, val.endo_ptmobile, val.visit_token
            ]
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
    // EndoscopyPatientUpdate: async (req, res) => {
    //     const body = req.body;
    //     EndoscopyPatientUpdate(body).then(results => {
    //         return res.status(200).json({
    //             success: 1,
    //             message: "Data Updated"
    //         });
    //     }).catch(err => {
    //         return res.status(200).json({
    //             success: 0,
    //             message: "Error Occured"
    //         });
    //     })
    // },

    EndoscopyPatientUpdate: (req, res) => {
        const body = req.body;
        EndoscopyPatientUpdate(body, (err, results) => {
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


    getLastUpdatedDate: (req, res) => {
        const id = req.params.id;
        getLastUpdatedDate(id, (err, results) => {
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

    UpdateLastImportedDate: (req, res) => {
        const body = req.body;
        UpdateLastImportedDate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Last Date Updated'
            });
        });
    },


}
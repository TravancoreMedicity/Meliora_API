const { format } = require('date-fns');
const { getLastUpdatedDate, qiLastUpdateDateInsert, UpdateLastImportedDate }
    = require('../qi_dailydetailsEndoscopy/qi_daily.service');
const { InsertIPPatients, getPatientList, searchPatientsbyName, UpdateDischargeDateOfPatients } = require('./qi_ip.service')
module.exports = {
    InsertIPPatients: (req, res) => {
        const body = req.body;
        const data = body?.map((val) => {
            return [val.ip_no, val.ipd_date, val.ptno, val.ptname, val.ptsex, val.ptage, val.ptaddrs1, val.ptaddrs2,
            val.ptmobile, val.ip_bed, val.doctor_name, val.discharge_date, val.qi_dept_no, val.create_user
            ]
        })
        const { qi_dept_no } = body[0]
        const patchdata = {
            qi_dept_no: qi_dept_no,
            last_updatedate: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        }
        InsertIPPatients(data, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (result) {
                getLastUpdatedDate(qi_dept_no, (err, results) => {
                    const value = JSON.parse(JSON.stringify(results))
                    if (Object.keys(value).length === 0) {
                        qiLastUpdateDateInsert(patchdata, (err, result) => {
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
                        UpdateLastImportedDate(patchdata, (err, results) => {
                            if (err) {
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }
                            return res.status(200).json({
                                success: 1,
                                message: "Data Saved"
                            });
                        });
                    }
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
                    message: "No Report Found"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

    searchPatientsbyName: (req, res) => {
        const body = req.body;
        searchPatientsbyName(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
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

    UpdateDischargeDateOfPatients: async (req, res) => {
        const body = req.body;
        UpdateDischargeDateOfPatients(body).then(results => {
            return res.status(200).json({
                success: 1,
                message: "Generated"
            });
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: err
            });
        })
    },
}
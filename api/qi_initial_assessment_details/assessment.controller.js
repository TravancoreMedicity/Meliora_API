
const { getLastUpdatedDate, qiLastUpdateDateInsert, UpdateLastImportedDate }
    = require('../qi_dailydetailsEndoscopy/qi_daily.service');

const { OpAssessmentInsert, UpdateServiceTimeOfOPPatients, getAseesementReport } = require('./assessment_service')
const { format } = require('date-fns');

module.exports = {
    OpAssessmentInsert: (req, res) => {
        const body = req.body;
        const data = body?.map((val) => {
            return [
                val.patient_arrived_date, val.ptno, val.ptname, val.ptmobile, val.doctor_name,
                val.qi_dept_no, val.assessment_start, val.assessment_end,
                val.sumof_service_time, val.create_user, val.consult_start_date, val.complaint_entry_date,
                val.investigation_req_date, val.prescription_req_date, val.reference_req_date
            ]
        })
        const { qi_dept_no } = body[0]
        const patchdata = {
            qi_dept_no: qi_dept_no,
            last_updatedate: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        }
        OpAssessmentInsert(data, (err, result) => {
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
                                message: "Generated"
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
                                message: "Generated"
                            });
                        });
                    }
                })
            }
        })
    },

    UpdateServiceTimeOfOPPatients: async (req, res) => {
        const body = req.body;
        UpdateServiceTimeOfOPPatients(body).then(results => {
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
    getAseesementReport: (req, res) => {
        const body = req.body;
        getAseesementReport(body, (err, results) => {
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

}
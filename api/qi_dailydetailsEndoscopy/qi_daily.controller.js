const { format } = require('date-fns');
const {
    EndoscopyQiInsert, getPatientList, EndoscopyPatientUpdate, getEndoscopyMonthlyView, InchargeApprvlView,
    EndoscopyQiUpdate, getLastUpdatedDate, UpdateLastImportedDate, qiLastUpdateDateInsert, getIncidentDetailsForEndoscopy,
    searchPatients, AseessmentExceededList, InchargeApprovalSave, IPEndoscopyInsert, IPEndoscopyExist,
    ViewIpPatientsView, IPEndoscopyQIUpdate, getIPIncidentForEndoscopy, getInpatientEndoscopyMonthlyView, EquipmentDetailsInsert,
    OPequipmentDetailExist, OPdeleteEquipment, IPequipmentDetailExist, IPdeleteEquipment, getTotalTestPerformed, IPAseessExceededList,
    HODApprovalSave, HODApprovalUpdate } = require('./qi_daily.service')

module.exports = {
    EndoscopyQiInsert: (req, res) => {
        const body = req.body;
        const data = body?.map((val) => {
            return [val.patient_arrived_date, val.ptno, val.ptname, val.ptsex, val.ptage,
            val.ptaddrs1, val.ptaddrs2, val.ptaddrs3, val.ptaddrs4, val.doctor_name,
            val.qi_dept_no, val.create_user, val.ptmobile, val.visit_token
            ]
        })
        const { qi_dept_no } = body[0]
        const patchdata = {
            qi_dept_no: qi_dept_no,
            last_updatedate: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        }
        EndoscopyQiInsert(data, (err, result) => {
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
                    message: "No record found"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
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
                message: "Updated"
            })
        })
    },

    getEndoscopyMonthlyView: (req, res) => {
        const body = req.body;
        getEndoscopyMonthlyView(body, (err, results) => {
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
                message: "Updated"
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
                data: results,
                message: "Data Exist",
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

    getIncidentDetailsForEndoscopy: (req, res) => {
        const body = req.body;
        getIncidentDetailsForEndoscopy(body, (err, results) => {
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
                data: results,
            })
        })
    },

    searchPatients: (req, res) => {
        const body = req.body;
        searchPatients(body, (err, results) => {
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

    AseessmentExceededList: (req, res) => {
        const body = req.body;
        AseessmentExceededList(body, (err, results) => {
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
    InchargeApprovalSave: (req, res) => {
        const body = req.body;
        InchargeApprovalSave(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Approval Done"
            })
        })
    },
    InchargeApprvlView: (req, res) => {
        const body = req.body;
        InchargeApprvlView(body, (err, results) => {
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

    IPEndoscopyInsert: (req, res) => {
        const body = req.body;
        const data = body?.map((val) => {
            return [val.ip_no, val.ipd_date, val.ptno, val.ptname, val.ptsex, val.ptage, val.ptaddrs1,
            val.ptaddrs2, val.ptaddrs3, val.ptaddrs4, val.ptmobile, val.ip_bed, val.doctor_name,
            val.ip_nurstation, val.qi_dept_no, val.create_user, val.endo_arrival_time
            ]
        })
        const { ip_no } = body[0]
        IPEndoscopyExist(ip_no, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                IPEndoscopyInsert(data, (err, result) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Patient Details Saved"
                    })
                })
            }
            else {
                return res.status(200).json({
                    success: 6,
                    message: "Details Already Exist"
                })
            }
        })
    },

    ViewIpPatientsView: (req, res) => {
        ViewIpPatientsView((err, results) => {
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

    IPEndoscopyQIUpdate: (req, res) => {
        const body = req.body;
        IPEndoscopyQIUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Updated"
            })
        })
    },

    getIPIncidentForEndoscopy: (req, res) => {
        const body = req.body;
        getIPIncidentForEndoscopy(body, (err, results) => {
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
                data: results,
            })
        })
    },
    getInpatientEndoscopyMonthlyView: (req, res) => {
        const body = req.body;
        getInpatientEndoscopyMonthlyView(body, (err, results) => {
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
    EquipmentDetailsInsert: (req, res) => {
        const body = req.body;
        const data = body?.map((val) => {
            return [val.qi_slno, val.qi_endo_ip_slno, val.equip_no, val.procedure_name, val.endo_date]
        })
        EquipmentDetailsInsert(data, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Updated"
            });
        })
    },

    OPequipmentDetailExist: (req, res) => {
        const id = req.params.id;
        OPequipmentDetailExist(id, (err, results) => {
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
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    OPdeleteEquipment: (req, res) => {
        const id = req.params.id;
        OPdeleteEquipment(id, (err, results) => {
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
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    IPequipmentDetailExist: (req, res) => {
        const id = req.params.id;
        IPequipmentDetailExist(id, (err, results) => {
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
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

    IPdeleteEquipment: (req, res) => {
        const id = req.params.id;
        IPdeleteEquipment(id, (err, results) => {
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
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

    getTotalTestPerformed: (req, res) => {
        const body = req.body;
        getTotalTestPerformed(body, (err, results) => {
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

    IPAseessExceededList: (req, res) => {
        const body = req.body;
        IPAseessExceededList(body, (err, results) => {
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

    HODApprovalSave: (req, res) => {
        const body = req.body;
        HODApprovalSave(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Approval Done"
            })
        })
    },
    HODApprovalUpdate: (req, res) => {
        const body = req.body;
        HODApprovalUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Approval Done"
            });
        });
    },

}
const { format } = require('date-fns');
const { pool } = require('../../config/database')
module.exports = {
    EndoscopyQiInsert: (data, callback) => {

        pool.query(
            `INSERT INTO qi_details_endoscopy
          (
             patient_arrived_date,ptno,ptname,ptsex,ptage,ptaddrs1,ptaddrs2,ptaddrs3,
             ptaddrs4,doctor_name,qi_dept_no,create_user,ptmobile,visit_token
          )
         VALUES ?`,
            [
                data
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getPatientList: (data, callBack) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `SELECT 
                   qi_slno,patient_arrived_date,ptno,ptname,ptsex,ptage,ptaddrs1,ptaddrs2,ptaddrs3,ptaddrs4,doctor_name,
                   qi_dept_no,qi_status,test_req_date,endo_arrival_time,assessment_time,proc_start_time,proc_end_time,
                   report_gene_time,report_desp_time, error_status,error_details, error_reason,error_corrective,
                   error_preventive, redo_status,redos_reason, redos_corrective,redos_preventive,incidence_ident_error_status,
                   visit_token,incidence_ident_description,incidence_ident_action,falls_status,near_misses_status,
                   sentinel_events_status,qi_save_status,ptmobile,sumof_service_time,incident_error_slno,incident_redos_slno,
                   incident_falls_slno,incident_nearmisses_slno,incident_sentinel_slno,incident_error_date, incident_redos_date,
                   incident_falls_date,incident_nearmisses_date, incident_sentinel_date, redos_details, incidence_ident_reason,
                   falls_details,falls_reason, sentinel_details,sentinel_reason, nearmisses_details, nearmisses_reason,
                   incidence_ident_slno, incidence_ident_date,initial_assessment_reason,assessment_benchmark_flag,
                   error_incident_type,redos_incident_type,falls_incident_type,ident_error_incident_type,
                   nearmiss_incident_type,sentinel_incident_type
            FROM  
                   qi_details_endoscopy
            WHERE 
                  patient_arrived_date between ('${fromDate}') and ('${toDate}') order by patient_arrived_date`,
            {},
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    EndoscopyPatientUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                 qi_details_endoscopy 
             SET 
                 qi_status = ?, edit_user = ?
             WHERE
                 qi_slno = ?`,
            [
                data.qi_status,
                data.edit_user,
                data.qi_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getEndoscopyMonthlyView: (data, callBack) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `SELECT
                   qi_slno,patient_arrived_date,ptno,ptname,ptsex,ptage,ptaddrs1,ptaddrs2,ptaddrs3,ptaddrs4,
                   doctor_name,ptmobile,test_req_date,endo_arrival_time,assessment_time,proc_start_time, proc_end_time,
                   report_gene_time,report_desp_time,error_status,error_details,error_reason,error_corrective,
                   error_preventive,incident_error_date,redo_status,redos_details,redos_reason,redos_corrective,
                   redos_preventive,incident_redos_date,incidence_ident_error_status,incidence_ident_description,
                   incidence_ident_reason,incidence_ident_action,incidence_ident_date,falls_status,falls_details,
                   falls_reason,incident_falls_date,sentinel_events_status,sentinel_details,sentinel_reason,
                   incident_sentinel_date,near_misses_status,nearmisses_details,nearmisses_reason,incident_nearmisses_date,
                   sumof_service_time,initial_assessment_reason,assessment_benchmark_flag,qi_status, error_incident_type,
                   redos_incident_type,falls_incident_type,ident_error_incident_type,nearmiss_incident_type,
                   sentinel_incident_type
             FROM  
                  qi_details_endoscopy 
             WHERE
                  patient_arrived_date between ('${fromDate}') and ('${toDate}') and qi_status=1 order by patient_arrived_date`,
            {},
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },
    EndoscopyQiUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                 qi_details_endoscopy 
             SET 
                 test_req_date=?,
                 endo_arrival_time=?,
                 assessment_time=?,
                 proc_start_time=?,
                 proc_end_time=?,
                 report_gene_time=?,
                 report_desp_time=?,
                 error_corrective=?, 
                 error_preventive=?,
                 redos_corrective=?,
                 redos_preventive=?,
                 incidence_ident_action=?,
                 qi_save_status=?,
                 edit_user=?,
                 sumof_service_time=?,
                 initial_assessment_reason=?,
                 assessment_benchmark_flag=?
            WHERE 
                 qi_slno=?`,
            [
                data.test_req_date,
                data.endo_arrival_time,
                data.assessment_time,
                data.proc_start_time,
                data.proc_end_time,
                data.report_gene_time,
                data.report_desp_time,
                data.error_corrective,
                data.error_preventive,
                data.redos_corrective,
                data.redos_preventive,
                data.incidence_ident_action,
                data.qi_save_status,
                data.edit_user,
                data.sumof_service_time,
                data.initial_assessment_reason,
                data.assessment_benchmark_flag,
                data.qi_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    qiLastUpdateDateInsert: (data, callback) => {
        pool.query(
            `INSERT INTO qi_hs_lastupdate
                ( qi_dept_no, last_updatedate)
             VALUES(?,?)`,
            [
                data.qi_dept_no,
                data.last_updatedate,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getLastUpdatedDate: (id, callBack) => {
        pool.query(
            `SELECT last_updatedate FROM qi_hs_lastupdate WHERE qi_dept_no=?
                `,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    UpdateLastImportedDate: (data, callBack) => {
        pool.query(
            `update qi_hs_lastupdate set last_updatedate = ? where qi_dept_no=?`,
            [
                data.last_updatedate,
                data.qi_dept_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getIncidentDetailsForEndoscopy: (data, callBack) => {
        pool.query(
            `SELECT 
                    incident_error_slno,incident_error_date,error_details,error_reason,incident_redos_slno,
                    incident_redos_date,redos_details, redos_reason,incidence_ident_slno,incidence_ident_date,
                    incidence_ident_description,incidence_ident_reason,incident_falls_slno,incident_falls_date,
                    falls_details, falls_reason,incident_sentinel_slno,incident_sentinel_date,sentinel_details,
                    sentinel_reason,incident_nearmisses_slno,incident_nearmisses_date,nearmisses_details,
                    nearmisses_reason,error_incident_type,redos_incident_type,falls_incident_type,
                    ident_error_incident_type,nearmiss_incident_type,sentinel_incident_type
             FROM     
                    qi_details_endoscopy
             WHERE
                    qi_details_endoscopy.qi_slno=?`,
            [
                data.qi_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    searchPatients: (data, callBack) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `SELECT 
                   qi_slno,patient_arrived_date,ptno,ptname,ptsex,ptage,ptaddrs1,ptaddrs2,ptaddrs3,ptaddrs4,doctor_name,
                   qi_dept_no,qi_status,test_req_date,endo_arrival_time,assessment_time,proc_start_time,proc_end_time,
                   report_gene_time,report_desp_time,error_status,error_details, error_reason,error_corrective,
                   error_preventive,redo_status,redos_reason,redos_corrective,redos_preventive,incidence_ident_error_status,
                   visit_token,incidence_ident_description,incidence_ident_action,falls_status,near_misses_status,sentinel_events_status,
                   qi_save_status,ptmobile,sumof_service_time,incident_error_slno,incident_redos_slno,
                   incident_falls_slno,incident_nearmisses_slno,incident_sentinel_slno,initial_assessment_reason,assessment_benchmark_flag
            FROM  
                   qi_details_endoscopy
            WHERE 
                   patient_arrived_date between ('${fromDate}') and ('${toDate}')and qi_status=0 and ptname like ? order by patient_arrived_date`,
            [
                '%' + data.ptname + '%'
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    AseessmentExceededList: (data, callBack) => {
        pool.query(
            `SELECT 
                   qi_slno,patient_arrived_date,ptno,ptname,ptsex,ptage,doctor_name,qi_status,sumof_service_time,
                   initial_assessment_reason,assessment_benchmark_flag,endo_arrival_time
             FROM  
                   qi_details_endoscopy
             WHERE 
                   patient_arrived_date between ? and ? and qi_status=1 and
                   assessment_benchmark_flag=1 order by patient_arrived_date`,
            [
                data.from,
                data.to
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

}
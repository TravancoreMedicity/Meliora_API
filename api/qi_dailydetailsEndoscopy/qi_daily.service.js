const { pool } = require('../../config/database')
module.exports = {
    // qi_endo_slno, qi_endo_date, endo_ptno, endo_ptname, endo_ptsex, endo_ptage, endo_ptaddrs1, endo_ptaddrs2,
    // endo_ptaddrs3, endo_ptaddrs4, doctor_name, qi_dept_code, endo_status, create_user, edit_user, create_date,
    // update_date, test_req_date, endo_arrival_time, assessment_time, proc_start_time, proc_end_time, report_gene_time,
    // report_desp_time, error_status, error_details, error_resaon, error_corrective, error_preventive,
    // redo_status, redos_reason, redos_corrective, redos_preventive,
    // incidense_error_status, incidense_description, incidense_action, falls_status, near_misses_status, sentinel_events_status
    EndoscopyQiInsert: (data, callback) => {
        pool.query(
            `INSERT INTO qi_details_endoscopy
          (
             qi_endo_date,endo_ptno,endo_ptname,endo_ptsex,endo_ptage,endo_ptaddrs1,endo_ptaddrs2,endo_ptaddrs3,
             endo_ptaddrs4,doctor_name,qi_dept_code,endo_status,create_user, test_req_date, endo_arrival_time, assessment_time,
             proc_start_time, proc_end_time, report_gene_time,report_desp_time, error_status, error_details, error_resaon,
             error_corrective, error_preventive,redo_status, redos_reason, redos_corrective, redos_preventive,
             incidense_error_status, incidense_description, incidense_action, falls_status, near_misses_status, sentinel_events_status,
             qi_status,endo_ptmobile,visit_token
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

    EndoDetailsAlreadyInsert: (data, callBack) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `SELECT
                  qi_endo_slno from qi_details_endoscopy
             WHERE
                    qi_endo_date between ('${fromDate}') and ('${toDate}') order by qi_endo_date`,
            {},
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },

    getPatientList: (data, callBack) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `SELECT 
                  qi_endo_slno, qi_endo_date, endo_ptno, endo_ptname, endo_ptsex, endo_ptage, endo_ptaddrs1, 
                  endo_ptaddrs2, endo_ptaddrs3, endo_ptaddrs4, doctor_name, qi_dept_code, endo_status,endo_ptmobile,visit_token
            FROM  
                  qi_details_endoscopy
            WHERE 
                 qi_endo_date between ('${fromDate}') and ('${toDate}') and endo_status=0 order by qi_endo_date`,
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
                 endo_status = ?, edit_user = ?
             WHERE
                 qi_endo_slno = ?`,
            [
                data.endo_status,
                data.edit_user,
                data.qi_endo_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },


    // EndoscopyPatientUpdate: (body) => {
    //     return Promise.all(body.map((val) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `update qi_details_endoscopy set endo_status = ? , edit_user = ?
    //                 where qi_endo_slno = ?`,
    //                 [
    //                     val.endo_status,
    //                     val.edit_user,
    //                     val.qi_endo_slno
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         return reject(error)
    //                     }
    //                     return resolve(results)
    //                 }
    //             )
    //         })
    //     })
    //     )
    // },
    getEndoscopyPatientList: (data, callBack) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `SELECT
                   qi_endo_slno,qi_endo_date,endo_ptno,endo_ptname,endo_ptsex,endo_ptage,endo_ptaddrs1, endo_ptaddrs2,endo_ptaddrs3,
                   endo_ptaddrs4,doctor_name,qi_dept_code,endo_status,test_req_date,endo_arrival_time,assessment_time,proc_start_time,
                   proc_end_time,report_gene_time,report_desp_time, error_status,error_details, error_resaon,error_corrective, 
                   error_preventive, redo_status,redos_reason, redos_corrective,redos_preventive,incidense_error_status,visit_token, 
                   incidense_description,incidense_action,falls_status,near_misses_status,sentinel_events_status,qi_status,endo_ptmobile
             FROM  
                  qi_details_endoscopy 
             WHERE
                  qi_endo_date between ('${fromDate}') and ('${toDate}') and endo_status=1 order by qi_endo_date`,
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
                 error_status=?,
                 error_details=?,
                 error_resaon=?,
                 error_corrective=?, 
                 error_preventive=?,
                 redo_status=?,
                 redos_reason=?,
                 redos_corrective=?,
                 redos_preventive=?,
                 incidense_error_status=?, 
                 incidense_description=?,
                 incidense_action=?,
                 falls_status=?,
                 near_misses_status=?,
                 sentinel_events_status=?,
                 qi_status=?,
                 edit_user=?
            WHERE 
                 qi_endo_slno=?`,
            [
                data.test_req_date,
                data.endo_arrival_time,
                data.assessment_time,
                data.proc_start_time,
                data.proc_end_time,
                data.report_gene_time,
                data.report_desp_time,
                data.error_status,
                data.error_details,
                data.error_resaon,
                data.error_corrective,
                data.error_preventive,
                data.redo_status,
                data.redos_reason,
                data.redos_corrective,
                data.redos_preventive,
                data.incidense_error_status,
                data.incidense_description,
                data.incidense_action,
                data.falls_status,
                data.near_misses_status,
                data.sentinel_events_status,
                data.qi_status,
                data.edit_user,
                data.qi_endo_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },



    // EndoscopyQiUpdate: (data, callback) => {
    //     pool.query(
    //         `UPDATE 
    //              qi_details_endoscopy 
    //          SET 
    //              total_patients=?,
    //              total_error_report=?,
    //              total_redose=?,
    //              total_sumof_time=?,
    //              total_ident_error=?,
    //              total_falls=?,
    //              total_sentinels_analyse=?,
    //              total_sentinels_collect=?,
    //              total_near_misses=?,
    //              total_incidents=?,
    //              edit_user=?
    //         WHERE 
    //              qi_daily_endos_slno=?`,
    //         [
    //             data.total_patients,
    //             data.total_error_report,
    //             data.total_redose,
    //             data.total_sumof_time,
    //             data.total_ident_error,
    //             data.total_falls,
    //             data.total_sentinels_analyse,
    //             data.total_sentinels_collect,
    //             data.total_near_misses,
    //             data.total_incidents,
    //             data.edit_user,
    //             data.qi_daily_endos_slno
    //         ],
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callback(error);
    //             }
    //             return callback(null, results);
    //         }
    //     )
    // },

    // getQualityInicatorList: (id, callBack) => {
    //     pool.query(
    //         `SELECT 
    //                qi_slno, 
    //                qi_name
    //           FROM
    //                qi_indicator_mast
    //           WHERE qi_status=1 AND qi_dept_slno=?
    //             `,
    //         [id],
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callBack(error);
    //             }
    //             return callBack(null, results);
    //         }
    //     );
    // },
    // getQIReportEndoscopy: (data, callBack) => {
    //     const fromDate = data.from;
    //     const toDate = data.to;
    //     pool.query(
    //         `SELECT
    //                 * from qi_details_endoscopy
    //          WHERE
    //                qi_date between ('${fromDate}') and ('${toDate}') order by qi_date`,
    //         {},
    //         (err, results, fields) => {
    //             if (err) {
    //                 return callBack(err)
    //             }
    //             return callBack(null, results)
    //         }
    //     )
    // },

}
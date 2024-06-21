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
                   error_incident_type,redos_incident_type,falls_incident_type,ident_error_incident_type,nearmiss_incident_type,
                   sentinel_incident_type,equip_start_time,equip_end_time,emp_id,sentinel_analysed
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
                   redos_incident_type,falls_incident_type,ident_error_incident_type,nearmiss_incident_type,sentinel_analysed,
                   sentinel_incident_type,qi_save_status,equip_start_time,equip_end_time,qi_details_endoscopy.emp_id,
                   co_employee_master.em_name,co_employee_master.em_no,equip_service_time
             FROM  
                   qi_details_endoscopy 
			 LEFT JOIN co_employee_master ON co_employee_master.em_id=qi_details_endoscopy.emp_id
             WHERE
                  patient_arrived_date between ('${fromDate}') and ('${toDate}') and qi_status=1 and qi_save_status=1
                  order by patient_arrived_date`,
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
                 assessment_benchmark_flag=?,
                 equip_no=?,
                 equip_start_time=?,
                 equip_end_time=?,
                 procedure_name=?,
                 emp_id=?,
                 sentinel_analysed=?,
                 equip_service_time=?
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
                data.equip_no,
                data.equip_start_time,
                data.equip_end_time,
                data.procedure_name,
                data.emp_id,
                data.sentinel_analysed,
                data.equip_service_time,
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
                    nearmisses_reason,error_incident_type,redos_incident_type,falls_incident_type,sentinel_analysed,
                    ident_error_incident_type,nearmiss_incident_type,sentinel_incident_type,qi_save_status
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
                   incident_falls_slno,incident_nearmisses_slno,incident_sentinel_slno,initial_assessment_reason,assessment_benchmark_flag,
                   equip_start_time,equip_end_time,emp_id,sentinel_analysed
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
                   qi_slno,patient_arrived_date,ptno,ptname,ptsex,ptage,doctor_name,sumof_service_time,
                   initial_assessment_reason,assessment_benchmark_flag,endo_arrival_time
             FROM  
                   qi_details_endoscopy
             WHERE 
                   patient_arrived_date between ? and ? and qi_save_status=1 and
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

    InchargeApprovalSave: (data, callback) => {
        pool.query(
            `INSERT INTO qi_endoscopy_approval_details
                (qi_dept_no, qi_endo_date, endo_incharge_apprv_status, endo_incharge_remarks,
                 endo_incharge_id, endo_Incharge_apprv_date)
                 VALUES (?,?,?,?,?,?)`,
            [
                data.qi_dept_no,
                data.qi_endo_date,
                data.endo_incharge_apprv_status,
                data.endo_incharge_remarks,
                data.endo_incharge_id,
                data.endo_Incharge_apprv_date
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    InchargeApprvlView: (data, callBack) => {
        pool.query(
            `SELECT 
                   apprv_slno, qi_dept_no, qi_endo_date, endo_incharge_apprv_status, endo_incharge_remarks,
                   endo_incharge_id,endo_Incharge_apprv_date,qi_endoscopy_approval_details.endo_incharge_id,
                   I.em_name as inchrge,I.em_no as inchargeno,endo_hod_apprv_status,endo_hod_remarks,
                   endo_hod_apprv_date,endo_hod_id,H.em_name as hod,H.em_no as hodno
            FROM  
                   qi_endoscopy_approval_details
                   LEFT JOIN co_employee_master I on I.em_id =qi_endoscopy_approval_details.endo_incharge_id
                   LEFT JOIN co_employee_master H on H.em_id =qi_endoscopy_approval_details.endo_hod_id
            WHERE 
                   qi_endo_date =? and qi_dept_no=?`,
            [
                data.qi_endo_date,
                data.qi_dept_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getEmployeeList: (id, callBack) => {
        pool.query(
            `SELECT
                   em_id,em_name,em_no
             FROM
                   co_employee_master
             LEFT JOIN qi_dept_mast ON qi_dept_mast.qi_co_deptsec_slno=co_employee_master.em_dept_section
             WHERE
                   qi_dept_mast.qi_dept_no=? `,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    IPEndoscopyInsert: (data, callback) => {
        pool.query(
            `INSERT INTO qi_endoscopy_iplist
          (
            ip_no, ipd_date, ptno, ptname, ptsex, ptage, ptaddrs1, ptaddrs2, ptaddrs3, ptaddrs4, ptmobile,
            ip_bed, doctor_name, ip_nurstation, qi_dept_no,create_user,endo_arrival_time
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

    IPEndoscopyExist: (data, callBack) => {
        pool.query(
            `select ptno from qi_endoscopy_iplist where ip_no=?`,
            [
                data
            ],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },
    ViewIpPatientsView: (callBack) => {
        pool.query(
            `SELECT 
                   qi_endo_ip_slno, ip_no, ipd_date, ptno, ptname, ptsex, ptage, ptaddrs1, ptaddrs2, ptaddrs3, ptaddrs4,
                   ptmobile, ip_bed, doctor_name, ip_nurstation, qi_dept_no, qi_save_status, error_status, error_details,
                   error_reason, error_corrective, error_preventive, incident_error_slno, incident_error_date,
                   error_incident_type, redo_status, redos_details, redos_reason, redos_corrective, redos_preventive,
                   incident_redos_slno, incident_redos_date, redos_incident_type, incidence_ident_error_status,
                   incidence_ident_description, incidence_ident_reason, incidence_ident_action, incidence_ident_slno,
                   incidence_ident_date, ident_error_incident_type, falls_status, falls_details, falls_reason,
                   incident_falls_slno, incident_falls_date, falls_incident_type, sentinel_events_status,sentinel_details,
                   sentinel_reason, sentinel_analysed, incident_sentinel_slno, incident_sentinel_date,
                   sentinel_incident_type, near_misses_status, nearmisses_details, nearmisses_reason,
                   incident_nearmisses_slno, incident_nearmisses_date, nearmiss_incident_type, test_req_date,
                   endo_arrival_time, assessment_time, proc_start_time, proc_end_time, report_gene_time,
                   report_desp_time, sumof_service_time,initial_assessment_reason,assessment_benchmark_flag,
                   equip_start_time,equip_end_time,emp_id
             FROM
                   qi_endoscopy_iplist
                   ORDER BY qi_endo_ip_slno DESC `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    IPEndoscopyQIUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                 qi_endoscopy_iplist 
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
                 assessment_benchmark_flag=?,
                 equip_no=?,
                 equip_start_time=?,
                 equip_end_time=?,
                 procedure_name=?,
                 emp_id=?,
                 sentinel_analysed=?,
                 equip_service_time=?
            WHERE 
                 qi_endo_ip_slno=?`,
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
                data.equip_no,
                data.equip_start_time,
                data.equip_end_time,
                data.procedure_name,
                data.emp_id,
                data.sentinel_analysed,
                data.equip_service_time,
                data.qi_endo_ip_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getIPIncidentForEndoscopy: (data, callBack) => {
        pool.query(
            `SELECT 
                    incident_error_slno,incident_error_date,error_details,error_reason,incident_redos_slno,
                    incident_redos_date,redos_details, redos_reason,incidence_ident_slno,incidence_ident_date,
                    incidence_ident_description,incidence_ident_reason,incident_falls_slno,incident_falls_date,
                    falls_details, falls_reason,incident_sentinel_slno,incident_sentinel_date,sentinel_details,
                    sentinel_reason,incident_nearmisses_slno,incident_nearmisses_date,nearmisses_details,
                    nearmisses_reason,error_incident_type,redos_incident_type,falls_incident_type,sentinel_analysed,
                    ident_error_incident_type,nearmiss_incident_type,sentinel_incident_type,qi_save_status
             FROM     
                    qi_endoscopy_iplist
             WHERE
                    qi_endo_ip_slno=?`,
            [
                data.qi_endo_ip_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getInpatientEndoscopyMonthlyView: (data, callBack) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `SELECT
                   qi_endo_ip_slno,ip_no,ipd_date,ptno,ptname,ptsex,ptage,ptaddrs1,ptaddrs2,ptaddrs3,ptaddrs4,
                   ptmobile,ip_bed,doctor_name,ip_nurstation,qi_save_status,error_status,error_details,
                   error_reason,error_corrective, error_preventive,incident_error_date,error_incident_type,
                   redo_status,redos_details,redos_reason,redos_corrective,redos_preventive,incident_redos_date,
                   redos_incident_type,incidence_ident_error_status,incidence_ident_description,incidence_ident_reason,
                   incidence_ident_action,incidence_ident_date,ident_error_incident_type, falls_status,falls_details,
                   falls_reason,incident_falls_date,falls_incident_type,sentinel_events_status,sentinel_details,
                   sentinel_reason,sentinel_analysed,incident_sentinel_date,sentinel_incident_type, near_misses_status,
                   nearmisses_details,nearmisses_reason,incident_nearmisses_date,nearmiss_incident_type,test_req_date,
                   endo_arrival_time,assessment_time,proc_start_time,proc_end_time,report_gene_time,report_desp_time,
                   sumof_service_time,initial_assessment_reason,assessment_benchmark_flag,equip_start_time,equip_end_time,co_employee_master.em_no,
                   qi_endoscopy_iplist.emp_id,co_employee_master.em_name,equip_service_time                
             FROM  
                   qi_endoscopy_iplist 
			 LEFT JOIN co_employee_master ON co_employee_master.em_id=qi_endoscopy_iplist.emp_id
             WHERE
                  endo_arrival_time between ('${fromDate}') and ('${toDate}') and qi_save_status=1
                  order by qi_endo_ip_slno`,
            {},
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },
    EquipmentDetailsInsert: (data, callback) => {

        pool.query(
            `INSERT INTO qi_endoscopy_equipment_details
            ( 
             qi_slno, qi_endo_ip_slno,equip_no, procedure_name,endo_date
            )
            VALUES ?`,
            [data],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    OPequipmentDetailExist: (id, callBack) => {
        pool.query(
            `WITH parsed_equipment AS (
             SELECT 
                   equip_no,equip_name,
                   JSON_UNQUOTE(JSON_EXTRACT(procedure_names, CONCAT('$[', numbers.n, ']'))) AS pd_code_element
             FROM 
                   qi_equipment_mast
             JOIN  (
                   SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL
                   SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
                  ) numbers ON numbers.n < JSON_LENGTH(procedure_names)),
                  extracted_data AS (
             SELECT 
                   equip_no,equip_name,
                   JSON_UNQUOTE(JSON_EXTRACT(pd_code_element, '$.PD_CODE')) AS pd_code,
                   JSON_UNQUOTE(JSON_EXTRACT(pd_code_element, '$.PDC_DESC')) AS PDC_DESC
             FROM 
                   parsed_equipment)
             SELECT 
                   ft.qi_slno,
                   ft.equip_no,
                   ed.equip_name,
                   ft.procedure_name as PD_CODE,
                   ed.PDC_DESC
             FROM 
                   qi_endoscopy_equipment_details ft
             JOIN 
                   extracted_data ed ON ft.equip_no = ed.equip_no AND ft.procedure_name = ed.pd_code
             WHERE
                   ft.qi_slno=?`,
            [id],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },

    OPdeleteEquipment: (id, callBack) => {
        pool.query(
            `DELETE from qi_endoscopy_equipment_details
            WHERE qi_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    IPequipmentDetailExist: (id, callBack) => {
        pool.query(
            `WITH parsed_equipment AS (
             SELECT 
                   equip_no,equip_name,
                   JSON_UNQUOTE(JSON_EXTRACT(procedure_names, CONCAT('$[', numbers.n, ']'))) AS pd_code_element
             FROM 
                   qi_equipment_mast
             JOIN  (
                   SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL
                   SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
                  ) numbers ON numbers.n < JSON_LENGTH(procedure_names)),
                  extracted_data AS (
             SELECT 
                   equip_no,equip_name,
                   JSON_UNQUOTE(JSON_EXTRACT(pd_code_element, '$.PD_CODE')) AS pd_code,
                   JSON_UNQUOTE(JSON_EXTRACT(pd_code_element, '$.PDC_DESC')) AS PDC_DESC
             FROM 
                   parsed_equipment)
             SELECT 
                   ft.qi_slno,
                   ft.equip_no,
                   ed.equip_name,
                   ft.procedure_name as PD_CODE,
                   ed.PDC_DESC
             FROM 
                   qi_endoscopy_equipment_details ft
             JOIN 
                   extracted_data ed ON ft.equip_no = ed.equip_no AND ft.procedure_name = ed.pd_code
             WHERE
                   ft.qi_endo_ip_slno=?`,
            [id],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },

    IPdeleteEquipment: (id, callBack) => {
        pool.query(
            `DELETE from qi_endoscopy_equipment_details
            WHERE qi_endo_ip_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    getTotalTestPerformed: (data, callBack) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `SELECT 
                    procedure_name,endo_date
             FROM
                   qi_endoscopy_equipment_details
             WHERE
                    endo_date between ('${fromDate}') and ('${toDate}')       `,
            {},
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },
    IPAseessExceededList: (data, callBack) => {
        pool.query(
            `SELECT 
                   qi_endo_ip_slno,ip_no,ipd_date,ptno,ptname,ptsex,ptage,doctor_name,sumof_service_time,
                   initial_assessment_reason,assessment_benchmark_flag,endo_arrival_time
             FROM  
                   qi_endoscopy_iplist
             WHERE 
                   endo_arrival_time between ? and ? and qi_save_status=1 and
                   assessment_benchmark_flag=1  order by endo_arrival_time`,
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
    HODApprovalSave: (data, callback) => {
        pool.query(
            `INSERT INTO
                 qi_endoscopy_approval_details
                ( qi_dept_no, qi_endo_date, endo_hod_apprv_status, endo_hod_remarks, endo_hod_apprv_date, endo_hod_id)
                 VALUES (?,?,?,?,?,?)`,
            [
                data.qi_dept_no,
                data.qi_endo_date,
                data.endo_hod_apprv_status,
                data.endo_hod_remarks,
                data.endo_hod_apprv_date,
                data.endo_hod_id
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    HODApprovalUpdate: (data, callBack) => {
        pool.query(
            `update
                  qi_endoscopy_approval_details
             set
                  endo_hod_apprv_status=?, endo_hod_remarks=?, endo_hod_apprv_date=?,
                  endo_hod_id=?
             where
                   apprv_slno=?`,
            [
                data.endo_hod_apprv_status,
                data.endo_hod_remarks,
                data.endo_hod_apprv_date,
                data.endo_hod_id,
                data.apprv_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

}
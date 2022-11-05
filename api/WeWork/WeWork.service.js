const { pool } = require('../../config/database');

module.exports = {
    getinpatientList: (id, callBack) => {
        pool.query(
            ` SELECT 
            wework_patient.ip_no,
            wework_patient.pt_no,
            wework_patient.bd_code,
            wework_patient.ipd_date as DOA,
             TIMESTAMPDIFF(YEAR, ptd_dob, CURDATE()) AS age,
            wework_patient.ptc_ptname,
            doc_name,
            rmc_desc,
            wework_patient.ptc_sex,
            wework_patient.ipd_disc as DOD
            FROM meliora.wework_patient
            left join ora_roomcategory on wework_patient.rc_code = ora_roomcategory.rc_code
            left join ora_doctor on wework_patient.do_code = ora_doctor.do_code
            left join ora_ipadmiss on wework_patient.ip_no = ora_ipadmiss.ip_no
            left join ora_bed on wework_patient.bd_code = ora_bed.bd_code
            left join ora_nurstation on ora_bed.ns_code = ora_nurstation.ns_code
            left join room_master on ora_bed.rm_code = room_master.rm_code
            left join ora_roommaster on ora_bed.rm_code= ora_roommaster.rm_code    
            where ora_nurstation.ns_code = ?`,

            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    insertpatientsurv: (data, callback) => {


        pool.query(
            `insert into we_patient_surv_log 
            (
         we_surv_slno,
            ip_no,
            bd_code,
            discharge_wright,
            shift_from,
            shift_to,
            recieved_time,
            room_category,
            bed_type,
            tv_ac_remot,
            telephone,
            geezer,
            dietition_visit_tme,
            stat_medicine,
            stat_recived_time,
            assigned_nurse,
            payment_mode,
            document_status,
            creadit_detail,
            package,
            remarks_we,
            sfa_mfa,
            we_employee,
            room_amentites,
            pateint_service
            )
            values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [

                data.we_surv_slno,
                data.ip_no,
                data.bd_code,
                data.discharge_wright,
                // data.bill_ready,
                // data.actual_discharge,
                data.shift_from,
                data.shift_to,
                data.recieved_time,
                data.room_category,
                data.bed_type,
                JSON.stringify(data.tv_ac_remot),
                data.telephone,
                data.geezer,
                data.dietition_visit_tme,
                data.stat_medicine,
                data.stat_recived_time,
                data.assigned_nurse,
                data.payment_mode,
                data.document_status,
                data.creadit_detail,
                data.package,
                data.remarks_we,
                data.sfa_mfa,
                data.we_employee,
                JSON.stringify(data.room_amentites),
                JSON.stringify(data.pateint_service)
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    InsertDailyActivity: (data, callback) => {

        pool.query(
            `insert into we_daily_activity
            (srv_slno,
            visit_time,
            diet_status,
            room_clean,
            sheet_change,
            dr_round,
            imortant_note,
            dietian_round,
            bill_audit,
            asset_usage,
            patient_board_update,
            insurance_status,
            ip_no,
            create_empid,
            activity_date
            )
            values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.srv_slno,
                data.visit_time,
                JSON.stringify(data.diet_status),
                data.room_clean,
                data.sheet_change,
                data.dr_round,
                data.imortant_note,
                data.dietian_round,
                data.bill_audit,
                JSON.stringify(data.asset_usage),
                data.patient_board_update,
                data.insurance_status,
                data.ip_no,
                data.create_empid,
                data.activity_date

            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getsurvslno: (id, callBack) => {
        pool.query(
            ` SELECT surv_slno FROM meliora.we_patient_survillance
            where ip_no=?`,

            [
                id

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    getsurvslnoonly: (id, callBack) => {
        pool.query(
            ` SELECT surv_slno FROM meliora.we_patient_survillance
            where ip_no=?`,

            [
                id

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },



    Insertsrvtable: (data, callBack) => {
        pool.query(
            `insert into  we_patient_survillance 
            (ip_no ,pt_no,admission_date) 
            values (?,?,?)`,
            [
                data.ip_no,
                data.pt_no,
                data.admission_date
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getsurvslnointraction: (data, callBack) => {
        pool.query(
            `insert into we_interaction_remarks 
            (surv_slno,remarks,remark_date,particular,status,submit_employee)
            values(?,?,?,?,?,?)`,
            [
                data.surv_slno,
                data.remarks,
                data.remark_date,
                data.particular,
                data.status,
                data.submit_employee
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
    getAsignedStaff: (id, callBack) => {

        pool.query(
            `select co_employee_master.em_id,co_employee_master.em_name
        from co_nursestation
        left join co_employee_master on co_employee_master.em_dept_section=co_nursestation.co_dept_sec_slno
        where co_ora_nurse=?`,
            [
                id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
    getdailyactivity: (id, callBack) => {
        pool.query(
            `select activity_slno, 
            activity_date,
            visit_time,
           we_daily_activity.ip_no,
           diet_status,
           ptc_ptname,
           (case when room_clean = "1" then 'yes' else 'no' end) as room_clean ,
           (case when sheet_change = "1" then 'yes' else 'no' end) as sheet_change ,
           (case when dr_round = "1" then 'yes' else 'no' end) as dr_round ,
           (case when dietian_round = "1" then 'yes' else 'no' end) as dietian_round ,
           (case when bill_audit = "1" then 'yes' else 'no' end) as bill_audit ,
           (case when patient_board_update = "1" then 'yes' else 'no' end) as patient_board_update ,
           (case when insurance_status = "1" then 'yes' else 'no' end) as insurance_status ,
           asset_usage,
           imortant_note
           from we_daily_activity 
           left join wework_patient on we_daily_activity.ip_no = wework_patient.ip_no
           where we_daily_activity.ip_no =? `,
            [
                id
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getintraction: (id, callBack) => {
        pool.query(
            `select inter_remark_slno ,remark_date,
            particular,
             wework_patient.ptc_ptname,
            status,remarks 
            from we_interaction_remarks
            left join we_patient_survillance on we_interaction_remarks.surv_slno = we_patient_survillance.surv_slno
            left join wework_patient on we_patient_survillance.ip_no = wework_patient.ip_no
            where we_patient_survillance.ip_no = ?`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateActivity: (data, callback) => {
        pool.query(
            `update we_daily_activity
            set 
            activity_date =?,
            visit_time=? ,
            diet_status=?,
            room_clean=?,
            sheet_change=?,
            dr_round=?,
            imortant_note=?,
            dietian_round=?,
            bill_audit=?,
            asset_usage=?,
            patient_board_update=?,
            insurance_status=?,
            update_empid =?
            where activity_slno =?`,
            [

                data.activity_date,
                data.visit_time,
                JSON.stringify(data.diet_status),
                data.room_clean,
                data.sheet_change,
                data.dr_round,
                data.imortant_note,
                data.dietian_round,
                data.bill_audit,
                JSON.stringify(data.asset_usage),
                data.patient_board_update,
                data.insurance_status,
                data.update_empid,
                data.activity_slno
            ],
            (error, results, feilds) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    updateIntraction: (data, callback) => {
        pool.query(
            `update we_interaction_remarks 
            set particular  = ?,
            status =?,
            remarks =?,
            submit_employee=?
            where inter_remark_slno = ?`,
            [
                data.particular,
                data.status,
                data.remarks,
                data.submit_employee,
                data.inter_remark_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getwedetail: (id, callBack) => {
        pool.query(
            `SELECT we_patient_surv_log.ip_no,
            ptc_ptname,we_patient_surv_log.bd_code,
            discharge_wright,
            shift_from,
            shift_to,
            recieved_time,
            room_category,
             bed_type,
             room_amentites,
             tv_ac_remot,
            telephone,
           geezer,
            dietition_visit_tme,
            stat_medicine,
            stat_recived_time,
           payment_mode,
            document_status,
            creadit_detail,
             package as patpackage,
            sfa_mfa,
            assigned_nurse,
            pateint_service,
            remarks_we,we_surv_slno,surv_log_slno
             FROM meliora.we_patient_surv_log
             left join ora_nurstation on we_patient_surv_log.shift_from = ora_nurstation.ns_code
             left join wework_patient on we_patient_surv_log.ip_no = wework_patient.ip_no
             where we_patient_surv_log.ip_no = ?`,

            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateweDetail: (data, callback) => {
        pool.query(
            `update  we_patient_surv_log
            set discharge_wright = ?,
                        shift_from =?,
                        shift_to =?,
                        recieved_time =? ,
                        room_category =?,
                        bed_type =? ,
                        telephone =? ,
                        geezer =?,
                        dietition_visit_tme =? ,
                        stat_medicine =?,
                        stat_recived_time =? ,
                        assigned_nurse =?,
                        payment_mode =? ,
                        document_status =? ,
                        creadit_detail =?,
                        package = ?,
                        remarks_we =? ,
                        sfa_mfa =?,
                        we_employee = ?,
                        tv_ac_remot = ?,
                       room_amentites = ?,
                       pateint_service = ?
                        where  surv_log_slno = ?`,
            [
                data.discharge_wright,
                // data.bill_ready,
                // data.actual_discharge,
                data.shift_from,
                data.shift_to,
                data.recieved_time,
                data.room_category,
                data.bed_type,
                data.telephone,
                data.geezer,
                data.dietition_visit_tme,
                data.stat_medicine,
                data.stat_recived_time,
                data.assigned_nurse,
                data.payment_mode,
                data.document_status,
                data.creadit_detail,
                data.package,
                data.remarks_we,
                data.sfa_mfa,
                data.we_employee,
                JSON.stringify(data.tv_ac_remot),
                JSON.stringify(data.room_amentites),
                JSON.stringify(data.pateint_service),
                data.surv_log_slno

            ],
            (error, results, feilds) => {


                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    selectsurvslno: (data, callBack) => {
        pool.query(
            ` select surv_slno from we_patient_survillance
            where ip_no =? and pt_no=?`,

            [
                data.ip_no,
                data.pt_no

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    selectsurlogslno: (data, callBack) => {
        pool.query(
            ` select surv_log_slno from we_patient_surv_log
            where shift_from = ? and shift_to=? and we_surv_slno=?`,

            [
                data.shift_from,
                data.shift_to,
                data.we_surv_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    }

}
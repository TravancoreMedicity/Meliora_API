// const { log } = require('winston');
const { pool } = require('../../config/database');

module.exports = {
    getinpatientList: (id, callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            wework_patient.ip_no,
            wework_patient.pt_no,
            wework_patient.bd_code,
            wework_patient.ipd_date as DOA,
            TIMESTAMPDIFF(YEAR, ptd_dob, CURDATE()) AS age,
            wework_patient.ptc_ptname,
            doc_name,
            rmc_desc,
            wework_patient.ptc_sex,
            ora_nurstation.nsc_desc,
            act_disc_status,
            wework_patient.ipd_disc as DOD
            FROM meliora.wework_patient
            left join ora_roomcategory on wework_patient.rc_code = ora_roomcategory.rc_code
            left join ora_doctor on wework_patient.do_code = ora_doctor.do_code
            left join ora_ipadmiss on wework_patient.ip_no = ora_ipadmiss.ip_no
            left join ora_bed on wework_patient.bd_code = ora_bed.bd_code
            left join ora_nurstation on ora_bed.ns_code = ora_nurstation.ns_code
            left join room_master on ora_bed.rm_code = room_master.rm_code
            left join ora_roommaster on ora_bed.rm_code= ora_roommaster.rm_code
            left join we_discharge on wework_patient.ip_no = we_discharge.ip_no
            where ora_nurstation.ns_code = ? and (we_discharge.act_disc_status = 0 or we_discharge.act_disc_status is null)`,
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
        console.log(data);
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
            pat_surv_key,
            pat_surv_callbell,
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
            pateint_service,
            bhrc_patient,
            if_dama,
            dama_remarks
            )
            values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
                data.pat_surv_key,
                data.pat_surv_callbell,
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
                JSON.stringify(data.pateint_service),
                data.bhrc_patient,
                data.if_dama,
                data.dama_remarks
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
            activity_date,
            activity_time,
            dr_visit_time
            )
            values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.srv_slno,
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
                data.activity_date,
                data.activity_time,
                data.dr_visit_time

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
            (surv_slno,remarks,remark_date,remark_time,particular,status,submit_employee)
            values(?,?,?,?,?,?,?)`,
            [
                data.surv_slno,
                data.remarks,
                data.remark_date,
                data.remark_time,
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
            `select
            ROW_NUMBER() OVER () as slno, 
            activity_slno, 
            (case when activity_date is null  then null else activity_date end)activity_date,
           we_daily_activity.ip_no,
           diet_status,
           ptc_ptname,
           dr_visit_time,
           time(activity_time) as Time,
           activity_time,
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
            `select 
            ROW_NUMBER() OVER () as slno, 
            inter_remark_slno ,
            (case when remark_date is null then null else remark_date end)remark_date,
            case when particular = '' then  'not updated' else particular end as particular,
             wework_patient.ptc_ptname,
            status,
            remark_time,
           case when  remarks = '' then 'not updated' else remarks end as remarks
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
            activity_time = ?,
            dr_visit_time =?,
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
                data.activity_time,
                data.dr_visit_time,
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
            remark_date = ?,
            remark_time =?,
            remarks =?,
            submit_employee=?
            where inter_remark_slno = ?`,
            [
                data.particular,
                data.status,
                data.remark_date,
                data.remark_time,
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
    getwedetail: (data, callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as sl_no, 
            we_patient_surv_log.ip_no,
            ptc_ptname,we_patient_surv_log.bd_code,
            (case when discharge_wright is null then null else discharge_wright end)discharge_wright,
            shift_from,
            shift_to,
            (case when recieved_time is null then null else recieved_time end ) recieved_time ,
            room_category,
             bed_type,
             room_amentites,
             tv_ac_remot,
            telephone,
            geezer,
            pat_surv_callbell,
            pat_surv_key,
            (case when dietition_visit_tme is null then null else dietition_visit_tme end) dietition_visit_tme ,
            (case when stat_medicine  is null then null else stat_medicine end) stat_medicine,
            (case  when stat_recived_time is null then null else stat_recived_time end) stat_recived_time,
            payment_mode,
            document_status,
            creadit_detail,
             package as patpackage,
            sfa_mfa,
            assigned_nurse,
            pateint_service,
            dama_remarks,
            if_dama,
            bhrc_patient,
            remarks_we,we_surv_slno,surv_log_slno
             FROM meliora.we_patient_surv_log
             left join ora_nurstation on we_patient_surv_log.shift_from = ora_nurstation.ns_code
             left join wework_patient on we_patient_surv_log.ip_no = wework_patient.ip_no
             where we_patient_surv_log.ip_no = ? and we_patient_surv_log.bd_code = ?`,
            [
                data.ip_no,
                data.bd_code
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
                        pat_surv_key = ?,
                        pat_surv_callbell = ?,
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
                       pateint_service = ?,
                       bhrc_patient = ?,
                       if_dama = ?,
                       dama_remarks = ?
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
                data.pat_surv_key,
                data.pat_surv_callbell,
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
                data.bhrc_patient,
                data.if_dama,
                data.dama_remarks,
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
            `select surv_slno from we_patient_survillance
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
            `select surv_log_slno from we_patient_surv_log
            where shift_to=? and we_surv_slno=?`,

            [

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

    },
    checkInsertVal: (data, callBack) => {
        pool.query(
            `select srv_slno from we_daily_activity
            where activity_date = ? and srv_slno = ?`,
            [
                data.activity_date,
                data.srv_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    checkinsertintra: (data, callBack) => {
        pool.query(
            `select surv_slno from we_interaction_remarks
            where remark_date = ?  and surv_slno=?`,
            [
                data.remark_date,
                data.surv_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )

    },
    checkDischargeEvent: (data, callBack) => {
        pool.query(
            `select surv_slno from we_discharge
             where ip_no = ? and surv_slno =?`,
            [

                data.ip_no,
                data.surv_slno
            ],
            (error, results, field) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getTotalAdmission: (callBack) => {
        pool.query(
            `select ip_no ,pt_no,ipd_date,ptc_ptname,ptc_sex,bdc_no,rcc_desc,doc_name,nsc_desc,ipd_disc,ptc_mobile
            from wework_patient
            left join ora_bed on wework_patient.bd_code = ora_bed.bd_code
            left join ora_nurstation on ora_bed.ns_code = ora_nurstation.ns_code
            left join ora_roomcategory on wework_patient.rc_code = ora_roomcategory.rc_code
            left join ora_doctor on wework_patient.do_code = ora_doctor.do_code`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getDamalist: (callBack) => {
        pool.query(
            `SELECT we_patient_surv_log.ip_no ,
            ipd_date,pt_no,ptc_ptname,
            ora_roommaster.rmc_desc,
            date(discharge_wright) as disc_date,
            time(discharge_wright) as disc_time,
            dama_remarks,
            doc_name,
            (case when payment_mode = 1 then "Cash" when payment_mode = 2 then "Insurence" when payment_mode = 3 then "Other credit" else "no payemnt" end) payment_mode
            FROM meliora.we_patient_surv_log
            left join wework_patient on we_patient_surv_log.ip_no = wework_patient.ip_no
            left join ora_bed on wework_patient.bd_code =ora_bed.bd_code
            left join room_master on  ora_bed.rm_code = room_master.rm_code
            left join ora_roommaster on room_master.rm_code = ora_roommaster.rm_code
            left join ora_doctor on wework_patient.do_code = ora_doctor.do_code
            where if_dama = 1 `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getBhrcList: (callBack) => {
        pool.query(
            `SELECT we_patient_surv_log.ip_no ,
            pt_no,ipd_date,ptc_ptname,
            t.ns_code as shift_from ,
            ora_roommaster.rmc_desc,
            f.ns_code as shift_to,bdc_no,
            dietition_visit_tme,
            stat_medicine,
            ipd_status,
            stat_recived_time,
            doc_name
            FROM meliora.we_patient_surv_log
            left join wework_patient on we_patient_surv_log.ip_no = wework_patient.ip_no
            left join ora_nurstation t on t.ns_code = we_patient_surv_log.shift_from
            left join ora_nurstation f on f.ns_code = we_patient_surv_log.shift_to
            left join ora_bed on wework_patient.bd_code =ora_bed.bd_code
            left join room_master on  ora_bed.rm_code = room_master.rm_code
            left join ora_roommaster on room_master.rm_code = ora_roommaster.rm_code
            left join ora_doctor on wework_patient.do_code = ora_doctor.do_code
            where bhrc_patient = 1
            group by ip_no`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getDocVisit: (callBack) => {
        pool.query(
            `SELECT date(dr_visit_time) Visit_date,
            we_patient_survillance.ip_no,
            we_patient_survillance.pt_no,
            ptc_ptname,
            doc_name,
            admission_date,
            ora_roommaster.rmc_desc,
            we_patient_survillance.admission_date,
            t.ns_code as shift_from,
             f.ns_code as shift_to,
            time(dr_visit_time) as visit_tme
            FROM meliora.we_daily_activity
            left join we_patient_survillance on we_daily_activity.srv_slno = we_patient_survillance.surv_slno
            left join wework_patient on we_patient_survillance.ip_no = wework_patient.ip_no
            left join ora_doctor on wework_patient.do_code = ora_doctor.do_code
            left join ora_bed on wework_patient.bd_code =ora_bed.bd_code
            left join room_master on  ora_bed.rm_code = room_master.rm_code
            left join ora_roommaster on room_master.rm_code = ora_roommaster.rm_code
            left join we_patient_surv_log on wework_patient.ip_no = we_patient_surv_log.ip_no
            left join ora_nurstation t on t.ns_code = we_patient_surv_log.shift_from
            left join ora_nurstation f on f.ns_code = we_patient_surv_log.shift_to
            where time(dr_visit_time) > "02-00-00"
            group by ip_no`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    DischargeAfternoonList: (callBack) => {
        pool.query(
            `  select we_patient_surv_log.ip_no,
            pt_no,ipd_date,ptc_ptname,
            t.nsc_desc as shift_from ,
            doc_name,
            ora_roommaster.rmc_desc,
			f.nsc_desc as shift_to,bdc_no ,discharge_wright,
            date(actual_discharge) actual_disc,
            time(actual_discharge) disc_time,
            (case when payment_mode= 1 then "cash" when payment_mode=2 then "insurence" else "other credit" end ) as payment_mode
            from we_patient_surv_log
            left join wework_patient on we_patient_surv_log.ip_no = wework_patient.ip_no
                        left join ora_nurstation t on t.ns_code =  we_patient_surv_log.shift_to
                        left join ora_nurstation f on f.ns_code =  we_patient_surv_log.shift_from
                        left join ora_bed on wework_patient.bd_code =ora_bed.bd_code
                        left join room_master on  ora_bed.rm_code = room_master.rm_code
                        left join ora_roommaster on room_master.rm_code = ora_roommaster.rm_code
                        left join ora_doctor on wework_patient.do_code = ora_doctor.do_code
            where time(actual_discharge) > '02-00-00'`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getOneSheetList: (callBack) => {
        pool.query(
            `SELECT we_patient_surv_log.ip_no,
            pt_no,ipd_date,ptc_ptname,
            t.nsc_desc as shift_from ,
            doc_name,
                        ora_roommaster.rmc_desc,
                        f.nsc_desc as shift_to,bdc_no
                        FROM meliora.we_patient_surv_log
                        left join wework_patient on we_patient_surv_log.ip_no = wework_patient.ip_no
                        left join ora_nurstation t on t.ns_code =  we_patient_surv_log.shift_to
                        left join ora_nurstation f on f.ns_code =  we_patient_surv_log.shift_from
                        left join ora_bed on wework_patient.bd_code =ora_bed.bd_code
                        left join room_master on  ora_bed.rm_code = room_master.rm_code
                        left join ora_roommaster on room_master.rm_code = ora_roommaster.rm_code
                        left join ora_doctor on wework_patient.do_code = ora_doctor.do_code
                        group by we_patient_surv_log.ip_no
                        HAVING COUNT(we_patient_surv_log.ip_no) = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getsruvillenceDetl: (id, callBack) => {
        pool.query(
            `select we_patient_surv_log.ip_no, 
            ptc_ptname,
            t.nsc_desc as shift_to,
            f.nsc_desc as shift_from,
            recieved_time,
            bdc_no,
            (case when room_category = 1 then 'normal' when room_category = 2 then 'Ac' when room_category = 3 then 'Ac delux' when room_category = 4 then 'Vip' when room_category = 2 then 'VIP suite' else 'none' end) as room_category,
            (case when bed_type = 1 then 'Basic Bed' when bed_type = 2 then 'Semi flower' when bed_type = 3 then 'Side Rail' when bed_type = 4 then 'Bariatric Bed' 
            when bed_type = 5 then 'Electric Bed' else "none" end ) bed_type,
            (case when bhrc_patient = 1 then "yes" else "no" end )bhrc_patient,
            dietition_visit_tme,
            stat_medicine,
            sfa_mfa,
            (case when payment_mode = 1 then "cash"  when payment_mode = 2 then "credit"  when payment_mode = 3 then "Other credit" else "none" end) as payment_mode,
            stat_recived_time
            from we_patient_surv_log
            left join wework_patient on we_patient_surv_log.ip_no = wework_patient.ip_no
            left join ora_nurstation t on t.ns_code =  we_patient_surv_log.shift_to
            left join ora_nurstation f on f.ns_code =  we_patient_surv_log.shift_from
            left join ora_bed on we_patient_surv_log.bd_code = ora_bed.bd_code
            where we_patient_surv_log.ip_no = ?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAdmittebhrc: (callBack) => {
        pool.query(
            `SELECT we_patient_surv_log.ip_no ,
            pt_no,ipd_date,ptc_ptname,
            t.ns_code as shift_from ,
            ora_roommaster.rmc_desc,
            f.ns_code as shift_to,bdc_no,
            dietition_visit_tme,
            stat_medicine,
            stat_recived_time,
            doc_name
            FROM meliora.we_patient_surv_log
            left join wework_patient on we_patient_surv_log.ip_no = wework_patient.ip_no
            left join ora_nurstation t on t.ns_code = we_patient_surv_log.shift_from
            left join ora_nurstation f on f.ns_code = we_patient_surv_log.shift_to
            left join ora_bed on wework_patient.bd_code =ora_bed.bd_code
            left join room_master on  ora_bed.rm_code = room_master.rm_code
            left join ora_roommaster on room_master.rm_code = ora_roommaster.rm_code
            left join ora_doctor on wework_patient.do_code = ora_doctor.do_code
            where bhrc_patient = 1 and ipd_status = 'N'
            group by ip_no`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getTotalbhrcPat: (callBack) => {
        pool.query(
            `SELECT we_patient_surv_log.ip_no ,
        pt_no,ipd_date,ptc_ptname,
        t.ns_code as shift_from ,
        ora_roommaster.rmc_desc,
        f.ns_code as shift_to,bdc_no,
        dietition_visit_tme,
        stat_medicine,
        stat_recived_time,
        doc_name
        FROM meliora.we_patient_surv_log
        left join wework_patient on we_patient_surv_log.ip_no = wework_patient.ip_no
        left join ora_nurstation t on t.ns_code = we_patient_surv_log.shift_from
        left join ora_nurstation f on f.ns_code = we_patient_surv_log.shift_to
        left join ora_bed on wework_patient.bd_code =ora_bed.bd_code
        left join room_master on  ora_bed.rm_code = room_master.rm_code
        left join ora_roommaster on room_master.rm_code = ora_roommaster.rm_code
        left join ora_doctor on wework_patient.do_code = ora_doctor.do_code
        where bhrc_patient = 1 
        group by ip_no`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


    Insertdischarge: (data, callback) => {
        pool.query(
            `insert into we_discharge
            ( 
            surv_slno , 
            ip_no,
            discharge_type,
            cros_consult,
            summary_time,
            disc_medicine_indent,
            disc_medicine_recive,
            feed_back_collected,
            room_clear_time,
            disc_key,
            disc_callbell,
            disc_tv_ac_remot,
            disc_report_date,
            act_dis_report_date,
            dis_entry_time,
            act_dis_entry_time,
            dmd_date,
            act_dmd_date,
            disc_date,
            act_disc_date,
            act_disc_status
            )
            values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.surv_slno,
                data.ip_no,
                data.discharge_type,
                data.cros_consult,
                data.summary_time,
                data.disc_medicine_indent,
                data.disc_medicine_recive,
                data.feed_back_collected,
                data.room_clear_time,
                data.disc_key,
                data.disc_callbell,
                JSON.stringify(data.disc_tv_ac_remot),
                data.disc_report_date,
                data.act_dis_report_date,
                data.dis_entry_time,
                data.act_dis_entry_time,
                data.dmd_date,
                data.act_dmd_date,
                data.disc_date,
                data.act_disc_date,
                data.act_disc_status

            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getdischarge: (id, callBack) => {
        pool.query(
            `select 
            ROW_NUMBER() OVER () as slno,
            we_discharge.ip_no,discharge_type,dis_slno,
            ptc_ptname,
            cros_consult,
            summary_time,
            disc_medicine_indent,
            disc_medicine_recive,
            feed_back_collected,
            room_clear_time,
            disc_key,
            disc_callbell,
            disc_tv_ac_remot,
            disc_report_date,
            act_dis_report_date,
            dis_entry_time,
            act_dis_entry_time,
            we_discharge.dmd_date,
            act_dmd_date,
            disc_date,
            act_disc_date,
            act_disc_status
            from we_discharge 
            left join wework_patient on we_discharge.ip_no = wework_patient.ip_no  
            where we_discharge.ip_no = ? `,
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
    updateDischarge: (data, callback) => {
        pool.query(
            `update we_discharge 
            set discharge_type=?,
            cros_consult=?,
            summary_time=?,
            disc_medicine_indent = ?,
            disc_medicine_recive =?,
            feed_back_collected=?,
            room_clear_time =?,
            disc_key = ?,
            disc_callbell =?,
            disc_tv_ac_remot =?,
            disc_report_date = ?,
            act_dis_report_date = ?,
            dis_entry_time =?,
            act_dis_entry_time =?,
            dmd_date =?,
            act_dmd_date =?,
            disc_date =?,
            act_disc_date =?,
            act_disc_status =?
            where dis_slno = ?`,
            [
                data.discharge_type,
                data.cros_consult,
                data.summary_time,
                data.disc_medicine_indent,
                data.disc_medicine_recive,
                data.feed_back_collected,
                data.room_clear_time,
                data.disc_key,
                data.disc_callbell,
                JSON.stringify(data.disc_tv_ac_remot),
                data.disc_report_date,
                data.act_dis_report_date,
                data.dis_entry_time,
                data.act_dis_entry_time,
                data.dmd_date,
                data.act_dmd_date,
                data.disc_date,
                data.act_disc_date,
                data.act_disc_status,
                data.dis_slno


            ],
            (error, results, feilds) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    insertBedtracking: (data, callback) => {
        pool.query(
            `insert into we_patient_bed_transfer
            (bed_trans_surv_slno,
            ip_no,
            trasfer_to,
            transfer_from,
            transfer_time,
            counseling_status,
            sfa_mfa_status,
            room_amenties,
            bystander_room_retain,
            transfer_in_time,
            counciling_remarks ,
            sfa_mfa_clearence,
            bystander_room_retain_remark,
            remarks
            ) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.bed_trans_surv_slno,
                data.ip_no,
                data.trasfer_to,
                data.transfer_from,
                data.transfer_time,
                data.counseling_status,
                data.sfa_mfa_status,
                JSON.stringify(data.room_amenties),
                data.bystander_room_retain,
                data.transfer_in_time,
                data.counciling_remarks,
                data.sfa_mfa_clearence,
                data.bystander_room_retain_remark,
                data.remarks
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getBedTransfer: (id, callBack) => {
        pool.query(
            `select ROW_NUMBER() OVER () as slno,
            sl_no,ora_rmall.ip_no,pt_no,rmd_occupdate,rmd_relesedate,
            nsc_desc,ptc_ptname,bdc_no,ora_nurstation.ns_code,rm_slno,rmc_shifing_required
            from ora_rmall 
            inner join ora_bed on ora_rmall.bd_code = ora_bed.bd_code 
            inner join ora_nurstation on ora_bed.ns_code = ora_nurstation.ns_code
            inner join ora_ipadmiss on ora_rmall.ip_no = ora_ipadmiss.ip_no
            where ora_rmall.ip_no = ?`,
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
    updateBedTrans: (data, callback) => {
        pool.query(
            `update we_patient_bed_transfer 
            set trasfer_to = ? ,
            transfer_time = ? ,
            counseling_status = ?,
            counciling_remarks =?,
            sfa_mfa_status =?,
            sfa_mfa_clearence=?,
            room_amenties=?,
            bystander_room_retain = ?,
            bystander_room_retain_remark =?,
            transfer_in_time=?,
            remarks = ?,
            transfer_from=? 
            where trasf_slno = ?`,
            [
                data.trasfer_to,
                data.transfer_time,
                data.counseling_status,
                data.counciling_remarks,
                data.sfa_mfa_status,
                data.sfa_mfa_clearence,
                JSON.stringify(data.room_amenties),
                data.bystander_room_retain,
                data.bystander_room_retain_remark,
                data.transfer_in_time,
                data.remarks,
                data.transfer_from,
                data.trasf_slno
            ],
            (error, results, feilds) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getbedtransSlno: (data, callBack) => {
        pool.query(
            `select trasf_slno from we_patient_bed_transfer
            where transfer_from = ? and trasfer_to = ? and we_patient_bed_transfer.ip_no = ?`,

            [
                data.transfer_from,
                data.trasfer_to,
                data.ip_no

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    updateshiftStatus: (data, callback) => {
        pool.query(
            `update ora_rmall
            set rmc_shifing_required = ?
            where sl_no = ?`,
            [
                data.rmc_shifing_required,
                data.sl_no,
                // data.rm_slno
            ],
            (error, results, feilds) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    getpatdetailBedtrans: (data, callBack) => {
        pool.query(`
        SELECT transfer_from,trasfer_to,transfer_time,counseling_status,counciling_remarks,
                sfa_mfa_status,sfa_mfa_clearence,room_amenties,bystander_room_retain,
                remarks,ip_no,bystander_room_retain_remark,transfer_in_time
                FROM meliora.we_patient_bed_transfer
                where trasfer_to = ? and ip_no = ?`,
            [
                data.trasfer_to,
                data.ip_no
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
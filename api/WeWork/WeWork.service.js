const { pool } = require('../../config/database');

module.exports = {
    getinpatientList: (id, callBack) => {
        pool.query(
            `SELECT 
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
            wework_patient.ipd_disc as DOD
            FROM meliora.wework_patient
            left join ora_roomcategory on wework_patient.rc_code = ora_roomcategory.rc_code
            left join ora_doctor on wework_patient.do_code = ora_doctor.do_code
            left join ora_ipadmiss on wework_patient.ip_no = ora_ipadmiss.ip_no
            left join ora_bed on wework_patient.bd_code = ora_bed.bd_code
            left join ora_nurstation on ora_bed.ns_code = ora_nurstation.ns_code
            left join room_master on ora_bed.rm_code = room_master.rm_code
            left join ora_roommaster on ora_bed.rm_code= ora_roommaster.rm_code           
            where ora_nurstation.ns_code =? `,
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
            (we_surv_slno,
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
            pateint_service,
            bhrc_patient,
            if_dama,
            dama_remarks
            )
            values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
            activity_date,
            dr_visit_time
            )
            values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
                data.activity_date,
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
            (case when activity_date is null  then null else activity_date end)activity_date,
            (case when visit_time is null then null else visit_time end) visit_time,
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
            `select inter_remark_slno ,
            (case when remark_date is null then null else remark_date end)remark_date,
            case when particular = '' then  'not updated' else particular end as particular,
             wework_patient.ptc_ptname,
            status,
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
    getwedetail: (data, callBack) => {
        pool.query(
            `SELECT we_patient_surv_log.ip_no,
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

    },
    checkInsertVal: (data, callBack) => {
        pool.query(
            `select srv_slno from we_daily_activity
            where activity_date = ?`,
            [
                data.activity_date
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
            where remark_date = ?`,
            [
                data.remark_date
            ],
            (error, results, fields) => {
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
            where bhrc_patient = 1 and ipd_status = 'y'
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
    Insertdischarge: (data, callback) => {
        pool.query(
            `insert into we_discharge
            ( 
            surv_slno , 
            ip_no,
            discharge_type,
            dis_annoc_time,
            cros_consult,
            summary_time,
            disc_medicine_indent,
            disc_medicine_recive,
            bill_ready_time,
            feed_back_collected,
            room_clear_time,
            disc_key,
            disc_callbell,
            disc_tv_ac_remot)
            values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.surv_slno,
                data.ip_no,
                data.discharge_type,
                data.dis_annoc_time,
                data.cros_consult,
                data.summary_time,
                data.disc_medicine_indent,
                data.disc_medicine_recive,
                data.bill_ready_time,
                data.feed_back_collected,
                data.room_clear_time,
                data.disc_key,
                data.disc_callbell,
                JSON.stringify(data.disc_tv_ac_remot)

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
            `select we_discharge.ip_no,discharge_type,dis_slno,
            case when dis_annoc_time is null then 'not updated' else dis_annoc_time end as dis_annoc_time ,
           ptc_ptname,
            case when cros_consult ='' then 'not updated' else cros_consult end as  cros_consult ,
           case when summary_time  is null then 'not updated' else summary_time end as  summary_time,
           case when disc_medicine_indent  is null then 'not updated' else disc_medicine_indent end as  disc_medicine_indent,
             case when  disc_medicine_recive  is null then 'not updated' else disc_medicine_recive  end as disc_medicine_recive,
            case when bill_ready_time is null then 'not updated' else bill_ready_time end as bill_ready_time,
           (case when feed_back_collected = 1 then "yes" else "no" end ) as feed_back_collected,
           case when room_clear_time is null then 'not updated' else room_clear_time end as room_clear_time,
           case when disc_key = 1 then "yes" else "no" end as disc_key,
           case when disc_callbell = 1 then "yes" else "no" end as disc_callbell,
           disc_tv_ac_remot
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
            dis_annoc_time = ?,
            cros_consult=?,
            summary_time=?,
            disc_medicine_indent = ?,
            disc_medicine_recive =?,
            bill_ready_time=?,
            feed_back_collected=?,
            room_clear_time =?,
            disc_key = ?,
            disc_callbell =?,
            disc_tv_ac_remot =?
            where dis_slno = ?`,
            [
                data.discharge_type,
                data.dis_annoc_time,
                data.cros_consult,
                data.summary_time,
                data.disc_medicine_indent,
                data.disc_medicine_recive,
                data.bill_ready_time,
                data.feed_back_collected,
                data.room_clear_time,
                data.disc_key,
                data.disc_callbell,
                JSON.stringify(data.disc_tv_ac_remot),
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
            sfa_mfa_clearence,
            room_amenties,
            bystander_room_retain,
            transfer_in_time,
            remarks
            ) values(?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.bed_trans_surv_slno,
                data.ip_no,
                data.trasfer_to,
                data.transfer_from,
                data.transfer_time,
                data.counseling_status,
                data.sfa_mfa_clearence,
                JSON.stringify(data.room_amenties),
                data.bystander_room_retain,
                data.transfer_in_time,
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
            `SELECT trasf_slno,
            trasfer_to,
			case when transfer_time is null then 'not updated' else transfer_time end as  transfer_time , 
            case when counseling_status = '' then   'not updated' else counseling_status end as  counseling_status,
            case when sfa_mfa_clearence = '' then 'not updated' else sfa_mfa_clearence end as sfa_mfa_clearence ,
            case when bystander_room_retain  = '' then   'not updated' else bystander_room_retain end as  bystander_room_retain ,
            case when transfer_in_time  is null then 'not updated' else transfer_in_time end as  transfer_in_time,
            case when  remarks  = '' then 'not updated' else  remarks  end as remarks,
            transfer_from,
            room_amenties ,
            ptc_ptname,
            t.nsc_desc as transfer_too,
            f.nsc_desc as transfer_fromm ,
            we_patient_bed_transfer.ip_no
            FROM meliora.we_patient_bed_transfer
            left join wework_patient on we_patient_bed_transfer.ip_no = wework_patient.ip_no 
            left join ora_nurstation t on we_patient_bed_transfer.trasfer_to = t.ns_code
            left join ora_nurstation f on we_patient_bed_transfer.transfer_from = f.ns_code        
            where we_patient_bed_transfer.ip_no = ?`,
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
            counseling_status = ? ,
            sfa_mfa_clearence=?,
            room_amenties=?,
            bystander_room_retain = ?,
            transfer_in_time=?,
            remarks = ? 
            where trasf_slno = ?`,
            [
                data.trasfer_to,
                data.transfer_time,
                data.counseling_status,
                data.sfa_mfa_clearence,
                JSON.stringify(data.room_amenties),
                data.bystander_room_retain,
                data.transfer_in_time,
                data.remarks,
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
            where transfer_from = ? and trasfer_to = ? and bed_trans_surv_slno= ?`,

            [
                data.transfer_from,
                data.trasfer_to,
                data.bed_trans_surv_slno

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
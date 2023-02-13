const { pool } = require('../../config/database');
const { update } = require('../module_user_right/userRight.service');

module.exports = {
    dietPlanInsert: (data, callBack) => {
        pool.query(
            `insert into meliora.diet_plan 
            (
            ip_no,
            pt_no,
            diet_slno,
            dietpt_slno,
            bd_code,
            plan_appr_time,
            plan_date,
            plan_remark,
            plan_status,
            em_id,
            process,
            discharge,
            approve_reqired
            ) values (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.ip_no,
                data.pt_no,
                data.diet_slno,
                data.dietpt_slno,
                data.bd_code,
                data.plan_appr_time,
                data.plan_date,
                data.plan_remark,
                data.plan_status,
                data.em_id,
                data.process,
                data.discharge,
                data.approve_reqired
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT ip_no,pt_no,
            plan_status
            FROM diet_plan
            WHERE ip_no=? AND pt_no=? `,
            [
                data.ip_no,
                data.pt_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getdietplan: (callBack) => {
        pool.query(
            ` SELECT 
            plan_slno,
            diet_patient.dietpt_slno,
            diet_plan.pt_no,
            diet_patient.ptc_ptname,
            diet_name,
            bdc_no,
            diet_master.diet_slno,
            plan_date,
            plan_remark,
            if(discharge = 'N','No','yes') as discharge
             FROM meliora.diet_plan             
             left join diet_master on diet_plan.diet_slno=diet_master.diet_slno
             left join ora_bed on diet_plan.bd_code = ora_bed.bd_code 
             left join diet_patient on diet_patient.dietpt_slno=diet_plan.dietpt_slno
             WHERE plan_status=0`,
            [],
            function (err, results) {

                if (err) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    updateDietplan: (data, callBack) => {
        pool.query(
            `update meliora.diet_plan
            set 
            ip_no = ?,
            pt_no = ?,
            diet_slno = ?,
            dietpt_slno =?,
            bd_code = ?,
            plan_appr_time=?,
            plan_date =?,
            plan_remark = ?,
            plan_status = ?,
            em_id = ?,
            process = ?,
            discharge = ?
            where plan_slno = ?`,
            [
                data.plan_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getdietplanNeworder: (callBack) => {
        pool.query(
            `select plan_slno,
            diet_plan.pt_no,
            diet_plan.ip_no,
            diet_plan.diet_slno,
            ptc_ptname,
            diet_name,
            bdc_no,
            diet_plan.bd_code,
            plan_remark,
            plan_date,
            discharge
            from diet_plan
            left join diet_master on diet_plan.diet_slno = diet_master.diet_slno
            left join ora_bed on  diet_plan.bd_code = ora_bed.bd_code
            left join diet_patient on diet_patient.dietpt_slno=diet_plan.dietpt_slno
            where plan_slno not in (select plan_slno
            from diet_process_mast
            where date(process_date)=curdate() and diet_plan.diet_slno=diet_process_mast.diet_slno)
            and discharge='N'`,
            [],
            function (err, results) {

                if (err) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getdietplanProcess: (callBack) => {
        pool.query(
            `select 
            proc_slno,
            dmenu_slno,
            diet_process_mast.plan_slno,
            diet_master.diet_name,
            diet_process_mast.pt_no,
            ptc_ptname,
            bdc_no,
            diet_process_mast.bd_code,
            DATE(diet_process_mast.process_date) AS plan_date,
            plan_remark
            from diet_process_mast 
            left join diet_master on diet_process_mast.diet_slno=diet_master.diet_slno
            left join diet_plan on diet_process_mast.plan_slno= diet_plan.plan_slno
            left join diet_patient on diet_patient.dietpt_slno=diet_plan.dietpt_slno
            left join ora_bed on diet_process_mast.bd_code = ora_bed.bd_code
            where process_status=1 and discharge_status=1 and  DATE(diet_process_mast.process_date)=curdate()
            group by pt_no`,
            [],
            function (err, results) {

                if (err) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    dietApproval: (data, callBack) => {
        pool.query(
            `UPDATE diet_plan 
                SET diet_slno = ?,
                plan_appr_time = ?,
                plan_status=?,
                process=?
                WHERE plan_slno = ?`,
            [
                data.diet_slno,
                data.plan_appr_time,
                data.plan_status,
                data.process,
                data.plan_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getDietPlanList: (callBack) => {
        pool.query(
            `SELECT plan_slno,diet_patient.dietpt_slno,
            diet_patient.pt_no,
            ptc_ptname,
            ora_bed.bd_code,
			bdc_no,
            plan_date,
            plan_remark,
            diet_name,
            case when plan_status = 1 then 'approved' else 'approval pending'  end "plan status"
             FROM meliora.diet_plan
             left join diet_master on diet_plan.diet_slno = diet_master.diet_slno
              left join diet_patient on diet_patient.dietpt_slno=diet_plan.dietpt_slno
            left join ora_bed on  diet_plan.bd_code=ora_bed.bd_code`,
            [],
            function (err, results) {

                if (err) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getneworderbydateNs: (data, callBack) => {
        pool.query(
            `select 
            plan_slno,
            diet_plan.pt_no,
            diet_plan.ip_no,
            ptc_ptname,
            diet_plan.diet_slno,
            diet_name,
            bdc_no,
            diet_plan.bd_code,
            plan_remark,
            plan_date,
            discharge
            from diet_plan
            left join diet_master on diet_plan.diet_slno = diet_master.diet_slno
            left join ora_bed on  diet_plan.bd_code = ora_bed.bd_code
            left join diet_patient on diet_patient.dietpt_slno=diet_plan.dietpt_slno
            where plan_slno not in (select plan_slno
            from diet_process_mast
            where date(process_date)=? )
            and discharge='N' and ora_bed.ns_code = ?`,
            [
                data.process_date,
                data.ns_code

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getNewOrderBydate: (data, callBack) => {
        pool.query(
            `select plan_slno,
            diet_plan.pt_no,
            diet_plan.ip_no,
            ptc_ptname,
            diet_plan.diet_slno,
            diet_name,
            bdc_no,
            diet_plan.bd_code,
            plan_remark,
            plan_date,
            discharge
            from diet_plan
            left join diet_master on diet_plan.diet_slno = diet_master.diet_slno
            left join ora_bed on  diet_plan.bd_code = ora_bed.bd_code
            left join diet_patient on diet_patient.dietpt_slno=diet_plan.dietpt_slno
            where plan_slno not in (select plan_slno
            from diet_process_mast
            where date(process_date)=? )
            and discharge='N'`,
            [
                data.process_date,

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getNewOrderByDiet: (data, callBack) => {
        pool.query(
            `select 
            plan_slno,
            diet_plan.pt_no,
            diet_plan.ip_no,
            ptc_ptname,
            diet_plan.diet_slno,
            diet_name,
            bdc_no,
            diet_plan.bd_code,
            plan_remark,
            plan_date,
            discharge
            from diet_plan
            left join diet_master on diet_plan.diet_slno = diet_master.diet_slno
            left join ora_bed on  diet_plan.bd_code = ora_bed.bd_code
            left join diet_patient on diet_patient.dietpt_slno=diet_plan.dietpt_slno
            where plan_slno not in (select plan_slno
            from diet_process_mast
            where date(process_date)=?)
            and discharge='N' and ora_bed.ns_code =? and diet_plan.diet_slno=?
`,
            [
                data.process_date,
                data.ns_code,
                data.diet_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    pendingApproval: (id, callBack) => {
        pool.query(
            `SELECT diet_patient.dietpt_slno,diet_patient.ip_no,diet_patient.pt_no,doc_name,rcc_desc,
            ptc_ptname,bdc_no,diet_patient.bd_code,plan_status,ora_roommaster.rmc_desc,ora_roomtype.rtc_desc, 
            diet_name,  plan_remark,plan_slno,diet_plan.dietpt_slno,diet_plan.diet_slno,
            case when plan_status = 1 then 'approved' else 'approval pending'  end "plan status"
            FROM meliora.diet_plan
            left join diet_patient on diet_plan.dietpt_slno = diet_patient.dietpt_slno
            left join ora_doctor on diet_patient.do_code=ora_doctor.do_code
            left join ora_bed on diet_plan.bd_code =ora_bed.bd_code
            left join ora_roomcategory on diet_patient.rc_code=ora_roomcategory.rc_code
            left join ora_nurstation on  ora_bed.ns_code = ora_nurstation.ns_code
            left join ora_roomtype on ora_roomtype.rt_code=ora_bed.rt_code
            left join ora_roommaster on ora_bed.rm_code= ora_roommaster.rm_code    
            left join diet_master on diet_plan.diet_slno=diet_master.diet_slno 
            where  ora_nurstation.ns_code  = ? and diet_plan.plan_status=0`,
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
    ApprovedList: (id, callBack) => {
        pool.query(
            `SELECT diet_patient.dietpt_slno,diet_patient.ip_no,diet_patient.pt_no,doc_name,rcc_desc,
            ptc_ptname,bdc_no,diet_patient.bd_code,plan_status,ora_roommaster.rmc_desc,ora_roomtype.rtc_desc, 
            diet_name,  plan_remark,plan_slno,diet_plan.dietpt_slno,diet_plan.diet_slno,
            case when plan_status = 1 then 'approved' else 'approval pending'  end "plan status"
            FROM meliora.diet_plan
            left join diet_patient on diet_plan.dietpt_slno = diet_patient.dietpt_slno
            left join ora_doctor on diet_patient.do_code=ora_doctor.do_code
            left join ora_bed on diet_plan.bd_code =ora_bed.bd_code
            left join ora_roomcategory on diet_patient.rc_code=ora_roomcategory.rc_code
            left join ora_nurstation on  ora_bed.ns_code = ora_nurstation.ns_code
            left join ora_roomtype on ora_roomtype.rt_code=ora_bed.rt_code
            left join ora_roommaster on ora_bed.rm_code= ora_roommaster.rm_code    
            left join diet_master on diet_plan.diet_slno=diet_master.diet_slno 
            where  ora_nurstation.ns_code  = ? and diet_plan.plan_status=1`,
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
    AllList: (id, callBack) => {
        pool.query(
            `SELECT diet_patient.dietpt_slno,diet_patient.ip_no,diet_patient.pt_no,doc_name,rcc_desc,
            ptc_ptname,bdc_no,diet_patient.bd_code,plan_status,ora_roommaster.rmc_desc,ora_roomtype.rtc_desc, 
            diet_name,  plan_remark,plan_slno,diet_plan.dietpt_slno,diet_plan.diet_slno,
            case when plan_status = 1 then 'approved' else 'approval pending'  end "plan status"
          FROM meliora.diet_plan
          left join diet_patient on diet_plan.dietpt_slno = diet_patient.dietpt_slno
          left join ora_doctor on diet_patient.do_code=ora_doctor.do_code
          left join ora_bed on diet_plan.bd_code =ora_bed.bd_code
          left join ora_roomcategory on diet_patient.rc_code=ora_roomcategory.rc_code
          left join ora_nurstation on  ora_bed.ns_code = ora_nurstation.ns_code
          left join ora_roomtype on ora_roomtype.rt_code=ora_bed.rt_code
          left join ora_roommaster on ora_bed.rm_code= ora_roommaster.rm_code    
          left join diet_master on diet_plan.diet_slno=diet_master.diet_slno 
          where  ora_nurstation.ns_code  = ?`,
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

    pendingAppConsult: (callBack) => {
        pool.query(
            ` SELECT diet_patient.dietpt_slno,diet_patient.ip_no,diet_patient.pt_no,doc_name,rcc_desc,
            ptc_ptname,bdc_no,diet_patient.bd_code,plan_status,ora_roommaster.rmc_desc,ora_roomtype.rtc_desc, 
            diet_name,  plan_remark,plan_slno,diet_plan.dietpt_slno,diet_plan.diet_slno,ora_nurstation.nsc_desc,
            case when plan_status = 1 then 'approved' else 'approval pending'  end "plan status"
            FROM meliora.diet_plan
            left join diet_patient on diet_plan.dietpt_slno = diet_patient.dietpt_slno
            left join ora_doctor on diet_patient.do_code=ora_doctor.do_code
            left join ora_bed on diet_plan.bd_code =ora_bed.bd_code
            left join ora_roomcategory on diet_patient.rc_code=ora_roomcategory.rc_code
            left join ora_nurstation on  ora_bed.ns_code = ora_nurstation.ns_code
            left join ora_roomtype on ora_roomtype.rt_code=ora_bed.rt_code
            left join ora_roommaster on ora_bed.rm_code= ora_roommaster.rm_code    
            left join diet_master on diet_plan.diet_slno=diet_master.diet_slno 
            where approve_reqired=1 and plan_status=0`,
            [],
            function (err, results) {

                if (err) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

}

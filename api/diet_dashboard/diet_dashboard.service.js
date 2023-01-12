const { pool } = require('../../config/database')
module.exports = {

    totalPatient: (callback) => {
        pool.query(
            ` select dietpt_slno,ip_no,pt_no,ptc_ptname, ipd_date,ptc_sex,
            ora_nurstation.nsc_desc,ora_roommaster.rmc_desc,doc_name as doctor
                        from diet_patient
                           left join ora_bed on diet_patient.bd_code = ora_bed.bd_code
                               left join ora_nurstation on  ora_bed.ns_code = ora_nurstation.ns_code
                                left join ora_roomtype on ora_roomtype.rt_code=ora_bed.rt_code
                        left join ora_roommaster on ora_bed.rm_code= ora_roommaster.rm_code 
                        left join ora_doctor on diet_patient.do_code=ora_doctor.do_code
                        where ipd_status is null`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    dietPlanned: (callback) => {
        pool.query(
            ` SELECT diet_patient.dietpt_slno,diet_patient.ip_no,diet_patient.pt_no,doc_name,rcc_desc,
            diet_patient.ipd_date,plan_date,diet_patient.ptc_sex,
            ptc_ptname,bdc_no,diet_patient.bd_code,plan_status,ora_roommaster.rmc_desc,ora_roomtype.rtc_desc, 
            diet_name,  plan_remark,plan_slno,diet_plan.dietpt_slno,diet_plan.diet_slno,ora_nurstation.nsc_desc,
           ( case when plan_status = 1 then 'approved' else 'approval pending' end) as plan
            FROM meliora.diet_plan
            left join diet_patient on diet_plan.dietpt_slno = diet_patient.dietpt_slno
            left join ora_doctor on diet_patient.do_code=ora_doctor.do_code
            left join ora_bed on diet_plan.bd_code =ora_bed.bd_code
            left join ora_roomcategory on diet_patient.rc_code=ora_roomcategory.rc_code
            left join ora_nurstation on  ora_bed.ns_code = ora_nurstation.ns_code
            left join ora_roomtype on ora_roomtype.rt_code=ora_bed.rt_code
            left join ora_roommaster on ora_bed.rm_code= ora_roommaster.rm_code    
            left join diet_master on diet_plan.diet_slno=diet_master.diet_slno 
            where discharge='N'`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    dietPlanPending: (callback) => {
        pool.query(
            ` select dietpt_slno,ip_no,pt_no,ptc_ptname, ipd_date,ptc_sex,
            ora_nurstation.nsc_desc,ora_roommaster.rmc_desc,doc_name
                        from diet_patient
                           left join ora_bed on diet_patient.bd_code = ora_bed.bd_code
                               left join ora_nurstation on  ora_bed.ns_code = ora_nurstation.ns_code
                                left join ora_roomtype on ora_roomtype.rt_code=ora_bed.rt_code
                        left join ora_roommaster on ora_bed.rm_code= ora_roommaster.rm_code
                        left join ora_doctor on diet_patient.do_code=ora_doctor.do_code 
            where ip_no not in (select ip_no from diet_plan where discharge='N')
              and ipd_status is null`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


}

const { pool } = require('../../config/database')
module.exports = {
    getdietReport: (data, callBack) => {
        pool.query(
            `select diet_process_mast.ip_no,diet_process_mast.pt_no,diet_process_mast.diet_slno ,
            diet_master.diet_name, diet_patient.ptc_ptname,diet_process_mast.proc_slno,process_date,
            ora_roommaster.rmc_desc,ora_nurstation.nsc_desc,
            date(diet_patient.ipd_date) as ipd_date,plan_remark,ROW_NUMBER() OVER () as slno
            from diet_process_mast
            left join ora_patient on diet_process_mast.pt_no = ora_patient.pt_no
            left join diet_master on diet_process_mast.diet_slno=diet_master.diet_slno
             left join ora_bed on diet_process_mast.bd_code =ora_bed.bd_code
              left join ora_roommaster on ora_bed.rm_code= ora_roommaster.rm_code    
              left join diet_patient on diet_patient.ip_no=diet_process_mast.ip_no
              left join diet_plan on diet_plan.ip_no=diet_process_mast.ip_no  
              left join ora_nurstation on ora_nurstation.ns_code=ora_bed.ns_code       
           where diet_process_mast.diet_slno IN (?)  and date(process_date)=?`,
            [
                data.diet_slno,
                data.process_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getNurStatnReport: (data, callBack) => {
        pool.query(
            `select diet_process_mast.ip_no,diet_process_mast.pt_no,diet_process_mast.diet_slno ,
            diet_master.diet_name, diet_patient.ptc_ptname,diet_process_mast.proc_slno,process_date,
            ora_roommaster.rmc_desc,ora_nurstation.nsc_desc,
            date(diet_patient.ipd_date) as ipd_date,plan_remark,ROW_NUMBER() OVER () as slno
            from diet_process_mast
            left join ora_patient on diet_process_mast.pt_no = ora_patient.pt_no
            left join diet_master on diet_process_mast.diet_slno=diet_master.diet_slno
             left join ora_bed on diet_process_mast.bd_code =ora_bed.bd_code
              left join ora_roommaster on ora_bed.rm_code= ora_roommaster.rm_code    
              left join diet_patient on diet_patient.ip_no=diet_process_mast.ip_no
              left join diet_plan on diet_plan.ip_no=diet_process_mast.ip_no   
              left join ora_nurstation on ora_nurstation.ns_code=ora_bed.ns_code    
             where ora_bed.ns_code IN (?)  and date(process_date)=?`,
            [
                data.ns_code,
                data.process_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getPatientReport: (data, callBack) => {
        pool.query(
            `select  diet_process_mast.pt_no,
            diet_process_mast.diet_slno,
            diet_process_mast.plan_slno,
            diet_process_mast.proc_slno,diet_plan.discharge,
            date_format(process_date,'%d-%m-%y') as process_date,
            diet_name,ROW_NUMBER() OVER () as slno  ,
            sum(rate_hos) as hossum ,sum(rate_cant) as cantsum,ora_roomtype.rtc_desc as roomtype, room_master.rmc_name as roonno
            from diet_process_mast
            left join diet_plan on diet_plan.plan_slno=diet_process_mast.plan_slno
            left join ora_bed on ora_bed.bd_code=diet_process_mast.bd_code
            left join ora_roomtype on ora_roomtype.rt_code=ora_bed.rt_code
            left join room_master on room_master.rm_code=ora_bed.rm_code
            left join diet_process_detl on diet_process_detl.proc_slno=diet_process_mast.proc_slno
            left join diet_master on diet_master.diet_slno=diet_process_mast.diet_slno
            where diet_process_mast.pt_no= ? and
              date(process_date) between ? and ? and supply_stat=1 and is_extra_billed=0 group by process_date`,
            [
                data.pt_no,
                data.start_date,
                data.end_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getPatientReportExtra: (data, callBack) => {
        pool.query(
            `select  
            diet_process_mast.pt_no,
            diet_process_mast.proc_slno,
                       date_format(process_date,'%d-%m-%y') as process_date,          
                       sum(rate_hos) as exhossum,
                       sum(rate_cant) as excantsum 
                   from diet_process_detl
           left join diet_process_mast on diet_process_mast.proc_slno=diet_process_detl.proc_slno
            where diet_process_mast.pt_no=? and            
              date(process_date) between ? and ? and supply_stat=1 and is_extra_billed=1 group by process_date`,
            [
                data.pt_no,
                data.start_date,
                data.end_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getPatientMonthly: (data, callBack) => {
        pool.query(
            `select  diet_process_mast.pt_no,
            diet_process_mast.diet_slno,
            diet_process_mast.plan_slno,
            diet_process_mast.proc_slno,diet_plan.discharge,
            date_format(process_date,'%d-%m-%y') as process_date,
            diet_name,ROW_NUMBER() OVER () as slno  ,
            sum(rate_hos) as hossum ,sum(rate_cant) as cantsum,ora_roomtype.rtc_desc as roomtype, room_master.rmc_name as roonno
            from diet_process_mast
            left join diet_plan on diet_plan.plan_slno=diet_process_mast.plan_slno
            left join ora_bed on ora_bed.bd_code=diet_process_mast.bd_code
            left join ora_roomtype on ora_roomtype.rt_code=ora_bed.rt_code
            left join room_master on room_master.rm_code=ora_bed.rm_code
            left join diet_process_detl on diet_process_detl.proc_slno=diet_process_mast.proc_slno
            left join diet_master on diet_master.diet_slno=diet_process_mast.diet_slno
             where date(process_date) between ? and ? and supply_stat=1 and is_extra_billed=0 group by proc_slno`,
            [
                data.start_date,
                data.end_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getPatientMonthlyExtra: (data, callBack) => {
        pool.query(
            `select  
            diet_process_mast.pt_no,
            diet_process_mast.proc_slno,
                       date_format(process_date,'%d-%m-%y') as process_date,          
                       sum(rate_hos) as exhossum,
                       sum(rate_cant) as excantsum 
                   from diet_process_detl
           left join diet_process_mast on diet_process_mast.proc_slno=diet_process_detl.proc_slno
            where date(process_date) between ? and ? and supply_stat=1 and is_extra_billed=1 group by proc_slno`,
            [
                data.start_date,
                data.end_date
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

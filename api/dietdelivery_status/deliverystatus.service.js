const { pool } = require('../../config/database')
module.exports = {

    getPendingLIst: (data, callBack) => {
        pool.query(
            ` select diet_process_detl.proc_slno,diet_process_detl.type_slno,
            diet_process_detl.prod_slno 
            from diet_process_detl
               left join diet_process_mast on diet_process_mast.proc_slno=diet_process_detl.proc_slno
                  left join diet_plan on diet_plan.ip_no=diet_process_mast.ip_no
                  left join ora_bed on ora_bed.bd_code=diet_plan.bd_code
                  left join co_nursestation on co_nursestation.co_ora_nurse=ora_bed.ns_code       
                   WHERE co_ora_nurse=? and diet_process_mast.diet_slno=? and
                   date(diet_process_mast.process_date)=current_date() and diet_process_detl.supply_stat = 0 `,
            [
                data.co_ora_nurse,
                data.diet_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },

    getTotalLIst: (data, callBack) => {
        pool.query(
            ` select diet_process_detl.proc_slno,diet_process_detl.type_slno,
            diet_process_detl.prod_slno 
            from diet_process_detl
               left join diet_process_mast on diet_process_mast.proc_slno=diet_process_detl.proc_slno
                  left join diet_plan on diet_plan.ip_no=diet_process_mast.ip_no
                  left join ora_bed on ora_bed.bd_code=diet_plan.bd_code
                  left join co_nursestation on co_nursestation.co_ora_nurse=ora_bed.ns_code       
                   WHERE co_ora_nurse=? and diet_process_mast.diet_slno=? and
                   date(diet_process_mast.process_date)=current_date() `,
            [
                data.co_ora_nurse,
                data.diet_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },

    getDeliveryLIst: (data, callBack) => {
        pool.query(
            ` select diet_process_detl.proc_slno,diet_process_detl.type_slno,
            diet_process_detl.prod_slno 
            from diet_process_detl
               left join diet_process_mast on diet_process_mast.proc_slno=diet_process_detl.proc_slno
                  left join diet_plan on diet_plan.ip_no=diet_process_mast.ip_no
                  left join ora_bed on ora_bed.bd_code=diet_plan.bd_code
                  left join co_nursestation on co_nursestation.co_ora_nurse=ora_bed.ns_code       
                   WHERE co_ora_nurse=? and diet_process_mast.diet_slno=? and
                   date(diet_process_mast.process_date)=current_date() and diet_process_detl.supply_stat = 1 `,
            [
                data.co_ora_nurse,
                data.diet_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },

}
const { pool } = require('../../config/database');
module.exports = {

    getItemDeliveryMark: (id, callBack) => {
        pool.query(
            `SELECT
            diet_master.diet_name,
            diet_process_mast.proc_slno,
            diet_process_mast.diet_slno ,
            diet_process_mast.pt_no,
            diet_type.type_desc,
            diet_patient.ptc_ptname,
                        diet_process_detl.prod_slno,
                        diet_process_detl.type_slno
                        FROM diet_process_mast
                         LEFT JOIN ora_bed on ora_bed.bd_code=diet_process_mast.bd_code
                        LEFT JOIN diet_process_detl ON diet_process_detl.proc_slno=diet_process_mast.proc_slno
                        LEFT JOIN diet_master ON diet_master.diet_slno=diet_process_mast.diet_slno
                        LEFT JOIN diet_type ON diet_type.type_slno=diet_process_detl.type_slno
                        LEFT JOIN diet_patient ON diet_patient.pt_no=diet_process_mast.pt_no
             WHERE  rm_code=? and  date(diet_process_mast.process_date)=current_date() and supply_stat = 0`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    updateprodetlstatus: (data, callback) => {
        pool.query(
            `update diet_process_detl 
            set supply_stat = ?,
            supply_time=?
            where prod_slno IN (?)`
            ,
            [
                data.supply_stat,
                data.supply_time,
                data.prod_slno,

            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getRoomByNSandDiet: (data, callBack) => {
        pool.query(
            `select room_master.rm_code ,room_master.rmc_name from room_master
            left join ora_roommaster on ora_roommaster.rm_code=room_master.rm_code            
            left join ora_bed on ora_bed.rm_code=room_master.rm_code
            left join diet_plan on diet_plan.bd_code=ora_bed.bd_code
            where ora_roommaster.ns_code=? and diet_plan.diet_slno=? and diet_plan.discharge='N'`,
            [
                data.ns_code,
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
    getRoomByNSandDietAny: (data, callBack) => {
        pool.query(
            `select room_master.rm_code ,room_master.rmc_name from room_master
            left join ora_roommaster on ora_roommaster.rm_code=room_master.rm_code            
            left join ora_bed on ora_bed.rm_code=room_master.rm_code
            left join diet_plan on diet_plan.bd_code=ora_bed.bd_code
            where ora_roommaster.ns_code=? and diet_plan.discharge='N'`,
            [
                data.ns_code

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },

    getRoomByNSandDietslno: (data, callBack) => {
        pool.query(
            `select room_master.rm_code ,room_master.rmc_name from room_master
            left join ora_roommaster on ora_roommaster.rm_code=room_master.rm_code            
            left join ora_bed on ora_bed.rm_code=room_master.rm_code
            left join diet_plan on diet_plan.bd_code=ora_bed.bd_code
            where  diet_plan.diet_slno=? and diet_plan.discharge='N'`,
            [
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
const { pool } = require('../../config/database');
module.exports = {
    getExtraorder: (data, callBack) => {
        console.log(data);
        pool.query(
            ` select proc_slno,diet_slno ,date(process_date) as process_date , diet_process_mast.pt_no  ,
            diet_patient.ptc_ptname,diet_slno FROM diet_process_mast
            LEFT JOIN ora_bed on ora_bed.bd_code=diet_process_mast.bd_code
            LEFT JOIN diet_patient ON diet_patient.pt_no=diet_process_mast.pt_no  
            WHERE rm_code=? AND DATE(process_date)=?`,
            [
                // data.pt_no,
                data.rm_code,
                data.process_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getItemrate: (data, callBack) => {
        pool.query(
            `select item_slno,rate_hos,rate_cant FROM diet_menu_setting_detl where item_slno=?`,
            [
                data.item_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    ExtraOrderInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO diet_process_detl(
                proc_slno,
                type_slno,
                rate_hos,
                rate_cant,
                is_extra_billed
            ) 
            VALUES(?,?,?,?,?)`,
            [
                data.proc_slno,
                data.type_slno,
                data.rate_hos,
                data.rate_cant,
                data.is_extra_billed
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    ExtraOrderListInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO diet_extra_oder_list(
                prod_slno,
                item_slno,
                hos_rate,
                cant_rate,
                type_slno,
                extra_status
            ) 
            VALUES ?`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getDietType: (data, callBack) => {

        pool.query(
            ` select diet_type.type_slno,type_desc
            FROM diet_process_detl
            LEFT JOIN diet_process_mast ON diet_process_mast.proc_slno=diet_process_detl.proc_slno
           LEFT JOIN diet_type ON diet_type.type_slno=diet_process_detl.type_slno
            WHERE diet_process_detl.proc_slno=? AND DATE(diet_process_mast.process_date)=?`,
            [
                data.proc_slno,
                data.process_date
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
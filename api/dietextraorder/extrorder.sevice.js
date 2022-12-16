const { pool } = require('../../config/database');
module.exports = {
    getExtraorder: (data, callBack) => {
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
            `select item_slno,rate_hosp as rate_hos, rate as rate_cant FROM kot_item_master where item_slno=?`,
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
                is_extra_billed,
                extra_bill_date
            ) 
            VALUES(?,?,?,?,?,?)`,
            [
                data.proc_slno,
                data.type_slno,
                data.rate_hos,
                data.rate_cant,
                data.is_extra_billed,
                data.extra_bill_date
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
                extra_status,
                count
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

    getExtraOrder: (callBack) => {
        pool.query(
            `select prod_slno,diet_process_detl.proc_slno,type_slno,rate_hos,rate_cant ,diet_plan.plan_slno,
            date(process_date) as orderdate,diet_plan.pt_no,ptc_ptname,bdc_no, date(extra_bill_date) as reqdate,
       co_nursestation.co_ora_nurse ,co_nursestation.co_nurse_desc  ,room_master.rm_code
  from diet_process_detl
  left join diet_process_mast on diet_process_mast.proc_slno=diet_process_detl.proc_slno
  left join diet_plan on diet_plan.plan_slno=diet_process_mast.plan_slno
  left join ora_patient on ora_patient.pt_no=diet_plan.pt_no
  left join ora_bed on ora_bed.bd_code=diet_plan.bd_code
left join co_nursestation on co_nursestation.co_ora_nurse=ora_bed.ns_code
left join room_master on room_master.rm_code=ora_bed.rm_code
  where is_extra_billed=1;
            `, [],
            function (err, results) {

                if (err) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getExtraOrderDetail: (id, callBack) => {
        pool.query(
            `select extra_slno,hos_rate as rate_hos,cant_rate as rate_cant,item_name,
            diet_extra_oder_list.item_slno,type_slno,count, count*hos_rate as total_hos,
            count*cant_rate as total_cant
                        from diet_extra_oder_list
            left join kot_item_master on kot_item_master.item_slno=diet_extra_oder_list.item_slno
            where prod_slno=?`,
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

    updateExta: (data, callBack) => {
        pool.query(
            `update diet_process_detl
            set proc_slno=?,
            type_slno=?,
             rate_hos=?, 
             rate_cant=?,
             is_extra_billed=?, 
             extra_bill_date=?
             where prod_slno=? `,
            [
                data.proc_slno,
                data.type_slno,
                data.rate_hos,
                data.rate_cant,
                data.is_extra_billed,
                data.extra_bill_date,
                data.prod_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },

    deleteExtraOrderDetail: (id, callBack) => {
        pool.query(
            `delete  from diet_extra_oder_list
            where prod_slno=?`,
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

}